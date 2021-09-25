import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment'

import { AppService } from 'src/app/app.service';
import { ConfirmDeleteTargetComponent } from '../confirm-delete-target/confirm-delete-target.component';
import { TargetAddComponent } from '../target-add/target-add.component';

@Component({
  selector: 'app-target-list',
  templateUrl: './target-list.component.html',
  styleUrls: ['./target-list.component.css']
})
export class TargetListComponent implements OnInit {

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
    this.datasource.selectedDate = moment(date).format("YYYY-MM-DD");
    this.getTargetList();
  }

  getTargetList() {
    this.flags.displayLoader = true;
    this.appService.getTargetList(
      this.datasource.selectedDate,
      (response: any) => {
        if (response && response.success && response.data) {
          this.datasource.targetList = (response.data.length > 0) ? response.data : [];
          this.parseTargetList();
          this.flags.displayLoader = false;
        } else {
          this.datasource.targetList = [];
          this.flags.displayLoader = false;
        }
      },
      (error: any) => {
        console.error("<-- error in fetching target list -->", error);
        this.flags.displayLoader = false;
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
      target_id: this.datasource.targetList[targetIndex].target_id,
      target: this.editTargetForm.value.target
    }

    this.flags.displayLoader = true;
    this.appService.editTarget(
      payload,
      (response: any) => {
        this.flags.displayLoader = false;
        if (response && response.success) {
          this.getTargetList();
        } else {
          console.error("<-- error in editing target -->");
        }
      },
      (error: any) => {
        console.error("<-- error in editing target -->", error);
        this.flags.displayLoader = false;
      }
    );
  }

  onClickDelete(targetIndex: number) {
    this.datasource.targetIndex = targetIndex;
    const dialogRef = this.dialog.open(ConfirmDeleteTargetComponent, {
      data: {
        selectedTarget: this.datasource.targetList[targetIndex],
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.onTriggerDelete(this.datasource.targetIndex);
      }
    });
  }

  onTriggerDelete(targetIndex: number) {
    this.flags.displayLoader = true;
    this.appService.deleteTarget(
      this.datasource.targetList[targetIndex].target_id,
      (response: any) => {
        this.flags.displayLoader = false;
        if (response && response.success) {
          this.getTargetList();
        } else {
          console.error("<-- error in deleting target -->");
        }
      },
      (error: any) => {
        console.error("<-- error in deleting target -->", error);
        this.flags.displayLoader = false;
        this.getTargetList();
      }
    );
  }

}
