import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatNativeDateModule, MatRippleModule, MAT_DATE_LOCALE } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { FooterComponent } from "./components/footer/footer.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { SupervisorComponent } from "./components/supervisor/supervisor.component";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { SupervisorAddComponent } from './components/supervisor-add/supervisor-add.component';
import { HttpService } from "./http.service";
import { AppService } from "./app.service";
import { HourlyProductionComponent } from './components/hourly-production/hourly-production.component';
import { LineComponent } from './components/line/line.component';
import { LineAddComponent } from './components/line-add/line-add.component';
import { ProductionComponent } from './components/production/production.component';
import { OrderComponent } from './components/order/order.component';
import { OrderAddComponent } from './components/order-add/order-add.component';
import { TargetComponent } from "./components/target/target.component";
import { TargetAddComponent } from './components/target-add/target-add.component';
import { LoaderComponent } from './base/loader/loader.component';
import { ReportsComponent } from './components/reports/reports.component';

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
    ProductionComponent,
    OrderComponent,
    OrderAddComponent,
    TargetComponent,
    TargetAddComponent,
    LoaderComponent,
    ReportsComponent
  ],
  imports: [
    BrowserAnimationsModule,
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
    MatProgressSpinnerModule
  ],
  providers: [
    HttpService,
    AppService,
    MatDatepickerModule,
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
