import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { DataSharedService } from 'src/app/common/data-shared.service';

@Component({
  selector: 'app-reports-line',
  templateUrl: './reports-line.component.html',
  styleUrls: ['./reports-line.component.css'],
})
export class ReportsLineComponent implements OnInit, AfterViewInit, OnDestroy {
  lineDetails: any = [];
  selectedDate: any;
  flags = {
    displayLoader: false,
  };
  reports: any = [];
  private serviceSubscription: Subscription = new Subscription;
  desc = 'Line-wise production report with zone-wise summary, and hourly breakup';
  afterViewInit = false;

  constructor(
    private appService: AppService,
    private dataSharedService: DataSharedService,
    private title: Title,
    private meta: Meta) {
    this.meta.updateTag({
      name: 'description',
      content: this.desc + ' - Line report'
    }, "name='description'");
    this.title.setTitle("Line report" + this.appService.seoTitle());
  }

  ngOnInit(): void {
    this.serviceSubscription = this.dataSharedService.getDate().subscribe((getDate: any) => {
      this.selectedDate = getDate;
      this.getReports();
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.afterViewInit = true;
    }, 1000);
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
        this.flags.displayLoader = false;
      }
    );
  }

  ngOnDestroy() {
    this.serviceSubscription.unsubscribe();
  }

}
