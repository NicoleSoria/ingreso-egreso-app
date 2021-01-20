import { AuthGuardService } from './../auth/auth-guard.service';
import { dashboardRoutes } from './dashboard.routes';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
    { 
        path: '', 
        component: DashboardComponent,
        children: dashboardRoutes,
        //canActivate: [ AuthGuardService ] 
    },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }