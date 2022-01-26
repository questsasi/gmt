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
    this.datasource.factoryIndex = factoryIndex;
    const dialogRef = this.dialog.open(FactoryActivateComponent, {
      data: {
        selectedFactory: this.datasource.factoryList[factoryIndex],
        buttonText: {
          ok: 'Yes',
          cancel: 'No',
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.onTriggerActivateFactory(this.datasource.factoryIndex);
      }
    });
  }

  onTriggerActivateFactory(factoryIndex: number) {
    this.flags.displayLoader = true;
    const postData = {
      factoryId: this.datasource.factoryList[factoryIndex].id,
      is_active: true
    };
    this.settingsService.modifyFactoryStatus(
      postData,
      (response: any) => {
        this.flags.displayLoader = false;
        if (response && response.success) {
          this.getFactoryList();
        } else {
          console.error('<-- error in activating factory -->');
        }
      },
      (error: any) => {
        console.error('<-- error in activating factory -->', error);
        this.flags.displayLoader = false;
        this.getFactoryList();
      }
    );
  }

  onDeactivateFactory(factoryIndex: number) {
    this.datasource.factoryIndex = factoryIndex;
    const dialogRef = this.dialog.open(FactoryDeactivateComponent, {
      data: {
        selectedFactory: this.datasource.factoryList[factoryIndex],
        buttonText: {
          ok: 'Yes',
          cancel: 'No',
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.onTriggerDeActivateUser(this.datasource.factoryIndex);
      }
    });
  }

  onTriggerDeActivateUser(factoryIndex: number) {
    this.flags.displayLoader = true;
    const postData = {
      factoryId: this.datasource.factoryList[factoryIndex].id,
      is_active: false
    };
    this.settingsService.modifyFactoryStatus(
      postData,
      (response: any) => {
        this.flags.displayLoader = false;
        if (response && response.success) {
          this.getFactoryList();
        } else {
          console.error('<-- error in deactivating factory -->');
        }
      },
      (error: any) => {
        console.error('<-- error in deactivating factory -->', error);
        this.flags.displayLoader = false;
        this.getFactoryList();
      }
    );
  }


}
