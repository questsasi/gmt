import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {

  constructor(private title: Title, private meta: Meta, private appService: AppService) {
    let contentText = this.appService.seoMeta().find((obj: any) => obj.name == 'description')?.content;
    this.meta.updateTag({
      name: 'description',
      content: contentText ? contentText + '- About Us' : ""
    }, "name='description'");
    this.title.setTitle("About Us" + this.appService.seoTitle());
  }

}
