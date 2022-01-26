import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SettingsService } from 'src/app/settings/settings.service';
import { ZoneActivateComponent } from '../zone-activate/zone-activate.component';
import { ZoneAddComponent } from '../zone-add/zone-add.component';
import { ZoneDeactivateComponent } from '../zone-deactivate/zone-deactivate.component';

@Component({
  selector: 'app-zone-list',
  templateUrl: './zone-list.component.html',
  styleUrls: ['./zone-list.component.css']
})
export class ZoneListComponent implements OnInit {


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
    this.datasource.zoneList = [];
    this.getZoneList();
  }

  getZoneList() {
    this.flags.displayLoader = true;
    this.settingsService.getZoneList(
      (response: any) => {
        if (response && response.success && response.data && response.data.length > 0) {
          this.datasource.zoneList = response.data;
        }
        this.flags.displayLoader = false;
      },
      (error: any) => {
        this.flags.displayLoader = false;
      }
    )
    this.flags.displayLoader = false;
  }

  onAddZone() {
    const dialogRef = this.dialog.open(ZoneAddComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  onActivateZone(zoneIndex: number) {
    this.datasource.zoneIndex = zoneIndex;
    const dialogRef = this.dialog.open(ZoneActivateComponent, {
      data: {
        selectedZone: this.datasource.zoneList[zoneIndex],
        buttonText: {
          ok: 'Yes',
          cancel: 'No',
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.onTriggerActivateZone(this.datasource.zoneIndex);
      }
    });
  }

  onTriggerActivateZone(zoneIndex: number) {
    this.flags.displayLoader = true;
    const postData = {
      zoneId: this.datasource.zoneList[zoneIndex].id,
      is_active: true
    };
    this.settingsService.modifyZoneStatus(
      postData,
      (response: any) => {
        this.flags.displayLoader = false;
        if (response && response.success) {
          this.getZoneList();
        } else {
          console.error('<-- error in activating zone -->');
        }
      },
      (error: any) => {
        console.error('<-- error in activating zone -->', error);
        this.flags.displayLoader = false;
        this.getZoneList();
      }
    );
  }

  onDeactivateZone(zoneIndex: number) {
    this.datasource.zoneIndex = zoneIndex;
    const dialogRef = this.dialog.open(ZoneDeactivateComponent, {
      data: {
        selectedZone: this.datasource.zoneList[zoneIndex],
        buttonText: {
          ok: 'Yes',
          cancel: 'No',
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.onTriggerDeActivateZone(this.datasource.zoneIndex);
      }
    });
  }

  onTriggerDeActivateZone(zoneIndex: number) {
    this.flags.displayLoader = true;
    const postData = {
      zoneId: this.datasource.zoneList[zoneIndex].id,
      is_active: false
    };
    this.settingsService.modifyZoneStatus(
      postData,
      (response: any) => {
        this.flags.displayLoader = false;
        if (response && response.success) {
          this.getZoneList();
        } else {
          console.error('<-- error in deactivating zone -->');
        }
      },
      (error: any) => {
        console.error('<-- error in deactivating zone -->', error);
        this.flags.displayLoader = false;
        this.getZoneList();
      }
    );
  }

}
