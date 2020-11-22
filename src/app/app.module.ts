import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { HeaderComponent } from './_shared/header/header.component';
import { PortafolioComponent } from './pages/portafolio/portafolio.component';
import { EnrollmentComponent } from './pages/enrollment/enrollment.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { FooterComponent } from './_shared/footer/footer.component';
import { PageHeaderComponent } from './_shared/page-header/page-header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ConfirmEnrollmentComponent } from './pages/confirm-enrollment/confirm-enrollment.component';
import { PrivateHeaderComponent } from './_shared/private-header/private-header.component';
import { EventComponent } from './pages/event/event.component';
import { ResultsComponent } from './pages/results/results.component';
import { ExcelService } from './_shared/excel.service';
import { TimeFormatPipe } from './_shared/time-format.pipe';
import { ModalityFormatPipe } from './_shared/modality-format.pipe';
import { TypeFormatPipe } from './_shared/type-format.pipe';

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
    EventComponent,
    ResultsComponent,
    TimeFormatPipe,
    ModalityFormatPipe,
    TypeFormatPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    MatMomentDateModule,
    MatInputModule,
    MatPaginatorModule
  ],
  providers: [ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
