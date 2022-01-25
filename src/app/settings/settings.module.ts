import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { UmEditComponent } from './components/um/um-edit/um-edit.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UmListComponent } from './components/um/um-list/um-list.component';
import { UmAddComponent } from './components/um/um-add/um-add.component';
import { UmActivateComponent } from './components/um/um-activate/um-activate.component';
import { UmDeactivateComponent } from './components/um/um-deactivate/um-deactivate.component';
import { SettingsRoutes } from './settings.routes';
import { SettingsService } from './settings.service';

@NgModule({
  declarations: [
    UmListComponent,
    UmAddComponent,
    UmActivateComponent,
    UmDeactivateComponent,
    UmEditComponent,
    SettingsComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(SettingsRoutes),
  ],
  providers: [
    SettingsService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SettingsModule { }
