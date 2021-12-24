import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {


  flags: any = {};
  blogObj: any = [];
  blogTitle:string = '';
  constructor(private appService: AppService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getBlogs();
    this.blogTitle = this.route.snapshot.params['title'];
  }

  getBlogs() {
    this.flags.displayLoader = true;
    this.appService.getBlogs(
      (response: any) => {
        console.log(this.blogTitle);
        this.blogObj = response.find((obj: any) => obj.title == this.blogTitle );
        if(!this.blogObj) {
          this.router.navigate(['/error/404']);
        }
        this.flags.displayLoader = false;
      },
      (error: any) => {
        this.flags.displayLoader = false;
      }
    );
  }
}
