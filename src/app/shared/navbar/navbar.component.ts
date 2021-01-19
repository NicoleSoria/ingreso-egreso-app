import { auth } from 'firebase';
import { audit, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit, OnDestroy {

  subscripcion: Subscription = new Subscription();
  nombre: string;

  constructor( private store: Store<AppState>) { }

  ngOnInit(): void {

    this.subscripcion = this.store.select('auth')
      .pipe(
        filter( auth => auth.user != null)
      )
      .subscribe( auth => {
        this.nombre = auth.user.nombre;
      });
  }

  ngOnDestroy(){
    this.subscripcion.unsubscribe();
  }

}
