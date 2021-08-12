import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})
export class ProductionComponent implements OnInit {

  productions:any;
  constructor() { }

  ngOnInit(): void {
    this.productions = [{
      "date": "23 jan",
      "zone": "Zone 1",
      "line": "Line 1",
      "production_hour": 2,
      "output": 723
    }]
  }

}
