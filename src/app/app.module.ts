import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { HeaderComponent } from './shared/header/header.component';
import { PortafolioComponent } from './pages/portafolio/portafolio.component';
import { EnrollmentComponent } from './pages/enrollment/enrollment.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { FooterComponent } from './shared/footer/footer.component';
import { PageHeaderComponent } from './shared/page-header/page-header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ConfirmEnrollmentComponent } from './pages/confirm-enrollment/confirm-enrollment.component';
import { PrivateHeaderComponent } from './shared/private-header/private-header.component';
import { EventComponent } from './pages/event/event.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    HeaderComponent,
    PortafolioComponent,
    EnrollmentComponent,
    ContactComponent,
    LoginComponent,
    FooterComponent,
    PageHeaderComponent,
    DashboardComponent,
    ConfirmEnrollmentComponent,
    PrivateHeaderComponent,
    EventComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    MatMomentDateModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
