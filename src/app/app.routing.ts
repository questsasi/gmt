import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { IconsComponent } from "./components/icons/icons.component";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { TableListComponent } from "./components/table-list/table-list.component";
import { TypographyComponent } from "./components/typography/typography.component";
import { UpgradeComponent } from "./components/upgrade/upgrade.component";
import { HourlyProductionComponent } from "./components/hourly-production/hourly-production.component";
import { ProductionListComponent } from "./components/production/production-list/production-list.component";
import { OrderComponent } from "./components/order/order.component";
import { NotificationsComponent } from "./components/notifications/notifications.component";
import { SupervisorComponent } from "./components/supervisor/supervisor.component";
import { LineComponent } from "./components/line/line.component";
import { TargetListComponent } from "./components/target/target-list/target-list.component";
import { ReportsZoneComponent } from "./components/reports/reports-zone/reports-zone.component";
import { ReportsLineComponent } from "./components/reports/reports-line/reports-line.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuardService } from "./services/auth-guard.service";
import { ContactUsComponent } from "./components/contact-us/contact-us.component";
import { AboutUsComponent } from "./components/about-us/about-us.component";
import { FaqComponent } from "./components/faq/faq.component";
import { LegalComponent } from "./components/legal/legal.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  { path: "login", component: LoginComponent },
  { path: "target", component: TargetListComponent, canActivate: [AuthGuardService] },
  { path: "production", component: ProductionListComponent, canActivate: [AuthGuardService] },
  { path: "reports/zones", component: ReportsZoneComponent, canActivate: [AuthGuardService] },
  { path: "reports/lines", component: ReportsLineComponent, canActivate: [AuthGuardService] },

  { path: "dashboard", component: DashboardComponent },
  { path: "user-profile", component: UserProfileComponent },
  { path: "table-list", component: TableListComponent },
  { path: "typography", component: TypographyComponent },
  { path: "icons", component: IconsComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "upgrade", component: UpgradeComponent },
  { path: "supervisor", component: SupervisorComponent },
  { path: "line", component: LineComponent },
  { path: "hourly_production", component: HourlyProductionComponent },
  { path: "order", component: OrderComponent },
  { path: "about-us", component: AboutUsComponent },
  { path: "contact-us", component: ContactUsComponent },
  { path: "faq", component: FaqComponent },
  { path: "legal", component: LegalComponent }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [],
})
export class AppRoutingModule { }
