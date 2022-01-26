import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SettingsService } from '../../../../../app/settings/settings.service';
import { LineActivateComponent } from '../line-activate/line-activate.component';
import { LineAddComponent } from '../line-add/line-add.component';
import { LineDeactivateComponent } from '../line-deactivate/line-deactivate.component';

@Component({
  selector: 'app-lines-list',
  templateUrl: './lines-list.component.html',
  styleUrls: ['./lines-list.component.css']
})
export class LinesListComponent implements OnInit {

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
    this.datasource.lineList = [];
    this.getLineList();
  }

  getLineList() {
    this.flags.displayLoader = true;
    this.settingsService.getLineList(
      (response: any) => {
        if (response && response.success && response.data && response.data.length > 0) {
          this.datasource.lineList = response.data;
        }
        this.flags.displayLoader = false;
      },
      (error: any) => {
        this.flags.displayLoader = false;
      }
    )
    this.flags.displayLoader = false;
  }

  onAddLine() {
    const dialogRef = this.dialog.open(LineAddComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  onActivateLine(lineIndex: number) {
    this.datasource.lineIndex = lineIndex;
    const dialogRef = this.dialog.open(LineActivateComponent, {
      data: {
        selectedLine: this.datasource.lineList[lineIndex],
        buttonText: {
          ok: 'Yes',
          cancel: 'No',
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.onTriggerActivateLine(this.datasource.lineIndex);
      }
    });
  }

  onTriggerActivateLine(lineIndex: number) {
    this.flags.displayLoader = true;
    const postData = {
      lineId: this.datasource.lineList[lineIndex].id,
      is_active: true
    };
    this.settingsService.modifyLineStatus(
      postData,
      (response: any) => {
        this.flags.displayLoader = false;
        if (response && response.success) {
          this.getLineList();
        } else {
          console.error('<-- error in activating line -->');
        }
      },
      (error: any) => {
        console.error('<-- error in activating line -->', error);
        this.flags.displayLoader = false;
        this.getLineList();
      }
    );
  }

  onDeactivateLine(lineIndex: number) {
    this.datasource.lineIndex = lineIndex;
    const dialogRef = this.dialog.open(LineDeactivateComponent, {
      data: {
        selectedLine: this.datasource.lineList[lineIndex],
        buttonText: {
          ok: 'Yes',
          cancel: 'No',
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.onTriggerDeActivateLine(this.datasource.lineIndex);
      }
    });
  }

  onTriggerDeActivateLine(lineIndex: number) {
    this.flags.displayLoader = true;
    const postData = {
      lineId: this.datasource.lineList[lineIndex].id,
      is_active: false
    };
    this.settingsService.modifyLineStatus(
      postData,
      (response: any) => {
        this.flags.displayLoader = false;
        if (response && response.success) {
          this.getLineList();
        } else {
          console.error('<-- error in deactivating line -->');
        }
      },
      (error: any) => {
        console.error('<-- error in deactivating line -->', error);
        this.flags.displayLoader = false;
        this.getLineList();
      }
    );
  }

}
