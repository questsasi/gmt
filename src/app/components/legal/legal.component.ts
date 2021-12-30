import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.css']
})
export class LegalComponent {

  constructor(private title: Title, private meta: Meta, private appService: AppService) {
    let contentText = this.appService.seoMeta().find((obj: any) => obj.name == 'description')?.content;
    this.meta.updateTag( { 
      name:'description', 
      content: contentText ? contentText + '- Legal, Terms and Conditions': ""
    },"name='description'");
    this.title.setTitle("Legal, Terms and Conditions" + this.appService.seoTitle());
  }

}
