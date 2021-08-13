import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})
export class ProductionComponent implements OnInit {

  productions: any;
  constructor() { }

  ngOnInit(): void {
    // this.productions = [{
    //   "date": "23 jan",
    //   "zone": "Zone 1",
    //   "line": "Line 1",
    //   "production_hour": 2,
    //   "output": 723
    // }]
    this.productions = [
      {
        "factoryId": 2,
        "factory_name": "MAS Linea Fashion - Udumalpet",
        "zoneId": 1,
        "zone_name": "Zone-1A",
        "lineId": 1,
        "line_name": "Line 1",
        "targetId": 1,
        "production_hrs": 10,
        "target_date": "2021-05-15",
        "productionId": 1,
        "production_date": "2021-05-15",
        "hour": 1,
        "output": 50
      },
      {
        "factoryId": 1,
        "factory_name": "MAS Linea Fashion - Udumalpet",
        "zoneId": 1,
        "zone_name": "Zone-1A",
        "lineId": 1,
        "line_name": "Line 1",
        "targetId": 1,
        "production_hrs": 10,
        "target_date": "2021-05-15",
        "productionId": 1,
        "production_date": "2021-05-15",
        "hour": 1,
        "output": 100
      }
    ]
  }

}
