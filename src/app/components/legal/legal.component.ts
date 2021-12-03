import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.css']
})
export class LegalComponent implements OnInit {

  constructor(private title: Title) {
    this.title.setTitle("GMT PRO - Legal");
}

  ngOnInit(): void {
  }

}
