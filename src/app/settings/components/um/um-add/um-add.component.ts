import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SettingsService } from 'src/app/settings/settings.service';

@Component({
  selector: 'app-um-add',
  templateUrl: './um-add.component.html',
  styleUrls: ['./um-add.component.css']
})
export class UmAddComponent implements OnInit {
  flags: any = {};
  datasource: any = {};
  addUserForm!: FormGroup;
  errorMsg!: String;

  constructor(private dialogRef: MatDialogRef<UmAddComponent>, private formBuilder: FormBuilder,
    private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.getFlagsStatus();
    this.getAllFactoryList();
  }

  getFlagsStatus() {
    this.flags.displayLoader = true;
    this.flags.submitting = false;
    this.flags.errorSubmitting = false;
  }

  getAllFactoryList() {
    this.flags.displayLoader = true;
    this.settingsService.getAllFactoryList(
      (response: any) => {
        if (response && response.data && response.data.length > 0) {
          this.datasource.factory = response.data;
          this.generatedAddUserForm();
        } else {
          this.flags.displayLoader = false;
        }
      },
      (error: any) => {
      }
    );
  }

  generatedAddUserForm() {
    this.addUserForm = this.formBuilder.group({
      factory: ["", [Validators.required]],
      zone: ["", [Validators.required]],
      line: ["", [Validators.required]],
      name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      employeeId: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      emailId: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]],
      mobile: ["", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    });

    this.flags.displayLoader = false;
  }

  public errorHandling = (control: string, error: string) => {
    // this.getFormValidationErrors();
    return this.addUserForm.controls[control].hasError(error);
  };

  getFormValidationErrors() {
    Object.keys(this.addUserForm.controls).forEach(key => {
      const controlErrors = this.addUserForm.controls[key].errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }

  onChangeFactory() {
    this.datasource.zones = [];
    this.datasource.lines = [];

    let temp = this.addUserForm.controls['factory'].value;
    let result = this.datasource.factory.find((obj: any) =>
      obj.factory_id == temp.factory_id);
    this.datasource.zones = result.zones;
  }

  onChangeZone() {
    this.datasource.lines = [];

    let temp = this.addUserForm.controls['zone'].value;
    let result = this.datasource.zones.find((obj: any) =>
      obj.zone_id == temp.zone_id);
    this.datasource.lines = result.lines;
  }

  onSubmit() {
    this.flags.submitting = true;
    this.flags.errorSubmitting = false;

    let postData = {
      factory_id: this.addUserForm.controls['factory'].value.factory_id,
      zone_id: this.addUserForm.controls['zone'].value.zone_id,
      line_id: this.addUserForm.controls['line'].value.line_id,
      name: this.addUserForm.value.name,
      employee_id: this.addUserForm.value.employeeId,
      email_id: this.addUserForm.value.emailId,
      password: this.addUserForm.value.password,
      mobile_number: this.addUserForm.value.mobile
    }

    this.settingsService.createUser(
      postData,
      (resp: any) => {
        this.flags.submitting = false;
        if (resp && resp.success) {
          this.onClickCancel();
        } else {
          this.getSuccessErrorFn(resp);
        }
      },
      (err: any) => {
        this.getErrorFn(err);
      });
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
        data: "Error in Adding User"
      }
    }
    this.flags.submitting = false;
    this.errorMsg = (err && err.error && err.error.data) ? err.error.data : '';
    this.flags.errorSubmitting = false;
    setTimeout(() => {
      this.flags.errorSubmitting = true;
    }, 1 * 1000);
  }

  onClickCancel() {
    this.dialogRef.close();
  }

}
