import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';

import { AppRoutingModule } from './app.routing';
import { HttpService } from './http.service';
import { AppService } from './app.service';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SupervisorComponent } from './components/supervisor/supervisor.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SupervisorAddComponent } from './components/supervisor-add/supervisor-add.component';
import { HourlyProductionComponent } from './components/hourly-production/hourly-production.component';
import { LineComponent } from './components/line/line.component';
import { LineAddComponent } from './components/line-add/line-add.component';
import { ProductionListComponent } from './components/production/production-list/production-list.component';
import { OrderComponent } from './components/order/order.component';
import { OrderAddComponent } from './components/order-add/order-add.component';
import { TargetListComponent } from './components/target/target-list/target-list.component';
import { TargetAddComponent } from './components/target/target-add/target-add.component';
import { LoaderComponent } from './common/loader/loader.component';
import { ProductionAddComponent } from './components/production/production-add/production-add.component';
import { ReportsZoneComponent } from './components/reports/reports-zone/reports-zone.component';
import { ReportsLineComponent } from './components/reports/reports-line/reports-line.component';
import { ConfirmDeleteTargetComponent } from './components/target/confirm-delete-target/confirm-delete-target.component';
import { ConfirmDeleteProductionComponent } from './components/production/confirm-delete-production/confirm-delete-production.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DataSharedService } from './common/data-shared.service';
import { LoginComponent } from './components/login/login.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FaqComponent } from './components/faq/faq.component';
import { LegalComponent } from './components/legal/legal.component';
import { DisclaimerComponent } from './components/disclaimer/disclaimer.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { BrowserModule } from '@angular/platform-browser';
import { BlogComponent } from './components/blog/blog.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SupervisorComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    UserProfileComponent,
    DashboardComponent,
    SupervisorAddComponent,
    HourlyProductionComponent,
    LineComponent,
    LineAddComponent,
    ProductionListComponent,
    OrderComponent,
    OrderAddComponent,
    TargetListComponent,
    TargetAddComponent,
    LoaderComponent,
    ProductionAddComponent,
    ReportsZoneComponent,
    ReportsLineComponent,
    ConfirmDeleteTargetComponent,
    ConfirmDeleteProductionComponent,
    LoginComponent,
    AboutUsComponent,
    ContactUsComponent,
    FaqComponent,
    LegalComponent,
    DisclaimerComponent,
    PrivacyComponent,
    BlogComponent,
    BlogListComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    AppRoutingModule,

    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    HttpService,
    AppService,
    DataSharedService,
    MatDatepickerModule,
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
