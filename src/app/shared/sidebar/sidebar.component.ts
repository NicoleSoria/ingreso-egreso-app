import { IngresoEgresoService } from './../../ingreso-egreso/ingreso-egreso.service';
import { Store } from '@ngrx/store';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit, OnDestroy {

  subscripcion: Subscription = new Subscription();
  nombre: string;
  
  constructor( private authService: AuthService,
              private store: Store<AppState>,
              private ingresoEgresoService: IngresoEgresoService) { }

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
  logout(){
    this.authService.logout();
    this.ingresoEgresoService.cancelarSubscripciones();
  }
}
