import { Component, OnDestroy } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Validators, FormBuilder, FormGroup, } from "@angular/forms";
import * as moment from 'moment';

import { AppService } from "src/app/app.service";
import { DataSharedService } from "src/app/common/data-shared.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-target-add',
  templateUrl: './target-add.component.html',
  styleUrls: ['./target-add.component.css']
})
export class TargetAddComponent implements OnDestroy {

  datasource: any = {
    zones: [],
    lines: []
  }
  flags: any = {
    displayLoader: Boolean,
    submitting: Boolean
  };
  targetForm!: FormGroup;
  private serviceSubscription: Subscription = new Subscription;

  constructor(public dialogRef: MatDialogRef<TargetAddComponent>, private formBuilder: FormBuilder,
    private appService: AppService, private dataSharedService: DataSharedService) {
    this.getFlagsStatus();
    this.serviceSubscription = this.dataSharedService.getDate().subscribe((getDate: any) => {
      this.datasource.selectedDate = getDate;
      this.getTargetDetails();
    });
  }

  getFlagsStatus() {
    this.flags.displayLoader = true;
    this.flags.submitting = false;
  }

  getTargetDetails() {
    this.flags.displayLoader = true;
    this.appService.getTargetDetails(
      (response: any) => {
        if (response && response.data && response.data.zones && response.data.zones.length > 0) {
          this.datasource.zones = response.data.zones;
          this.datasource.buyers = response.data.buyers;
          this.datasource.styles = response.data.styles;
          this.generateTargetForm();
        } else {
          this.flags.displayLoader = false;
          console.log("Zone List is empty");
        }
      },
      (error: any) => {
        console.error("Error in fetching target", error);
        this.flags.displayLoader = false;
      }
    );
  }

  generateTargetForm() {
    this.targetForm = this.formBuilder.group({
      dateOfTarget: [{disabled: true, value: this.datasource.selectedDate}, [Validators.required]],
      zone: ["", [Validators.required]],
      line: ["", [Validators.required]],
      buyer: ["", [Validators.required]],
      style: ["", [Validators.required]],
      productionHour: [9, [Validators.required]],
      target: ["", [Validators.required, Validators.min(0), Validators.max(20000)]]
    });
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
      target: this.targetForm.value.target,
      buyer_id: this.targetForm.value.buyer,
      style_id: this.targetForm.value.style
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
  
  ngOnDestroy(): void {
    this.serviceSubscription.unsubscribe();
  }
}
