import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { DataSharedService } from 'src/app/common/data-shared.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  lineDetails: any = [];
  selectedDate: any;
  flags = {
    displayLoader: false,
  };
  report: any = {};
  private serviceSubscription: Subscription = new Subscription;

  constructor(
    private appService: AppService,
    private dataSharedService: DataSharedService,
    private title: Title) {
    this.title.setTitle("GMT PRO - Factory Report");
  }

  ngOnInit(): void {
    this.serviceSubscription = this.dataSharedService.getDate().subscribe((getDate: any) => {
      this.selectedDate = getDate;
      this.getReports();
    });
  }

  getReports() {
    this.flags.displayLoader = true;
    this.appService.getFactoryReports(
      this.selectedDate,
      (response: any) => {
        if (response.data) {
          this.report = response.data;
        }
        this.flags.displayLoader = false;
      },
      (error: any) => {
        console.error('Error in fetching factory report', error);
        this.flags.displayLoader = false;
      }
    );
  }

  ngOnDestroy() {
    this.serviceSubscription.unsubscribe();
  }
}
