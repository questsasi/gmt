import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-um-edit',
  templateUrl: './um-edit.component.html',
  styleUrls: ['./um-edit.component.css']
})
export class UmEditComponent {

  selectedUser: any;
  confirmButtonText = "Yes";
  cancelButtonText = "Cancel";
  editUserForm!: FormGroup;
  flags: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<UmEditComponent>,
    private formBuilder: FormBuilder, private appService: AppService) {
    this.flags.displayLoader = true;
    if (data) {
      this.selectedUser = data.selectedUser;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }

      this.generateForm();
    }
  }

  generateForm() {
    this.editUserForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      emailId: ["", [Validators.required]],
      password: ["", [Validators.required]],
      mobile: ["", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    });

    this.preFillData();
  }

  preFillData() {
    this.editUserForm.setValue({
      name: this.selectedUser.name,
      emailId: this.selectedUser.email_id,
      password: this.selectedUser.password,
      mobile: this.selectedUser.mobile_number
    });

    this.editUserForm.controls['name'].disable();
    this.editUserForm.controls['emailId'].disable();

    this.flags.displayLoader = false;
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

  public errorHandling = (control: string, error: string) => {
    return this.editUserForm.controls[control].hasError(error);
  };

  onSubmit() {
    this.flags.submitting = true;
    let postData = {
      password: this.editUserForm.value.password,
      mobile_number: this.editUserForm.value.mobile
    }

    this.appService.updateUser(
      this.selectedUser.id,
      postData,
      (resp: any) => {
        this.flags.submitting = false;
        this.onClickCancel();
      },
      (err: any) => {
        this.flags.submitting = false;
        this.onClickCancel();
      });
  }

  onClickCancel() {
    this.dialogRef.close();
  }
}
