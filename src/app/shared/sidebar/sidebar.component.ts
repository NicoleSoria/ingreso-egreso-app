import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  constructor( private authService: AuthService ) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
  }
}
