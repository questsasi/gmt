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
import { ReportsComponent } from "./components/reports/reports.component";
import { AuthGuard } from "./guard/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "target", component: TargetListComponent, canActivate: [AuthGuard] },
  { path: "production", component: ProductionListComponent, canActivate: [AuthGuard] },

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
  { path: "reports", component: ReportsComponent }
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
