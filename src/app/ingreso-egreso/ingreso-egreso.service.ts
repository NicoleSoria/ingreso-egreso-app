import { SetItemsActions, UnsetItemsActions } from './ingreso-egreso.actions';
import { Store } from '@ngrx/store';
import { AuthService } from './../auth/auth.service';
import { IngresoEgresoModel } from './ingreso-egreso.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

   IEListenerSubscription: Subscription = new Subscription();
   IEItemsSubscription: Subscription = new Subscription();

  constructor( private firebase: AngularFirestore,
              private authService: AuthService,
              private store: Store<AppState> ) {

               }


  initIngresoEgresoListener() {
    
    this.IEListenerSubscription = this.store.select('auth')
      .pipe(
        filter( auth => auth.user != null )
      )
      .subscribe( auth => {
         this.ingresoEgresoItems(auth.user.uid);
    })
  }

  cancelarSubscripciones() {
    this.IEListenerSubscription.unsubscribe();
    this.IEItemsSubscription.unsubscribe();

    this.store.dispatch( new UnsetItemsActions() );
  }

  crear( ingresoEgreso: IngresoEgresoModel ) {
   const user = this.authService.getUsuario();

    return this.firebase.doc(`${user.uid}/ingresos-egresos`).collection('items').add({...ingresoEgreso});
  }

  eliminar(uid: string) {
    const user = this.authService.getUsuario();

    return this.firebase.doc(`${user.uid}/ingresos-egresos/items/${uid}`).delete();
  }

  private ingresoEgresoItems( uid: string ) {

    this.IEItemsSubscription = this.firebase.collection(`${uid}/ingresos-egresos/items`)
        .snapshotChanges()
        .pipe(
          map( data => {
            return data.map( doc => {
              return {
                ...doc.payload.doc.data() as {},
                uid: doc.payload.doc.id
                //monto: doc.payload.doc.data().monto
              }
            })
          })
        )
        .subscribe( (coleccion: any[]) => {
          
          this.store.dispatch( new SetItemsActions(coleccion) );
        });
  }

}
