import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { DataSharedService } from 'src/app/common/data-shared.service';

@Component({
  selector: 'app-reports-line',
  templateUrl: './reports-line.component.html',
  styleUrls: ['./reports-line.component.css'],
})
export class ReportsLineComponent implements OnInit, OnDestroy {
  lineDetails: any = [];
  selectedDate: any;
  flags = {
    displayLoader: false,
  };
  reports: any = [];
  private serviceSubscription: Subscription = new Subscription;

  constructor(
    private appService: AppService,
    private dataSharedService: DataSharedService, 
    private title: Title,
    private meta: Meta) {
      let contentText = this.appService.seoMeta().find((obj: any) => obj.name == 'description')?.content;
      this.meta.updateTag({
        name: 'description',
        content: contentText ? contentText + ' - Line report' : ""
      }, "name='description'");
      this.title.setTitle("Line report" + this.appService.seoTitle());
    }

  ngOnInit(): void {
    this.serviceSubscription = this.dataSharedService.getDate().subscribe((getDate: any) => {
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

  ngOnDestroy() {
    this.serviceSubscription.unsubscribe();
  }

}
