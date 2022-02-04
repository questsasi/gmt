import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SettingsService } from '../../../../../app/settings/settings.service';

@Component({
  selector: 'app-line-deactivate',
  templateUrl: './line-deactivate.component.html',
  styleUrls: ['./line-deactivate.component.css']
})
export class LineDeactivateComponent {

  selectedLine: any;
  confirmButtonText = "Yes";
  cancelButtonText = "No";
  flags: any = {};
  errorMsg!: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<LineDeactivateComponent>,
    private settingsService: SettingsService) {
    if (data) {
      this.selectedLine = data.selectedLine;
    }
    this.getFlagsStatus();
  }

  getFlagsStatus() {
    this.flags.submitting = false;
    this.flags.errorSubmitting = false;
  }

  onConfirmClick(): void {
    this.onTriggerDeactivateLine();
  }

  onTriggerDeactivateLine() {
    this.getFlagsStatus();
    this.flags.submitting = true;
    const postData = {
      lineId: this.selectedLine.id,
      is_active: false
    };
    this.settingsService.modifyLineStatus(
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
        data: "Error in Deactivating Line"
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