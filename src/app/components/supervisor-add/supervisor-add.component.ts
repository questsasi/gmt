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
  selector: "app-supervisor-add",
  templateUrl: "./supervisor-add.component.html",
  styleUrls: ["./supervisor-add.component.scss"],
})
export class SupervisorAddComponent implements OnInit {
  lines = [
    { id: 1, name: "VG1" },
    { id: 2, name: "VG2" },
    { id: 3, name: "VG3" },
    { id: 4, name: "VG4" },
  ];
  // addForm: FormGroup;
  addForm: any;

  constructor(
    public dialogRef: MatDialogRef<SupervisorAddComponent>,
    private formBuilder: FormBuilder,
    private appService: AppService
  ) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      // lines: ["", [Validators.required]],
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
      },
      (error: any) => {
      }
    );
  }
}
