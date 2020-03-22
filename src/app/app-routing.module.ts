import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { PortafolioComponent } from './pages/portafolio/portafolio.component';
import { EnrollmentComponent } from './pages/enrollment/enrollment.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ConfirmEnrollmentComponent } from './pages/confirm-enrollment/confirm-enrollment.component';
import { EventComponent } from './pages/event/event.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about-us', component: AboutComponent },
  { path: 'portafolio', component: PortafolioComponent },
  { path: 'inscripcion', component: EnrollmentComponent },
  { path: 'contact-us', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'confirm-enrollment', component: ConfirmEnrollmentComponent },
  { path: 'event', component: EventComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
