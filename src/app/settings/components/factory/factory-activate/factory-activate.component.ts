import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-factory-activate',
  templateUrl: './factory-activate.component.html',
  styleUrls: ['./factory-activate.component.css']
})
export class FactoryActivateComponent {

  selectedFactory: any;
  confirmButtonText = "Yes";
  cancelButtonText = "Cancel";

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<FactoryActivateComponent>) {
    if (data) {
      this.selectedFactory = data.selectedFactory;
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
