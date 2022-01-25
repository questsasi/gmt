import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { DataSharedService } from 'src/app/shared/services/data-shared.service';
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
    private title: Title,
    private meta: Meta) {
    let contentText = this.appService.seoMeta().find((obj: any) => obj.name == 'description')?.content;
    this.meta.updateTag({
      name: 'description',
      content: contentText ? contentText + ' - Home' : ""
    }, "name='description'");
    this.title.setTitle("Home" + this.appService.seoTitle());
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
        } else {
          this.report = {};
        }
        this.flags.displayLoader = false;
      },
      (error: any) => {
        this.flags.displayLoader = false;
        this.report = {};
      }
    );
  }

  ngOnDestroy() {
    this.serviceSubscription.unsubscribe();
  }
}
