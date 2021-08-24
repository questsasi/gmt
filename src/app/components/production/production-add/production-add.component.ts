import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';

import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-production-add',
  templateUrl: './production-add.component.html',
  styleUrls: ['./production-add.component.css']
})
export class ProductionAddComponent {

  datasource: any = {
    productionDetails: {},
    zones: [],
    lines: []
  }
  flags: any = {
    displayLoader: Boolean,
    submitting: Boolean
  };
  productionForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<ProductionAddComponent>, private formBuilder: FormBuilder,
    private appService: AppService) {
    this.getFlagsStatus();
    this.getProductionDetails();
  }

  getFlagsStatus() {
    this.flags.displayLoader = true;
    this.flags.submitting = false;
  }

  getProductionDetails() {
    this.flags.displayLoader = true;
    this.appService.getTargetDetails(
      (response: any) => {
        if (response && response.length > 0) {
          this.datasource.productionDetails = response[0];
          if (this.datasource.productionDetails && this.datasource.productionDetails.zones
            && this.datasource.productionDetails.zones.length > 0) {
            this.datasource.zones = [this.datasource.productionDetails.zones[0]];
            this.generateProductionForm();
          }
        }
      },
      (error: any) => {
        console.error("<-- Error in Fetching target details -->", error);
      }
    );
  }

  generateProductionForm() {
    this.productionForm = this.formBuilder.group({
      dateOfProduction: ["", [Validators.required]],
      zone: ["", [Validators.required]],
      line: ["", [Validators.required]],
      productionHour: [1, [Validators.required]],
      output: ["", [Validators.required, Validators.min(0), Validators.max(20000)]]
    });

    let todayDate = new Date().toISOString().split("T")[0];
    this.productionForm.controls['dateOfProduction'].setValue(todayDate);
    this.flags.displayLoader = false;
  }

  onZoneChange(event: any) {
    this.datasource.lines = [];
    let result = this.datasource.zones.find((obj: any) => obj.id == this.productionForm.controls['zone'].value);
    this.datasource.lines = result.lines;
  }

  public errorHandling = (control: string, error: string) => {
    return this.productionForm.controls[control].hasError(error);
  };

  onSubmit() {
    this.flags.submitting = true;

    let postData = {
      production_date: moment(this.productionForm.value.dateOfTarget).format('YYYY-MM-DD'),
      zone_id: this.productionForm.value.zone,
      line_id: this.productionForm.value.line,
      production_hrs: this.productionForm.value.productionHour,
      output: this.productionForm.value.output
    }

    this.appService.postCreateProduction(
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
