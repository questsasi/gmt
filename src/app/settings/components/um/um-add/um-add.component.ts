import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SettingsService } from 'src/app/settings/settings.service';

@Component({
  selector: 'app-um-add',
  templateUrl: './um-add.component.html',
  styleUrls: ['./um-add.component.css']
})
export class UmAddComponent implements OnInit {
  flags: any = {};
  addUserForm!: FormGroup;

  constructor(private dialogRef: MatDialogRef<UmAddComponent>, private formBuilder: FormBuilder,
    private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.getFlagsStatus();
    this.generatedAddUserForm();
  }

  getFlagsStatus() {
    this.flags.displayLoader = true;
    this.flags.submitting = false;
  }

  generatedAddUserForm() {
    this.addUserForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      emailId: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      mobile: ["", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    });

    this.flags.displayLoader = false;
  }

  public errorHandling = (control: string, error: string) => {
    return this.addUserForm.controls[control].hasError(error);
  };

  onSubmit() {
    this.flags.submitting = true;

    let postData = {
      name: this.addUserForm.value.name,
      email_id: this.addUserForm.value.emailId,
      password: this.addUserForm.value.password,
      mobile_number: this.addUserForm.value.mobile
    }

    this.settingsService.createUser(
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
