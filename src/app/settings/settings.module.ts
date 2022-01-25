import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UmListComponent } from './components/um/um-list/um-list.component';
import { UmAddComponent } from './components/um/um-add/um-add.component';
import { UmActivateComponent } from './components/um/um-activate/um-activate.component';
import { UmDeactivateComponent } from './components/um/um-deactivate/um-deactivate.component';
import { UmEditComponent } from './components/um/um-edit/um-edit.component';
import { SettingsService } from './settings.service';
import { SettingsRoutes } from './settings.routes';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [
    UmListComponent,
    UmAddComponent,
    UmActivateComponent,
    UmDeactivateComponent,
    UmEditComponent,
    SettingsComponent,
    // SettingsModule.forChild(SettingsRoutes),
    // SettingsRoutingModule
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTooltipModule,
    MatFormFieldModule,
    RouterModule.forChild(SettingsRoutes),
  ],
  providers: [
    SettingsService,
    { provide: MatDialogRef, useValue: {} },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SettingsModule { }
