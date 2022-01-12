import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {


  flags: any = {};
  blogObj: any = [];
  blogTitle:string = '';
  constructor(private appService: AppService, private route: ActivatedRoute, private router: Router, private title: Title, private meta: Meta) {
    this.blogTitle = this.route.snapshot.params['title'];
    
    let contentText = this.appService.seoMeta().find((obj: any) => obj.name == 'description')?.content;
    this.meta.updateTag({
      name: 'description',
      content: this.blogTitle ? this.blogTitle + ' - Blog' : ""
    }, "name='description'");
    this.title.setTitle(this.blogTitle);

    this.getBlogs();
  }

  getBlogs() {
    this.flags.displayLoader = true;
    this.appService.getBlogs(
      (response: any) => {
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
