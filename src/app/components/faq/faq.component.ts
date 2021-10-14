import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {

  faqs = [
    {
      "ques": "What is GMT ?",
      "ans": "GMT is a real-time garment manufacturing tracker"
    }, {
      "ques": "Where to change the date ?",
      "ans": "On click of menu, there is option to select date at the top."
    }, {
      "ques": "Report is shown for what date?",
      "ans": "By default it will show for the current date, whereas we can go and change the date anytime on the nav bar. Respective data for the selected date will be reflected across the site."
    }
  ]

}
