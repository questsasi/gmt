import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { UmAddComponent } from '../um-add/um-add.component';

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
    this.getDefaultDetails();
  }

  getFlagsStatus() {
    this.flags.displayLoader = true;
  }

  getDefaultDetails() {
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

  onClickDelete(userIndex: number) {

  }

}
