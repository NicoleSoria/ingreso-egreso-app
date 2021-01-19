import { SetUserAction } from './auth.accions';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import Swal from 'sweetalert2'
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.accions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription = new Subscription();

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private firebase: AngularFirestore,
              private store: Store<AppState>) { }


  initAuthListener(){

    this.afAuth.authState.subscribe( (fbUser: firebase.User) => {
      if(fbUser) {
        this.userSubscription = this.firebase.doc(`${fbUser.uid}/usuario`).valueChanges()
              .subscribe( (resp : any) => {

                const newUser = new User(resp);
                this.store.dispatch( new SetUserAction(newUser) );
              });
      }
      else {
        this.userSubscription.unsubscribe();
      }
    });

  }

  crearUsuario(nombre: string, email: string, password: string){

    this.store.dispatch( new ActivarLoadingAction() );

    this.afAuth.auth
        .createUserWithEmailAndPassword(email, password)
        .then( resp => {

          const user: User = {
            uid: resp.user.uid,
            nombre: nombre,
            email: resp.user.email
          };

          this.firebase.doc(`${user.uid}/usuario`)
                        .set( user )
                        .then( () => {
                          this.router.navigate(['/']);
                          this.store.dispatch( new DesactivarLoadingAction() );

                        })
                        .catch( error => {
                          Swal.fire('Error en el registro', error.message, 'error');
                          this.store.dispatch( new DesactivarLoadingAction() );
                        });

        })
        .catch( error => {
          Swal.fire('Error en el registro', error.message, 'error');
        })
  }

  login(email: string, password: string){
    this.store.dispatch( new ActivarLoadingAction() );

    this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then( resp => {
          this.router.navigate(['/']);
          this.store.dispatch( new DesactivarLoadingAction() );

        })
        .catch( error => {
          Swal.fire('Error en el registro', error.message, 'error');
          this.store.dispatch( new DesactivarLoadingAction() );
        });
  }

  logout(){

    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }

  isAuth(){
    return this.afAuth.authState.pipe(
      map( fbUser => { 

        if( fbUser == null){
          this.router.navigate(['/login']);
        }

        return fbUser != null 
      })
    );
  }

}
