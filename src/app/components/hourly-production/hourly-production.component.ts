import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hourly-production',
  templateUrl: './hourly-production.component.html',
  styleUrls: ['./hourly-production.component.css']
})
export class HourlyProductionComponent implements OnInit {

  addForm: any;
  supervisors = [
    { id: 1, name: "supervisor 1" },
    { id: 2, name: "supervisor 2" },
    { id: 3, name: "supervisor 3" },
    { id: 4, name: "supervisor 4" }
  ];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      hour: ["", [Validators.required]],
      working: ["", [Validators.required]],
      supervisor: ["", [Validators.required]],
      output: ["", [Validators.required]],
      defect: ["", [Validators.required]],
      outage: false,
      qualityDowntime: ["", []],
      manPowerDowntime: ["", []],
      planningDowntime: ["", []],
      machineDowntime: ["", []],
      remarks: ["", []]
    });
  }

  public errorHandling = (control: string, error: string) => {
    return this.addForm.controls[control].hasError(error);
  };

  onSubmit(): void {
    if (!this.addForm.value.outage) {
      this.addForm.value.qualityDowntime = '';
      this.addForm.value.manPowerDowntime = '';
      this.addForm.value.planningDowntime = '';
      this.addForm.value.machineDowntime = '';
    }
  }

}
