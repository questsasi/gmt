import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
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

  constructor(private appService: AppService, private dialog: MatDialog) { }

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
    this.appService.getUsersList(
      (response: any) => {
        if (response && response.success && response.data) {
          this.datasource.userList = response.data.length > 0 ? response.data : [];
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
    dialogRef.afterClosed().subscribe((result) => {
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

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  onDeactivateUser(userIndex: number) {
    this.datasource.userIndex = userIndex;
    const dialogRef = this.dialog.open(UmDeactivateComponent, {
      data: {
        selectedUser: this.datasource.userList[userIndex],
        buttonText: {
          ok: 'Yes',
          cancel: 'No',
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.onTriggerDeActivateUser(this.datasource.userIndex);
      }
    });
  }

  onActivateUser(userIndex: number) {
    this.datasource.userIndex = userIndex;
    const dialogRef = this.dialog.open(UmActivateComponent, {
      data: {
        selectedUser: this.datasource.userList[userIndex],
        buttonText: {
          ok: 'Yes',
          cancel: 'No',
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.onTriggerActivateUser(this.datasource.userIndex);
      }
    });
  }

  onTriggerActivateUser(userIndex: number) {
    this.flags.displayLoader = true;
    const postData = {
      userId: this.datasource.userList[userIndex].id,
      is_active: true
    };
    this.appService.modifyUserStatus(
      postData,
      (response: any) => {
        this.flags.displayLoader = false;
        if (response && response.success) {
          this.getUserList();
        } else {
          console.error('<-- error in activating user -->');
        }
      },
      (error: any) => {
        console.error('<-- error in activating user -->', error);
        this.flags.displayLoader = false;
        this.getUserList();
      }
    );
  }

  onTriggerDeActivateUser(userIndex: number) {
    this.flags.displayLoader = true;
    const postData = {
      userId: this.datasource.userList[userIndex].id,
      is_active: false
    };
    this.appService.modifyUserStatus(
      postData,
      (response: any) => {
        this.flags.displayLoader = false;
        if (response && response.success) {
          this.getUserList();
        } else {
          console.error('<-- error in deactivating user -->');
        }
      },
      (error: any) => {
        console.error('<-- error in deactivating user -->', error);
        this.flags.displayLoader = false;
        this.getUserList();
      }
    );
  }

  onTriggerEditUser(userIndex: number) {

  }

}
