import { AppStateExtends } from './ingreso-egreso.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from './../shared/ui.accions';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { IngresoEgresoService } from './ingreso-egreso.service';
import { Tipo, IngresoEgresoModel } from './ingreso-egreso.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2'
import { AppState } from '../app.reducer';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html'
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {


  form: FormGroup;
  tipo = 'ingreso';
  cargando: boolean;
  loadingSuscription: Subscription;

  constructor( private service: IngresoEgresoService,
              private store: Store<AppStateExtends>) { }
  
  ngOnInit(): void {

    this.loadingSuscription = this.store.select('ui').subscribe( ui => {
                                this.cargando = ui.isLoading;
                              });

    this.form = new FormGroup({
      'descripcion': new FormControl('', Validators.required),
      'monto': new FormControl(0, Validators.min(0)),
    });
  }

  ngOnDestroy(): void {
    this.loadingSuscription.unsubscribe();
  }

  onSubmit() {
    this.store.dispatch( new ActivarLoadingAction() );
    const ingresoEgreso = new IngresoEgresoModel({ ... this.form.value, tipo: this.tipo});

    this.service.crear(ingresoEgreso)
      .then( () => {
        Swal.fire('Creado', ingresoEgreso.descripcion, 'success');
        this.store.dispatch( new DesactivarLoadingAction() );
      })
      .catch( error => {
        Swal.fire('Error', error, 'error');
      this.store.dispatch( new DesactivarLoadingAction() );
      }) 
    this.form.reset({
      monto: 0
    })
  }

}
