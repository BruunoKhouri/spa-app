import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoggedInGuard } from './security/loggedin.guard';
import { LoginComponent } from './security/login/login.component';

const routes: Routes = [
  { path: 'login/:to', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  {
    path: 'home', component: HomeComponent, canActivate: [LoggedInGuard],
    children: [
      { path: 'teste', component: HomeComponent, canLoad: [LoggedInGuard] }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
