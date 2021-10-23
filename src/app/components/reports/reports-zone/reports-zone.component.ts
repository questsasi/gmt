import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { DataSharedService } from 'src/app/common/data-shared.service';

@Component({
  selector: 'app-reports-zone',
  templateUrl: './reports-zone.component.html',
  styleUrls: ['./reports-zone.component.css'],
})
export class ReportsZoneComponent implements OnInit, OnDestroy {
  lineDetails: any = [];
  selectedDate: any;
  flags = {
    displayLoader: false,
  };
  reports: any = [];
  private serviceSubscription:Subscription = new Subscription;

  constructor(
    private appService: AppService,
    private dataSharedService: DataSharedService
  ) {}

  ngOnInit(): void {
    this.serviceSubscription = this.dataSharedService.getDate().subscribe((getDate: any) => {
      this.selectedDate = getDate;
      this.getReports();
    });
  }

  getReports() {
    this.flags.displayLoader = true;
    this.appService.getZoneReports(
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

  ngOnDestroy() {
    this.serviceSubscription.unsubscribe();
  }
}
