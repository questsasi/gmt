import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Meta, Title } from '@angular/platform-browser';
import * as moment from 'moment';
import { Subscription } from 'rxjs';

import { AppService } from 'src/app/app.service';
import { DataSharedService } from 'src/app/common/data-shared.service';
import { ConfirmDeleteProductionComponent } from '../confirm-delete-production/confirm-delete-production.component';
import { ProductionAddComponent } from '../production-add/production-add.component';

@Component({
  selector: 'app-production-list',
  templateUrl: './production-list.component.html',
  styleUrls: ['./production-list.component.css'],
})
export class ProductionListComponent implements OnInit, OnDestroy {
  datasource: any = {
    selectedDate: String,
    productionIndex: Number,
    productionList: [], // Array<any> is not allowing
  };
  flags: any = {
    displayLoader: Boolean,
  };
  productions: any;
  editProductionForm!: FormGroup;
  private serviceSubscription: Subscription = new Subscription;
  desc = 'Production of the day for every zone and line will be added on a houlry basis';

  constructor(
    private appService: AppService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private dataSharedService: DataSharedService,
    private title: Title,
    private meta: Meta) {
    this.meta.updateTag({
      name: 'description',
      content: this.desc + ' - Production'
    }, "name='description'");
    this.title.setTitle("Production" + this.appService.seoTitle());
  }

  ngOnInit(): void {
    this.serviceSubscription = this.dataSharedService.getDate().subscribe((getDate: any) => {
      this.datasource.selectedDate = getDate;
      this.datasource.productionIndex = 0;
      this.getProductionList();
    });
  }

  getProductionList() {
    this.flags.displayLoader = true;
    this.appService.getProductionList(
      this.datasource.selectedDate,
      (response: any) => {
        if (response && response.data) {
          this.datasource.productionList =
            response.data.length > 0 ? response.data : [];
          this.parseProductionList();
        } else {
          this.datasource.productionList = [];
        }

        this.flags.displayLoader = false;
      },
      (error: any) => {
        this.flags.displayLoader = false;
      }
    );
  }

  parseProductionList() {
    if (
      this.datasource.productionList &&
      this.datasource.productionList.length > 0
    ) {
      this.datasource.productionList.forEach((productionObj: any) => {
        productionObj['isEnableEdit'] = false;
      });
    }
  }

  onAddProduction() {
    const dialogRef = this.dialog.open(ProductionAddComponent, {
      minWidth: '300px',
      minHeight: '98vh',
      panelClass: 'custom-dialog-container'
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  onToggleEdit(prodIndex: number) {
    this.datasource.productionList[prodIndex].isEnableEdit =
      !this.datasource.productionList[prodIndex].isEnableEdit;
    if (this.datasource.productionList[prodIndex].isEnableEdit) {
      this.editProductionForm = this.formBuilder.group({
        output: [
          '',
          [Validators.required, Validators.min(0), Validators.max(20000)],
        ],
      });
      this.editProductionForm.setValue({
        output: this.datasource.productionList[prodIndex].output,
      });
    }
  }

  public errorHandling = (control: string, error: string) => {
    return this.editProductionForm.controls[control].hasError(error);
  };

  onSubmitEdit(prodIndex: number) {
    if (this.editProductionForm.valid) {
      this.onCloseEdit(prodIndex);
      this.onTriggerEditProduction(prodIndex);
    }
  }

  onCloseEdit(prodIndex: number) {
    this.datasource.productionList[prodIndex].isEnableEdit = false;
  }

  onTriggerEditProduction(prodIndex: number) {
    const payload = {
      production_id: this.datasource.productionList[prodIndex].production_id,
      output: this.editProductionForm.value.output,
    };

    this.flags.displayLoader = true;
    this.appService.editProduction(
      payload,
      (response: any) => {
        if (response && response.success) {
          this.getProductionList();
        } else {
        }
        this.flags.displayLoader = false;
      },
      (error: any) => {
        this.flags.displayLoader = false;
      }
    );
  }

  onClickDelete(prodIndex: number) {
    this.datasource.productionIndex = prodIndex;
    const dialogRef = this.dialog.open(ConfirmDeleteProductionComponent, {
      data: {
        selectedProduction: this.datasource.productionList[prodIndex],
        buttonText: {
          ok: 'Yes',
          cancel: 'No',
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.onTriggerDelete(this.datasource.productionIndex);
      }
    });
  }

  onTriggerDelete(prodIndex: number) {
    this.flags.displayLoader = true;
    this.appService.deleteProduction(
      this.datasource.productionList[prodIndex].production_id,
      (response: any) => {
        if (response && response.success) {
          this.getProductionList();
        } else {
        }
        this.flags.displayLoader = false;
      },
      (error: any) => {
        this.flags.displayLoader = false;
        this.getProductionList();
      }
    );
  }

  ngOnDestroy(): void {
    this.serviceSubscription.unsubscribe();
  }
}
