import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment'

import { AppService } from 'src/app/app.service';
import { TargetAddComponent } from 'src/app/components/target-add/target-add.component';
import { ConfirmationdialogComponent } from '../confirmationdialog/confirmationdialog.component';

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.css']
})
export class TargetComponent implements OnInit {

  flags: any = {
    displayLoader: Boolean
  }
  datasource: any = {
    targetList: [],
    selectedDate: String,
    targetIndex: Number
  }
  editTargetForm!: FormGroup;

  constructor(public dialog: MatDialog, private appService: AppService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.datasource.selectedDate = moment().format("YYYY-MM-DD");
    this.datasource.targetIndex = 0;
    this.getTargetList();
  }

  onChangeDate(date: string) {
    console.log("date", date);
    this.datasource.selectedDate = moment().format("YYYY-MM-DD");
    this.getTargetList();
  }

  getTargetList() {
    this.flags.displayLoader = true;
    this.appService.getTargetList(
      this.datasource.selectedDate
    ).subscribe(
      (response: any) => {
        if (response && response.length > 0) {
          this.datasource.targetList = response;
          this.parseTargetList();
          this.flags.displayLoader = false;
        }
      },
      (error: any) => {
        console.error("<-- error in fetching target list -->", error);
      }
    );
  }

  parseTargetList() {
    if (this.datasource.targetList && this.datasource.targetList.length > 0) {
      this.datasource.targetList.forEach((targetObj: any) => {
        targetObj['isEnableEdit'] = false;
      });
    }
  }

  onAddTarget() {
    const dialogRef = this.dialog.open(TargetAddComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  onToggleEdit(targetIndex: number) {
    this.datasource.targetList[targetIndex].isEnableEdit =
      !this.datasource.targetList[targetIndex].isEnableEdit;
    if (this.datasource.targetList[targetIndex].isEnableEdit) {
      this.editTargetForm = this.formBuilder.group({
        target: ["", [Validators.required, Validators.min(0), Validators.max(20000)]]
      })
      this.editTargetForm.setValue({ target: this.datasource.targetList[targetIndex].target });
    }
  }

  public errorHandling = (control: string, error: string) => {
    return this.editTargetForm.controls[control].hasError(error);
  };

  onSubmitEdit(targetIndex: number) {
    if (this.editTargetForm.valid) {
      this.onCloseEdit(targetIndex);
      this.onTriggerEditTarget(targetIndex);
    }
  }

  onCloseEdit(targetIndex: number) {
    this.datasource.targetList[targetIndex].isEnableEdit = false;
  }

  onTriggerEditTarget(targetIndex: number) {
    const payload = {
      zone_id: this.datasource.targetList[targetIndex].zone_id,
      line_id: this.datasource.targetList[targetIndex].line_id,
      date: this.datasource.selectedDate,
      target: this.editTargetForm.value.target
    }

    console.log("payload", payload);
    this.flags.displayLoader = true;
    this.appService.postEditTarget(
      payload,
      (response: any) => {
        this.flags.displayLoader = false;
        this.getTargetList();
      },
      (error: any) => {
        console.error("<-- error in editiing target -->", error);
      }
    );
  }

  onClickDelete(targetIndex: number) {
    this.datasource.targetIndex = targetIndex;
    const dialogRef = this.dialog.open(ConfirmationdialogComponent, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log("confirmed delete");
        this.onTriggerDelete(this.datasource.targetIndex);
      }
    });
  }

  onTriggerDelete(targetIndex: number) {
    const payload = {
      zone_id: this.datasource.targetList[targetIndex].zone_id,
      line_id: this.datasource.targetList[targetIndex].line_id,
      date: this.datasource.selectedDate
    }

    console.log("payload", payload);
    this.flags.displayLoader = true;
    this.appService.postDeleteTarget(
      payload,
      (response: any) => {
        this.flags.displayLoader = false;
        this.getTargetList();
      },
      (error: any) => {
        console.error("<-- error in deleting target -->", error);
        this.flags.displayLoader = false;
        this.getTargetList();
      }
    );
  }
}
