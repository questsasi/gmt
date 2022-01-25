import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-um-activate',
  templateUrl: './um-activate.component.html',
  styleUrls: ['./um-activate.component.css']
})
export class UmActivateComponent {

  selectedUser: any;
  confirmButtonText = "Yes";
  cancelButtonText = "Cancel";

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<UmActivateComponent>) {
    if (data) {
      this.selectedUser = data.selectedUser;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

}
