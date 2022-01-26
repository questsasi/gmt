import { Routes } from "@angular/router";
import { AuthGuardService } from "../services/auth-guard.service";
import { FactoryListComponent } from './components/factory/factory-list/factory-list.component';
import { SettingsComponent } from "./components/settings/settings.component";
import { UmListComponent } from "./components/um/um-list/um-list.component";
import { ZoneListComponent } from './components/zones/zone-list/zone-list.component';

export const SettingsRoutes: Routes = [
  { path: "um", component: UmListComponent, canActivate: [AuthGuardService] },
  { path: "factory", component: FactoryListComponent, canActivate: [AuthGuardService] },
  { path: "zone", component: ZoneListComponent, canActivate: [AuthGuardService] },
  { path: "", component: SettingsComponent },
]