import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.css']
})
export class DisclaimerComponent {

  constructor(private title: Title, private meta: Meta, private appService: AppService) {
    let contentText = this.appService.seoMeta().find((obj: any) => obj.name == 'description')?.content;
    this.meta.updateTag({
      name: 'description',
      content: contentText ? contentText + '- Disclaimer' : ""
    }, "name='description'");
    this.title.setTitle("Disclaimer" + this.appService.seoTitle());
  }

}
