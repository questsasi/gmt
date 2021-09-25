import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Validators, FormBuilder, FormGroup, } from "@angular/forms";
import * as moment from 'moment';

import { AppService } from "src/app/app.service";

@Component({
  selector: 'app-target-add',
  templateUrl: './target-add.component.html',
  styleUrls: ['./target-add.component.css']
})
export class TargetAddComponent {

  datasource: any = {
    targetDetails: {},
    zones: [],
    lines: []
  }
  flags: any = {
    displayLoader: Boolean,
    submitting: Boolean
  };
  targetForm!: FormGroup;


  constructor(public dialogRef: MatDialogRef<TargetAddComponent>, private formBuilder: FormBuilder,
    private appService: AppService) {
    this.getFlagsStatus();
    this.getTargetDetails();
  }

  getFlagsStatus() {
    this.flags.displayLoader = true;
    this.flags.submitting = false;
  }

  getTargetDetails() {
    this.flags.displayLoader = true;
    this.appService.getTargetDetails(
      (response: any) => {
        if (response && response.success && response.data && response.data.zone && response.data.zone.length > 0) {
          this.datasource.targetDetails = response.data.zone[0];
          if (this.datasource.targetDetails && this.datasource.targetDetails.zones
            && this.datasource.targetDetails.zones.length > 0) {
            this.datasource.zones = [this.datasource.targetDetails.zones[0]];
            this.generateTargetForm();
          } else {
            this.flags.displayLoader = false;
            console.error("<-- Zone List is Empty at factory level -->");
          }
        } else {
          this.flags.displayLoader = false;
          console.error("<-- Zone List is Empty at parent level -->");
        }
      },
      (error: any) => {
        console.error("<-- Error in fetching Target Details -->", error);
      }
    );
  }

  generateTargetForm() {
    this.targetForm = this.formBuilder.group({
      dateOfTarget: ["", [Validators.required]],
      zone: ["", [Validators.required]],
      line: ["", [Validators.required]],
      productionHour: [1, [Validators.required]],
      target: ["", [Validators.required, Validators.min(0), Validators.max(20000)]]
    });

    let todayDate = new Date().toISOString().split("T")[0];
    this.targetForm.controls['dateOfTarget'].setValue(todayDate);
    this.flags.displayLoader = false;
  }

  onZoneChange(event: any) {
    this.datasource.lines = [];
    let result = this.datasource.zones.find((obj: any) => obj.id == this.targetForm.controls['zone'].value);
    this.datasource.lines = result.lines;
  }

  public errorHandling = (control: string, error: string) => {
    return this.targetForm.controls[control].hasError(error);
  };

  onSubmit() {
    this.flags.submitting = true;

    let postData = {
      date: moment(this.targetForm.value.dateOfTarget).format('YYYY-MM-DD'),
      zone_id: this.targetForm.value.zone,
      line_id: this.targetForm.value.line,
      production_hrs: this.targetForm.value.productionHour,
      target: this.targetForm.value.target
    }

    this.appService.createTarget(
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
