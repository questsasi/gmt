import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SettingsService } from '../../../../../app/settings/settings.service';

@Component({
  selector: 'app-factory-add',
  templateUrl: './factory-add.component.html',
  styleUrls: ['./factory-add.component.css']
})
export class FactoryAddComponent implements OnInit {

  flags: any = {};
  addFactoryForm!: FormGroup;

  constructor(private dialogRef: MatDialogRef<FactoryAddComponent>, private formBuilder: FormBuilder,
    private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.getFlagsStatus();
    this.generatedAddFactoryForm();
  }

  getFlagsStatus() {
    this.flags.displayLoader = true;
    this.flags.submitting = false;
  }

  generatedAddFactoryForm() {
    this.addFactoryForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    });

    this.flags.displayLoader = false;
  }

  public errorHandling = (control: string, error: string) => {
    return this.addFactoryForm.controls[control].hasError(error);
  };

  onSubmit() {
    this.flags.submitting = true;

    let postData = {
      name: this.addFactoryForm.value.name
    }

    this.settingsService.createFactory(
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
