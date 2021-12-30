import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent {

  constructor(private title: Title, private meta: Meta, private appService: AppService) {
    let contentText = this.appService.seoMeta().find((obj: any) => obj.name == 'description')?.content;
    this.meta.updateTag( { 
      name:'description', 
      content: contentText ? contentText + '- Privacy Policy' : ""
    },"name='description'");
    this.title.setTitle("Privacy Policy" + this.appService.seoTitle());
  }
}
