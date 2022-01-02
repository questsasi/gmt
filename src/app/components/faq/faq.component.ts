import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {

  faqs = [
    {
      "ques": "What is GMT PRO ?",
      "ans": "GMT PRO is used in garment manucaturing company as a real-time garment manufacturing tracker. GMT PRO tracks the productivity and quality of hourly line production. "
    }, {
      "ques": "What is production tracking?",
      "ans": "Production will be done on all sewing / non-sewing factories to achieve the required qty with quality."
    }, {
      "ques": "How production can be done?",
      "ans": "Two types of methods can be used to track productivity. They are the Traditional method and digital method<br/>1. Traditional method:<br/>the prescribed format will be printed on white paper manually production tracking will be made but the current date/backdate report consolidation is difficult.<br/>2. Digital method:<br/>GMT PRO will be used for production tracking line-wise data will be colled on hourly basis consolidated report will be generated automatically on date wise."
    }, {
      "ques": "Why use GMT PRO software?",
      "ans": "GMT PRO is the software used to collect the sewing lines production & Quality data in garment factories. To make the zone/unit / line-wise consolidate the report to track the productivity and quality of the zone/unit/lines."
    }, {
      "ques": "How use GMT PRO?",
      "ans": "Step-1: select required data ( Zone/Style/working hours / and enter target ( required qty in pieces) on Target page for required sewing lines.<br/>Step-2: Hourly production data has to be selected ( Required zone/line / present hour ) and entered the present hour produced qty.<br/>By using both the data's report will be generated for line / Zone / Factory wise."
    }, {
      "ques": "Where to change the date ?",
      "ans": "On click of menu, there is option to select date at the top."
    }, {
      "ques": "Report is shown for what date ?",
      "ans": "By default it will show for the current date, whereas we can go and change the date anytime on the nav bar. Respective data for the selected date will be reflected across the site."
    }, {
      "ques": "What are we trying to achieve in GMT PRO ?",
      "ans": "Our aim is to increase the prodictivity and show the real-time production to all levels of management."
    }, {
      "ques": "What is target ?",
      "ans": "Its a daily target for the sewing machine line. Its added for the day."
    }, {
      "ques": "What is production ?",
      "ans": "Its the output of the sewing machine. Its usually added every hour."
    }, {
      "ques": "What is report ?",
      "ans": "Report will show the target of the day and production for the particular day. With the hourly breakdown."
    }, {
      "ques": "How report is generated ?",
      "ans": "Report is based on the day target and every hour production."
    }, {
      "ques": "How to see hourly breakdown ?",
      "ans": "Goto Reports -> View All. In the Zones tab, select the arrow of the line."
    }, {
      "ques": "How percentage in reports is calculated ?",
      "ans": "(Achieved / Present) * 100"
    }, {
      "ques": "What is zone summary ?",
      "ans": "Zone Summary is the average of the lines in the zone."
    }
  ]

  constructor(private title: Title, private meta: Meta, private appService: AppService) {
    let contentText = this.appService.seoMeta().find((obj: any) => obj.name == 'description')?.content;
    this.meta.updateTag({
      name: 'description',
      content: contentText ? contentText + '- FAQ' : ""
    }, "name='description'");
    this.title.setTitle("FAQ" + this.appService.seoTitle());
  }

}
