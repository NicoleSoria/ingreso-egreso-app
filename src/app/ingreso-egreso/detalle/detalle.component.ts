import { IngresoEgresoService } from './../ingreso-egreso.service';
import { Subscription } from 'rxjs';
import { IngresoEgresoModel } from './../ingreso-egreso.model';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html'
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgresoModel[];
  subscription: Subscription = new Subscription();

  constructor( private store: Store<AppState>,
                private service: IngresoEgresoService) { }

  ngOnInit(): void {

    this.subscription = this.store.select('ingresoEgreso').subscribe( resp => {
      this.items = resp.items;
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  borrar(item ) {

    this.service.eliminar(item.uid).then(() => {
      Swal.fire('Eliminado', `${item.descripcion} eliminado con éxito`, 'success');
    });
  }

}
