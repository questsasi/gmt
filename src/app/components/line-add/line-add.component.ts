import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { AppService } from "src/app/app.service";


@Component({
  selector: 'app-line-add',
  templateUrl: './line-add.component.html',
  styleUrls: ['./line-add.component.scss']
})
export class LineAddComponent implements OnInit {
  lines = [
    { id: 1, name: "Line1" },
    { id: 2, name: "Line2" },
    { id: 3, name: "Line3" },
    { id: 4, name: "Line4" },
  ];
  // addForm: FormGroup;
  addForm: any;

  constructor(
    public dialogRef: MatDialogRef<LineAddComponent>,
    private formBuilder: FormBuilder,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      active: true
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public errorHandling = (control: string, error: string) => {
    return this.addForm.controls[control].hasError(error);
  };

  onSubmit() {
    let x = this.appService.getLines(
      (resp: any) => {
        console.log("resp", resp);
      },
      (error: any) => {
        console.log("error", error);
      }
    );
    console.log(x);

    console.log(this.addForm.value);
  }
}
