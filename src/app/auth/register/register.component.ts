import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  email: string;
  name: string;
  password: string;

  constructor( private authService: AuthService ) { }

  ngOnInit(): void {
  }


  onSubmit(){
     this.authService.crearUsuario(this.name, this.email, this.password);
  }
}
