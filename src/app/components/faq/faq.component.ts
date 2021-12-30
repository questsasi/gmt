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
      "ques": "Where to change the date ?",
      "ans": "On click of menu, there is option to select date at the top."
    }, {
      "ques": "Report is shown for what date ?",
      "ans": "By default it will show for the current date, whereas we can go and change the date anytime on the nav bar. Respective data for the selected date will be reflected across the site."
    },  {
      "ques": "What are we trying to achieve in GMT PRO ?",
      "ans": "Our aim is to increase the prodictivity and show the real-time production to all levels of management."
    },  {
      "ques": "What is target ?",
      "ans": "Its a daily target for the sewing machine line. Its added for the day."
    },  {
      "ques": "What is production ?",
      "ans": "Its the output of the sewing machine. Its usually added every hour."
    },  {
      "ques": "What is report ?",
      "ans": "Report will show the target of the day and production for the particular day. With the hourly breakdown."
    },  {
      "ques": "How report is generated ?",
      "ans": "Report is based on the day target and every hour production."
    },  {
      "ques": "How to see hourly breakdown ?",
      "ans": "Goto Reports -> View All. In the Zones tab, select the arrow of the line."
    },  {
      "ques": "How percentage in reports is calculated ?",
      "ans": "(Achieved / Present) * 100"
    },  {
      "ques": "What is zone summary ?",
      "ans": "Zone Summary is the average of the lines in the zone."
    }
  ]

  constructor(private title: Title, private meta: Meta, private appService: AppService) {
    let contentText = this.appService.seoMeta().find((obj: any) => obj.name == 'description')?.content;
    this.meta.updateTag( { 
      name:'description', 
      content: contentText ? contentText + '- FAQ': ""
    },"name='description'");
    this.title.setTitle("FAQ" + this.appService.seoTitle());
  }

}
