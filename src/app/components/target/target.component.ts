import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TargetAddComponent } from 'src/app/components/target-add/target-add.component';

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.css']
})
export class TargetComponent implements OnInit {

  targets: Target[] = [];
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
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
  zone: String,
  line: String,
  target: String,
  productionHour: String
};