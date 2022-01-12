import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Meta, Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

import { AppService } from 'src/app/app.service';
import { DataSharedService } from 'src/app/common/data-shared.service';
import { ConfirmDeleteTargetComponent } from '../confirm-delete-target/confirm-delete-target.component';
import { TargetAddComponent } from '../target-add/target-add.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-target-list',
  templateUrl: './target-list.component.html',
  styleUrls: ['./target-list.component.css'],
})
export class TargetListComponent implements OnInit, OnDestroy {
  flags: any = {
    displayLoader: Boolean,
  };
  targetObj: any = {
    targetList: [],
    selectedDate: String,
    targetIndex: Number,
  };
  editTargetForm!: FormGroup;
  private serviceSubscription: Subscription = new Subscription;
  desc = 'Target of the day for every zone and line will be added with the required details';
  displayedColumns: string[] = ['sno', 'zone_name', 'line_name', 'production_hours', 'target', 'style_name', 'buyer_name', "action"];
  dataSource: any = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;
 

  constructor(
    public dialog: MatDialog,
    private appService: AppService,
    private formBuilder: FormBuilder,
    private dataSharedService: DataSharedService,
    private title: Title,
    private meta: Meta) {
    this.meta.updateTag({
      name: 'description',
      content: this.desc + ' - Target'
    }, "name='description'");
    this.title.setTitle("Target" + this.appService.seoTitle());

  }

  ngOnInit(): void {
    this.serviceSubscription = this.dataSharedService.getDate().subscribe((getDate: any) => {
      this.targetObj.selectedDate = getDate;
      this.targetObj.targetIndex = 0;
      this.getTargetList();
    });
  }

  getTargetList() {
    this.flags.displayLoader = true;
    this.appService.getTargetList(
      this.targetObj.selectedDate,
      (response: any) => {
        if (response && response.success && response.data && response.data.length > 0) {
          response.data.forEach((targetObj: any) => {
            targetObj['isEnableEdit'] = false;
          });
          this.targetObj.targetList = response.data;//new MatTableDataSource(response.data);
          this.dataSource = new MatTableDataSource<any>(response.data); // create new object
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort; 

        } else {
          this.targetObj.targetList = [];
        }
        this.flags.displayLoader = false;
      },
      (error: any) => {
        this.flags.displayLoader = false;
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onAddTarget() {
    const dialogRef = this.dialog.open(TargetAddComponent, {
      minWidth: '300px',
      minHeight: '98vh',
      panelClass: 'custom-dialog-container'
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  onToggleEdit(targetIndex: number) {
    this.targetObj.targetList[targetIndex].isEnableEdit =
      !this.targetObj.targetList[targetIndex].isEnableEdit;
    if (this.targetObj.targetList[targetIndex].isEnableEdit) {
      this.editTargetForm = this.formBuilder.group({
        target: [
          '',
          [Validators.required, Validators.min(0), Validators.max(20000)],
        ],
      });
      this.editTargetForm.setValue({
        target: this.targetObj.targetList[targetIndex].target,
      });
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
    this.targetObj.targetList[targetIndex].isEnableEdit = false;
  }

  onTriggerEditTarget(targetIndex: number) {
    const payload = {
      target_id: this.targetObj.targetList[targetIndex].target_id,
      target: this.editTargetForm.value.target,
    };

    this.flags.displayLoader = true;
    this.appService.editTarget(
      payload,
      (response: any) => {
        this.flags.displayLoader = false;
        if (response && response.success) {
          this.getTargetList();
        } else {
        }
      },
      (error: any) => {
        this.flags.displayLoader = false;
      }
    );
  }

  onClickDelete(targetIndex: number) {
    this.targetObj.targetIndex = targetIndex;
    const dialogRef = this.dialog.open(ConfirmDeleteTargetComponent, {
      data: {
        selectedTarget: this.targetObj.targetList[targetIndex],
        buttonText: {
          ok: 'Yes',
          cancel: 'No',
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.onTriggerDelete(this.targetObj.targetIndex);
      }
    });
  }

  onTriggerDelete(targetIndex: number) {
    this.flags.displayLoader = true;
    this.appService.deleteTarget(
      this.targetObj.targetList[targetIndex].target_id,
      (response: any) => {
        this.flags.displayLoader = false;
        if (response && response.success) {
          this.getTargetList();
        } else {
        }
      },
      (error: any) => {
        this.flags.displayLoader = false;
        this.getTargetList();
      }
    );
  }

  ngOnDestroy(): void {
    this.serviceSubscription.unsubscribe();
  }
}
