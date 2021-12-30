import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  flags: any = {};
  blogData:any = [];

  constructor(private appService: AppService, private title: Title, private meta: Meta) {
    let contentText = this.appService.seoMeta().find((obj: any) => obj.name == 'description')?.content;
    this.meta.updateTag({
      name: 'description',
      content: contentText ? contentText + '- Blog' : ""
    }, "name='description'");
    this.title.setTitle("Blog" + this.appService.seoTitle());
   }

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs() {
    this.flags.displayLoader = true;
    this.appService.getBlogs(
      (response: any) => {
        this.blogData = response;
        console.log(this.blogData);
        this.flags.displayLoader = false;
      },
      (error: any) => {
        this.flags.displayLoader = false;
      }
    );
  }

}
