import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Validators, FormBuilder, FormGroup, } from "@angular/forms";
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
    this.appService.getTargetEntry().subscribe(
      (response: any) => {
        if (response && response.length > 0) {
          this.datasource.targetDetails = response[0];
          console.log("this.datasource.targetDetails", this.datasource.targetDetails);
          if (this.datasource.targetDetails && this.datasource.targetDetails.zones
            && this.datasource.targetDetails.zones.length > 0) {
            this.datasource.zones = [this.datasource.targetDetails.zones[0]];
            this.generateTargetForm();
          }
        }
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
    console.log("onSubmit", this.targetForm);
    this.flags.submitting = true;

    let postData = {
      line_id: this.targetForm.value.line,
      target: this.targetForm.value.target,
      date: this.targetForm.value.dateOfTarget,
      production_hrs: this.targetForm.value.productionHour
    }

    this.appService.postTargetEntry(postData,
      (resp: any) => {
        this.flags.submitting = false;
        this.onClickCancel();
      },
      (err: any) => {
        this.flags.submitting = false;
        this.onClickCancel();
        console.log(err);
      });
  }

  onClickCancel() {
    this.dialogRef.close();
  }
}
