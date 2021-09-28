import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AppService } from 'src/app/app.service';
import { DataSharedService } from 'src/app/common/data-shared.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  lineDetails: any = [];
  selectedDate: any;
  flags = {
    displayLoader: false,
  };
  reports: any = [];

  constructor(
    private appService: AppService,
    private dataSharedService: DataSharedService
  ) {}

  ngOnInit(): void {
    this.dataSharedService.getDate().subscribe((getDate: any) => {
      this.selectedDate = getDate;
      this.getReports();
    });
  }

  getReports() {
    this.flags.displayLoader = true;
    this.appService.getReports(
      this.selectedDate,
      (response: any) => {
        if (response && response.data) {
          this.reports =
            response.data.length > 0 ? this.processData(response.data) : [];
        } else {
          this.reports = [];
        }

        this.flags.displayLoader = false;
      },
      (error: any) => {
        console.error('Error in Fetching report list', error);
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
        lines[line].achieved = this.getAchieved(
          lines[line].targets[0].productions
        );
        lines[line].difference =
          lines[line].achieved - lines[line].target_count;
        lines[line].percent =
          ((lines[line].achieved - lines[line].target_count) /
            lines[line].target_count) *
          100;
        lines[line].percent = Math.round(lines[line].percent * 100) / 100;

        lines[line].productions = lines[line].targets[0].productions;
        lines[line].toggle = false;
      }
      result.push(zoneObj[zone]);
    }

    return result;
  }

  getAchieved(productions: []) {
    return productions
      .map(function (jedi: any) {
        return jedi.output;
      })
      .reduce(function (acc, score) {
        return acc + score;
      }, 0);
  }
}
