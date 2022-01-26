import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SettingsService } from '../../../../../app/settings/settings.service';

@Component({
  selector: 'app-zone-add',
  templateUrl: './zone-add.component.html',
  styleUrls: ['./zone-add.component.css']
})
export class ZoneAddComponent implements OnInit {

  flags: any = {};
  datasource: any = {};
  addZoneForm!: FormGroup;
  errorSubmitting: Boolean = false;
  errorMsg: String = '';

  constructor(private dialogRef: MatDialogRef<ZoneAddComponent>, private formBuilder: FormBuilder,
    private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.getFlagsStatus();
    this.getFactoryList();
  }

  getFlagsStatus() {
    this.flags.displayLoader = true;
    this.flags.submitting = false;
  }

  getFactoryList() {
    this.flags.displayLoader = true;
    this.settingsService.getFactoryList(
      (response: any) => {
        if (response && response.data && response.data && response.data.length > 0) {
          this.datasource.factoryList = response.data;
          this.generatedAddZoneForm();
        } else {
          this.flags.displayLoader = false;
        }
      },
      (error: any) => {
      }
    );
  }

  generatedAddZoneForm() {
    this.addZoneForm = this.formBuilder.group({
      factory: ["", [Validators.required]],
      zonename: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    });

    this.flags.displayLoader = false;
  }

  public errorHandling = (control: string, error: string) => {
    return this.addZoneForm.controls[control].hasError(error);
  };

  onSubmit() {
    this.flags.submitting = true;

    let postData = {
      factory_name: this.addZoneForm.value.factory.name,
      factory_id: this.addZoneForm.value.factory.id,
      zone_name: this.addZoneForm.value.zonename
    }

    this.settingsService.createZone(
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
