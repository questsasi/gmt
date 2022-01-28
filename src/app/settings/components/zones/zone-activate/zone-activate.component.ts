import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SettingsService } from '../../../../../app/settings/settings.service';

@Component({
  selector: 'app-zone-activate',
  templateUrl: './zone-activate.component.html',
  styleUrls: ['./zone-activate.component.css']
})
export class ZoneActivateComponent {

  selectedZone: any;
  confirmButtonText = "Yes";
  cancelButtonText = "No";
  flags: any = {};
  errorMsg!: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ZoneActivateComponent>,
    private settingsService: SettingsService) {
    if (data) {
      this.selectedZone = data.selectedZone;
    }
    this.getFlagsStatus();
  }

  getFlagsStatus() {
    this.flags.displayLoader = false;
    this.flags.submitting = false;
    this.flags.errorSubmitting = false;
  }

  onConfirmClick(): void {
    this.onTriggerActivateZone();
  }

  onTriggerActivateZone() {
    this.getFlagsStatus();
    this.flags.displayLoader = true;
    const postData = {
      zoneId: this.selectedZone.id,
      is_active: true
    };
    this.settingsService.modifyZoneStatus(
      postData,
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
        data: "Error in Activating Zone"
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
