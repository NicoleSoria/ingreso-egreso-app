import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  email: string;
  name: string;
  password: string;

  cargando: boolean;

  constructor( private authService: AuthService,
                private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('ui')
          .subscribe( ui => {
            this.cargando = ui.isLoading;
          });
  }


  onSubmit(){
     this.authService.crearUsuario(this.name, this.email, this.password);
  }
}
