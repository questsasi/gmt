import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  lineDetails: any = [
    {
      line_name: 'VG1 - 10',
      target: 1000,
      achieved: 900
    },
    {
      line_name: 'VG2 - 1',
      target: 500,
      achieved: 600
    },
    {
      line_name: 'VG3',
      target: 1100,
      achieved: 853
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.lineDetails = this.process(this.lineDetails);
    // this.loaded = true;
  }

  process(lineObj: any): any {
    let result: Array<ReportLineObj> = [];

    for (let i = 0; i < lineObj.length; i++) {
      lineObj[i].gap = lineObj[i].achieved - lineObj[i].target;
      lineObj[i].percent = ((lineObj[i].achieved - lineObj[i].target) / lineObj[i].target) * 100;
      lineObj[i].percent = Math.round(lineObj[i].percent * 100) / 100;
      console.log(lineObj[i]);
      result.push(lineObj[i]);
    }
    return result;
  }

}

export interface ReportLineObj {
  line_name: string,
  target: number,
  achieved: number,
  gap: number,
  percent: number
}

export interface ReportLineResultObj {
  line_name: string,
  target: number,
  achieved: number,
  gap: number,
  percent: number
}
