import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { AppService } from 'src/app/app.service';
import { DataSharedService } from 'src/app/shared/services/data-shared.service';

@Component({
  selector: 'app-production-add',
  templateUrl: './production-add.component.html',
  styleUrls: ['./production-add.component.css']
})
export class ProductionAddComponent implements AfterViewInit, OnDestroy {

  datasource: any = {
    zones: [],
    lines: [],
    target: []
  };
  flags: any = {
    displayLoader: Boolean,
    submitting: Boolean
  };
  errorSubmitting: Boolean = false;
  errorMsg: String = '';
  productionForm!: FormGroup;
  private serviceSubscription: Subscription = new Subscription;
  afterViewInit = false;

  constructor(public dialogRef: MatDialogRef<ProductionAddComponent>, private formBuilder: FormBuilder,
    private appService: AppService, private dataSharedService: DataSharedService) {
    this.getFlagsStatus();
    this.serviceSubscription = this.dataSharedService.getDate().subscribe((getDate: any) => {
      this.datasource.selectedDate = getDate;
      this.datasource.productionIndex = 0;
      this.getAddProduction();
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.afterViewInit = true;
    }, 1000);
  }

  getFlagsStatus() {
    this.flags.displayLoader = true;
    this.flags.submitting = false;
  }

  getAddProduction() {
    this.flags.displayLoader = true;
    this.appService.getAddProduction(
      this.datasource.selectedDate,
      (response: any) => {
        if (response && response.data && response.data.zones && response.data.zones.length > 0) {
          this.datasource.zones = response.data.zones;
          this.generateProductionForm();
        } else {
          this.flags.displayLoader = false;
        }
      },
      (error: any) => {
      }
    );
  }

  generateProductionForm() {
    this.productionForm = this.formBuilder.group({
      dateOfProduction: [{ disabled: true, value: this.datasource.selectedDate }, [Validators.required]],
      zone: ["", [Validators.required]],
      line: ["", [Validators.required]],
      target: ["", [Validators.required]],
      productionHour: ["", [Validators.required]],
      output: ["", [Validators.required, Validators.min(0), Validators.max(20000)]]
    });
    this.flags.displayLoader = false;
  }

  onZoneChange() {
    // Reset Value
    this.datasource.lines = [];
    this.datasource.target = [];
    // this.productionForm.controls['zone'] = {};

    let result = this.datasource.zones.find((obj: any) => obj.id == this.productionForm.controls['zone'].value);
    this.datasource.lines = result.lines;
  }

  onLineChange() {
    // Reset Value
    this.datasource.target = [];

    let temp = this.productionForm.controls['line'].value;
    this.datasource.target = [];
    if (temp.targets && temp.targets.length > 0) {
      this.datasource.target = temp.targets;
    }
  }

  public errorHandling = (control: string, error: string) => {
    return this.productionForm.controls[control].hasError(error);
  };

  onSubmit() {
    this.flags.submitting = true;
    this.errorSubmitting = false;

    let postData = {
      production_date: this.datasource.selectedDate,
      hour: this.productionForm.value.productionHour,
      output: this.productionForm.value.output,
      target_id: this.productionForm.value.target.target_id,
      buyer_id: this.productionForm.value.target.buyer.buyer_id,
      style_id: this.productionForm.value.target.style.style_id,
      // zone_id: this.productionForm.value.zone,
      // line_id: this.productionForm.value.line.line_id,
    }

    this.appService.createProduction(
      postData,
      (resp: any) => {
        this.flags.submitting = false;
        this.onClickCancel();
      },
      (err: any) => {
        this.flags.submitting = false;
        this.errorMsg = err.error.data;
        this.errorSubmitting = true;
        setTimeout(() => {
          this.errorSubmitting = false;
        }, 10 * 1000);
        // this.onClickCancel();
      });
  }

  onClickCancel() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.serviceSubscription.unsubscribe();
  }
}
