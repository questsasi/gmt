import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SettingsService } from '../../../../../app/settings/settings.service';
import { FactoryActivateComponent } from '../factory-activate/factory-activate.component';
import { FactoryAddComponent } from '../factory-add/factory-add.component';
import { FactoryDeactivateComponent } from '../factory-deactivate/factory-deactivate.component';

@Component({
  selector: 'app-factory-list',
  templateUrl: './factory-list.component.html',
  styleUrls: ['./factory-list.component.css']
})
export class FactoryListComponent implements OnInit {

  flags: any = {};
  datasource: any = {};

  constructor(private settingsService: SettingsService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getFlagsStatus();
    this.getDefaultDetails();
  }

  getFlagsStatus() {
    this.flags.displayLoader = true;
  }

  getDefaultDetails() {
    this.datasource.factoryList = [];
    this.getFactoryList();
  }

  getFactoryList() {
    this.flags.displayLoader = true;
    this.settingsService.getFactoryList(
      (response: any) => {
        if (response && response.success && response.data && response.data.length > 0) {
          this.datasource.factoryList = response.data;
        }
        this.flags.displayLoader = false;
      },
      (error: any) => {
        this.flags.displayLoader = false;
      }
    )
    this.flags.displayLoader = false;
  }

  onAddFactory() {
    const dialogRef = this.dialog.open(FactoryAddComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  onActivateFactory(factoryIndex: number) {
    const dialogRef = this.dialog.open(FactoryActivateComponent, {
      data: {
        selectedFactory: this.datasource.factoryList[factoryIndex],
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.getFactoryList();
      }
    });
  }

  onDeactivateFactory(factoryIndex: number) {
    const dialogRef = this.dialog.open(FactoryDeactivateComponent, {
      data: {
        selectedFactory: this.datasource.factoryList[factoryIndex]
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.getFactoryList();
      }
    });
  }

}
