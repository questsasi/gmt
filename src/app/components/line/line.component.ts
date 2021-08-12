import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { LineAddComponent } from "../line-add/line-add.component";

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit {

  lines = [
    {
      id: 1,
      name: "Mohan",
      linesAllocated: ['VG1', 'VG2'],
      isActive: true
    }, {
      id: 2,
      name: "Supervisor 2",
      linesAllocated: ['VG3'],
      isActive: false
    }
  ]
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  onToggleActive(obj:any) {
    console.log(obj);
  }

  onAddLine() {
    const dialogRef = this.dialog.open(LineAddComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

}
