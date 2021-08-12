import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import {
  FormArray,
  Validators,
  FormBuilder,
  FormGroup,
} from "@angular/forms";
import { AppService } from "src/app/app.service";
import { HttpService } from "../../http.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-target-add',
  templateUrl: './target-add.component.html',
  styleUrls: ['./target-add.component.css']
})
export class TargetAddComponent implements OnInit {
  zones: any = [];
  lines: any = [];
  productionHours = 24;
  addForm: FormGroup;
  flags:any = {
    isLoading: true,
    submitting: false
  }

  constructor(
    public dialogRef: MatDialogRef<TargetAddComponent>,
    private formBuilder: FormBuilder,
    private appService: AppService
  ) {
    this.addForm = this.formBuilder.group({
      dateOfTarget: ["", [Validators.required]],
      zone: ["", [Validators.required]],
      line: ["", [Validators.required]],
      target: ["", [Validators.required]],
      productionHour: [10, [Validators.required]]
    });
  }

  ngOnInit(): void {
    let todayDate = new Date().toISOString().split("T")[0];
    this.addForm.controls['dateOfTarget'].setValue(todayDate);
    // this.addForm.controls['zone'].setValue(2);

    this.appService.getTargetEntry().subscribe((resp: any) => {
      this.flags.isLoading = false;
      if (resp.length == 1) {
        this.zones = resp[0].zones;
      }
    });

    // {
    //   next: (result: any) => {
    //     console.log(result);
    //   },
    //   error: (err: any) => {
    //     console.log(err);
    //   },
    //   complete: () => {
    //     console.log('complete');
    //   }
    // }
  }

  onZoneChange(event: any) {
    this.lines = [];
    let result = this.zones.find((obj: any) => obj.id == this.addForm.controls['zone'].value);
    this.lines = result.lines;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public errorHandling = (control: string, error: string) => {
    return this.addForm.controls[control].hasError(error);
  };

  addInput(): void {
    let items = this.addForm.get('items') as FormArray;
    items.push(this.formBuilder.group({
      style: ["", [Validators.required]],
      color: ["", [Validators.required]],
      qty: ["", [Validators.required]]
    }));
  }

  delInput(index: number): void {
    const arrayControl = <FormArray>this.addForm.controls['items'];
    arrayControl.removeAt(index);
  }

  onSubmit() {
    this.flags.submitting = true;
    
    let postData = {
      line_id: this.addForm.value.line,
      target: this.addForm.value.target,
      date: this.addForm.value.dateOfTarget,
      production_hrs: this.addForm.value.productionHour
    }
    
    this.appService.postTargetEntry(postData, (resp: any) => {
      this.flags.submitting = false;
    },
    (err: any) => {
      this.flags.submitting = false;
      console.log(err);
    });

  }
}