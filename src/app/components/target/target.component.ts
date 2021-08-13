import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { TargetAddComponent } from 'src/app/components/target-add/target-add.component';

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.css']
})
export class TargetComponent implements OnInit {

  targets: Target[] = [];
  flags: any = {
    displayLoader: Boolean
  }
  datasource: any = {
    targetList: []
  }
  constructor(public dialog: MatDialog, private appService: AppService) { }

  ngOnInit(): void {
    // console.log("targets", this.targets)
    this.flags.displayLoader = true;
    this.getTargetList();
  }

  getTargetList() {
    this.appService.getTargetEntry().subscribe(
      (response: any) => {
        if (response && response.length > 0) {
          this.datasource.targetList = response;
          console.log("this.datasource.targetList", this.datasource.targetList);
        }
      }
    );
  }

  onAddTarget() {
    const dialogRef = this.dialog.open(TargetAddComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

}

export interface Target {
  zone: string,
  line: string,
  target: string,
  productionHour: string
}
