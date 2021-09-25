import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import {
  FormArray,
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { AppService } from "src/app/app.service";


@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent implements OnInit {
  lines = [
    { id: 1, name: "Line1" },
    { id: 2, name: "Line2" },
    { id: 3, name: "Line3" },
    { id: 4, name: "Line4" },
  ];
  // addForm: FormGroup;
  addForm: any;

  constructor(
    public dialogRef: MatDialogRef<OrderAddComponent>,
    private formBuilder: FormBuilder,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      buyer: ["", [Validators.required]],
      salesOrderNumber: ["", [Validators.required]],
      deliveryDate: ["", [Validators.required]],
      items: this.formBuilder.array([]),
      active: true
    });
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
    let x = this.appService.getLines(
      (resp: any) => {
        // console.log("resp", resp);
      },
      (error: any) => {
        // console.log("error", error);
      }
    );
    // console.log(x);

    // console.log(this.addForm.value);
  }

}
