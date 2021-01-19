import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  cargando: boolean;

  constructor( private authService: AuthService,
              private store: Store<AppState> ) { }

  ngOnInit(): void {

    this.store.select('ui')
          .subscribe( ui => {
            this.cargando = ui.isLoading;
          } )
  }

  login(){
    this.authService.login(this.email, this.password);
  }

}
