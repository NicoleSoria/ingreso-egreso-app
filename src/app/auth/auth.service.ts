import { User } from './user.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import Swal from 'sweetalert2'
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private firebase: AngularFirestore) { }


  initAuthListener(){

    this.afAuth.authState.subscribe( (fbUser: firebase.User) => {
      console.log(fbUser);
    })

  }

  crearUsuario(nombre: string, email: string, password: string){

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
                        })
                        .catch( error => {
                          Swal.fire('Error en el registro', error.message, 'error');
                        });

        })
        .catch( error => {
          Swal.fire('Error en el registro', error.message, 'error');
        })
  }

  login(email: string, password: string){
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then( resp => {
          this.router.navigate(['/']);
        })
        .catch( error => {
          Swal.fire('Error en el registro', error.message, 'error');

        })
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
