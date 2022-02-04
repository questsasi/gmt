import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SettingsService } from '../../../../../app/settings/settings.service';

@Component({
  selector: 'app-factory-activate',
  templateUrl: './factory-activate.component.html',
  styleUrls: ['./factory-activate.component.css']
})
export class FactoryActivateComponent {

  selectedFactory: any;
  selectedFactoryId: any;
  flags: any = {};
  errorMsg!: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<FactoryActivateComponent>,
    private settingsService: SettingsService) {
    if (data) {
      this.selectedFactory = data;
    }
    this.getFlagsStatus();
  }

  getFlagsStatus() {
    this.flags.submitting = false;
    this.flags.errorSubmitting = false;
  }

  onConfirmClick(): void {
    this.onTriggerActivateFactory();
  }

  onTriggerActivateFactory() {
    this.getFlagsStatus();
    this.flags.submitting = true;
    
    this.settingsService.activateFactory(
      this.selectedFactory.id,
      (resp: any) => {
        this.flags.submitting = false;
        if (resp && resp.success) {
          this.dialogRef.close(true);
        } else {
          this.getSuccessErrorFn(resp);
        }
      },
      (err: any) => {
        this.getErrorFn(err);
      }
    );
  }

  getSuccessErrorFn(resp: any) {
    this.errorMsg = resp.data;
    this.flags.errorSubmitting = false;
    setTimeout(() => {
      this.flags.errorSubmitting = true;
    }, 1 * 1000);
  }

  getErrorFn(err: any) {
    err = {
      error: {
        data: "Error in Activating Factory"
      }
    }
    this.flags.submitting = false;
    this.errorMsg = (err && err.error && err.error.data) ? err.error.data : '';
    this.flags.errorSubmitting = false;
    setTimeout(() => {
      this.flags.errorSubmitting = true;
    }, 1 * 1000);
  }

}
