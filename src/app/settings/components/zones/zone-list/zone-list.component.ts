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
    const dialogRef = this.dialog.open(ZoneActivateComponent, {
      data: {
        selectedZone: this.datasource.zoneList[zoneIndex]
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.getZoneList();
      }
    });
  }

  onDeactivateZone(zoneIndex: number) {
    const dialogRef = this.dialog.open(ZoneDeactivateComponent, {
      data: {
        selectedZone: this.datasource.zoneList[zoneIndex]
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.getZoneList();
      }
    });
  }

}
