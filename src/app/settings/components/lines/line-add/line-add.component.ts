import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SettingsService } from 'src/app/settings/settings.service';
import { ProductionAddComponent } from '../../../../../app/components/production/production-add/production-add.component';

@Component({
  selector: 'app-line-add',
  templateUrl: './line-add.component.html',
  styleUrls: ['./line-add.component.css']
})
export class LineAddComponent implements OnInit, OnDestroy {

  datasource: any = {
    zones: [],
    factoryList: []
  };
  flags: any = {
    displayLoader: Boolean,
    submitting: Boolean
  };
  errorSubmitting: Boolean = false;
  errorMsg: String = '';
  addLineForm!: FormGroup;
  private serviceSubscription: Subscription = new Subscription;
  afterViewInit = false;

  constructor(public dialogRef: MatDialogRef<ProductionAddComponent>, private formBuilder: FormBuilder,
    private settingsService: SettingsService) {
  }

  ngOnInit() {
    this.getFlagsStatus();
    this.getDefaultDetails();
  }

  getFlagsStatus() {
    this.flags.displayLoader = true;
    this.flags.submitting = false;
  }

  getDefaultDetails() {
    this.getFactoryList();
  }

  getFactoryList() {
    this.flags.displayLoader = true;
    this.settingsService.getAllFactoryList(
      (response: any) => {
        if (response && response.data && response.data.length > 0) {
          this.datasource.factoryList = response.data;
          this.generateLineForm();
        } else {
          this.flags.displayLoader = false;
        }
      },
      (error: any) => {
      }
    );
  }

  generateLineForm() {
    this.addLineForm = this.formBuilder.group({
      factory: ["", [Validators.required]],
      zone: ["", [Validators.required]],
      linename: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    });
    this.flags.displayLoader = false;
  }

  onChangeFactory() {
    // Reset Value
    this.datasource.zones = [];

    let result = this.datasource.factoryList.find((obj: any) =>
      obj.factory_id == this.addLineForm.controls['factory'].value.factory_id);
    this.datasource.zones = result.zones;
  }

  public errorHandling = (control: string, error: string) => {
    return this.addLineForm.controls[control].hasError(error);
  };

  onSubmit() {
    this.flags.submitting = true;
    this.flags.errorSubmitting = false;

    let postData = {
      zone_id: this.addLineForm.value.zone.zone_id,
      factory_id: this.addLineForm.value.factory.factory_id,
      line_name: this.addLineForm.value.linename
    }

    this.settingsService.createLine(
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
        data: "Error in Creating Line"
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

  ngOnDestroy(): void {
    this.serviceSubscription.unsubscribe();
  }

}
