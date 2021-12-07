import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  flags: any = {};
  blogData:any = [];

  constructor(private appService: AppService) { }

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
