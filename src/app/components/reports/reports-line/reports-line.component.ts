import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AppService } from 'src/app/app.service';
import { DataSharedService } from 'src/app/common/data-shared.service';

@Component({
  selector: 'app-reports-line',
  templateUrl: './reports-line.component.html',
  styleUrls: ['./reports-line.component.css'],
})
export class ReportsLineComponent implements OnInit {
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
    this.appService.getLineReports(
      this.selectedDate,
      (response: any) => {
        if (response.data && response.data.length) {
          this.reports = response.data;
        }
        this.flags.displayLoader = false;
      },
      (error: any) => {
        console.error('Error in Fetching report list', error);
        this.flags.displayLoader = false;
      }
    );
  }

}
