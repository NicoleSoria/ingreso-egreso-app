import { AppStateExtends } from './../ingreso-egreso.reducer';
import { IngresoEgresoModel, Tipo } from './../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { SingleDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html'
})
export class EstadisticaComponent implements OnInit {

  ingresos: number;
  egresos: number;

  cuantosIngresos: number;
  cuantosEgresos: number;

  subscription: Subscription = new Subscription();

  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: number[] = [];

  public doughnutChartColors: Color[] = [
    {backgroundColor:["#06B62B", "#dc3545"]},
  ];
  
  constructor(private store: Store<AppStateExtends>) { }

  ngOnInit(): void {

    this.subscription = this.store.select('ingresoEgreso')
            .subscribe( ingresoEgreso => {
              this.contar(ingresoEgreso.items);
            })
  }

  contar( items: IngresoEgresoModel[] ){
    this.ingresos = 0;
    this.egresos = 0;

    this.cuantosEgresos = 0;
    this.cuantosIngresos = 0;

    items.forEach( item => {

      if( item.tipo == 'ingreso'){
        this.cuantosIngresos ++;
        this.ingresos += item.monto;
      }
      else {
        this.cuantosEgresos ++;
        this.egresos += item.monto;
      }
    })

    this.doughnutChartData = [ this.ingresos, this.egresos ];
  }
}
