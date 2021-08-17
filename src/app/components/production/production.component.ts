import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';

import { AppService } from 'src/app/app.service';
import { ConfirmDeleteProductionComponent } from '../confirm-delete-production/confirm-delete-production.component';
import { ProductionAddComponent } from '../production-add/production-add.component';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})
export class ProductionComponent implements OnInit {

  datasource: any = {
    selectedDate: String,
    productionIndex: Number,
    productionList: [] // Array<any> is not allowing
  };
  flags: any = {
    displayLoader: Boolean
  }
  productions: any;
  editProductionForm!: FormGroup

  constructor(private appService: AppService, public dialog: MatDialog,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.datasource.selectedDate = moment().format("YYYY-MM-DD");
    this.datasource.productionIndex = 0;
    this.getProductionList();
  }

  onChangeDate(date: string) {
    console.log("date", date);
    this.datasource.selectedDate = moment().format("YYYY-MM-DD");
    this.getProductionList();
  }

  getProductionList() {
    this.flags.displayLoader = true;
    this.appService.getProductionList(
      this.datasource.selectedDate
    ).subscribe(
      (response: any) => {
        this.datasource.productionList = response;
        this.parseProductionList();
        this.flags.displayLoader = false;
      },
      (error: any) => {
        console.error("<-- Error in Fetching Production List -->", error);
        this.flags.displayLoader = false;
      }
    );
  }

  parseProductionList() {
    if (this.datasource.productionList && this.datasource.productionList.length > 0) {
      this.datasource.productionList.forEach((productionObj: any) => {
        productionObj['isEnableEdit'] = false;
      });
    }
  }

  onAddProduction() {
    const dialogRef = this.dialog.open(ProductionAddComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  onToggleEdit(prodIndex: number) {
    this.datasource.productionList[prodIndex].isEnableEdit =
      !this.datasource.productionList[prodIndex].isEnableEdit;
    if (this.datasource.productionList[prodIndex].isEnableEdit) {
      this.editProductionForm = this.formBuilder.group({
        output: ["", [Validators.required, Validators.min(0), Validators.max(20000)]]
      })
      this.editProductionForm.setValue({ output: this.datasource.productionList[prodIndex].output });
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
      output: this.editProductionForm.value.output
    }

    this.flags.displayLoader = true;
    this.appService.postEditProduction(
      payload,
      (response: any) => {
        this.flags.displayLoader = false;
        this.getProductionList();
      },
      (error: any) => {
        console.error("<-- error in editiing production -->", error);
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
          cancel: 'No'
        }
      }
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
        this.flags.displayLoader = false;
        this.getProductionList();
      },
      (error: any) => {
        console.error("<-- error in deleting production -->", error);
        this.flags.displayLoader = false;
        this.getProductionList();
      }
    );
  }
}
