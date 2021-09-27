import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AppService } from 'src/app/app.service';

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
  selectedDate = moment().format("YYYY-MM-DD");
  flags = {
    displayLoader: false
  };
  reports: any = [];

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.getReports();
  }

  onChangeDate(date: string) {
    this.selectedDate = moment(date).format("YYYY-MM-DD");
    this.getReports();
  }

  getReports() {
    this.flags.displayLoader = true;
    this.appService.getReports(
      this.selectedDate,
      (response: any) => {
        if (response && response.data) {
          this.reports = (response.data.length > 0) ? this.processData(response.data) : [];
        } else {
          this.reports = [];
        }

        this.flags.displayLoader = false;
      },
      (error: any) => {
        console.error("Error in Fetching report list", error);
        this.flags.displayLoader = false;
      }
    );
  }

  processData(zoneObj: any) {
    let result: any = [];
    for (var zone = 0; zone < zoneObj.length; zone++) {
      let lines = zoneObj[zone].lines;
      for (var line = 0; line < lines.length; line++) {
        lines[line].target_count = lines[line].targets[0].target_count;
        lines[line].target_id = lines[line].targets[0].target_id;
        lines[line].production_hrs = lines[line].targets[0].production_hrs;

        // Calculation added
        lines[line].achieved = this.getAchieved(lines[line].targets[0].productions);
        lines[line].difference = lines[line].achieved - lines[line].target_count;
        lines[line].percent = ((lines[line].achieved - lines[line].target_count) / lines[line].target_count) * 100;
        lines[line].percent = Math.round(lines[line].percent * 100) / 100;

        lines[line].productions = lines[line].targets[0].productions;
        lines[line].toggle = false;
      }
      result.push(zoneObj[zone]);
    }

    return result;
  }

  getAchieved(productions: []) {
    return productions.map(function (jedi: any) {
      return jedi.output;
    })
      .reduce(function (acc, score) {
        return acc + score;
      }, 0);
  }

}