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
import { FactoryListComponent } from './components/factory/factory-list/factory-list.component';
import { FactoryAddComponent } from './components/factory/factory-add/factory-add.component';
import { FactoryActivateComponent } from './components/factory/factory-activate/factory-activate.component';
import { FactoryDeactivateComponent } from './components/factory/factory-deactivate/factory-deactivate.component';

@NgModule({
  declarations: [
    UmListComponent,
    UmAddComponent,
    UmActivateComponent,
    UmDeactivateComponent,
    UmEditComponent,
    SettingsComponent,
    FactoryListComponent,
    FactoryAddComponent,
    FactoryActivateComponent,
    FactoryDeactivateComponent,
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
