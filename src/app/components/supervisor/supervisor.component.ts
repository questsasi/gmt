import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { SupervisorAddComponent } from "../supervisor-add/supervisor-add.component";

@Component({
  selector: "app-supervisor",
  templateUrl: "./supervisor.component.html",
  styleUrls: ["./supervisor.component.css"]
})
export class SupervisorComponent implements OnInit {

  supervisors = [
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
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void { }

  onToggleActive(obj: any) {
    console.log(obj);
  }

  onAddSupervisor() {
    const dialogRef = this.dialog.open(SupervisorAddComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}
