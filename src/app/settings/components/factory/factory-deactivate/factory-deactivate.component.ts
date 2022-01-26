import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-factory-deactivate',
  templateUrl: './factory-deactivate.component.html',
  styleUrls: ['./factory-deactivate.component.css']
})
export class FactoryDeactivateComponent {

  selectedFactory: any;
  confirmButtonText = "Yes";
  cancelButtonText = "Cancel";

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<FactoryDeactivateComponent>) {
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
