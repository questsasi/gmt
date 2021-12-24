import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: 'error.component.html'
})
export class ErrorComponent implements OnInit {
  code: string = '';
  desc: string = '';
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.code = this.route.snapshot.params['code'];

    switch (this.code) {
      case '401':
        this.desc = 'You are not authorized to view the content';
        break;
      case '403':
        this.desc = 'You are restricted to view the content';
        break;
      case '404':
        this.desc = 'The conent you are looking is not found';
        break;
      case 'default':
        this.desc = 'Looks like a broken link';
        break;

    }

  }

}
