import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {


  flags: any = {};
  blogObj: any = [];
  blogId: number = 0;
  constructor(private appService: AppService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getBlogs();
    this.blogId = this.route.snapshot.params['id'];
  }

  getBlogs() {
    this.flags.displayLoader = true;
    this.appService.getBlogs(
      (response: any) => {
        console.log(this.blogId);
        this.blogObj = response[this.blogId];
        this.flags.displayLoader = false;
      },
      (error: any) => {
        this.flags.displayLoader = false;
      }
    );
  }
}
