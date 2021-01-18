import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor( private authService: AuthService ) { }

  ngOnInit(): void {
  }

  login(){
    this.authService.login(this.email, this.password);
  }

}
