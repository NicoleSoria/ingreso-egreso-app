import { Store } from '@ngrx/store';
import { IngresoEgresoService } from './../ingreso-egreso/ingreso-egreso.service';
import { Component, OnInit } from '@angular/core';
import { AppState } from '../app.reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  

  constructor( private ingresoEgresoService: IngresoEgresoService,
                private store: Store<AppState> ) { }

  ngOnInit(): void {

    this.ingresoEgresoService.initIngresoEgresoListener();


  }

}
