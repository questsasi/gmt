import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SettingsService } from 'src/app/settings/settings.service';
import { UmActivateComponent } from '../um-activate/um-activate.component';
import { UmAddComponent } from '../um-add/um-add.component';
import { UmDeactivateComponent } from '../um-deactivate/um-deactivate.component';
import { UmEditComponent } from '../um-edit/um-edit.component';

@Component({
  selector: 'app-um-list',
  templateUrl: './um-list.component.html',
  styleUrls: ['./um-list.component.css']
})
export class UmListComponent implements OnInit {
  flags: any = {};
  datasource: any = {};

  constructor(private settingsService: SettingsService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getFlagsStatus();
    this.getUserList();
  }

  getFlagsStatus() {
    this.flags.displayLoader = true;
  }

  getUserList() {
    this.flags.displayLoader = true;
    this.datasource.userList = [];
    this.settingsService.getUsersList(
      (response: any) => {
        if (response && response.success && response.data && response.data.length > 0) {
          this.datasource.userList = response.data;
          this.flags.displayLoader = false;
        } else {
          this.datasource.userList = [];
          this.flags.displayLoader = false;
        }
      },
      (error: any) => {
        console.error('<-- error in fetching users list -->', error);
        this.flags.displayLoader = false;
      }
    );
  }

  onAddUser() {
    const dialogRef = this.dialog.open(UmAddComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  onEditUser(userIndex: number) {
    this.datasource.userIndex = userIndex;
    const dialogRef = this.dialog.open(UmEditComponent, {
      data: {
        selectedUser: this.datasource.userList[userIndex],
        buttonText: {
          ok: 'Yes',
          cancel: 'No',
        },
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  onActivateUser(userIndex: number) {
    const dialogRef = this.dialog.open(UmActivateComponent, {
      data: {
        selectedUser: this.datasource.userList[userIndex]
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.getUserList();
      }
    });
  }

  onDeactivateUser(userIndex: number) {
    const dialogRef = this.dialog.open(UmDeactivateComponent, {
      data: {
        selectedUser: this.datasource.userList[userIndex]
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.getUserList();
      }
    });
  }

  onTriggerEditUser(userIndex: number) {

  }

}
