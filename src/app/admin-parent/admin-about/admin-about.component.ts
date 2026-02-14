import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-admin-about',
  templateUrl: './admin-about.component.html',
  styleUrls: ['./admin-about.component.css']
})
export class AdminAboutComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $('app-admin-about p').css({
      'font-size': '1rem',
      'color': '#6c757d',
      'padding': '5px 0'
    });

    $('app-admin-about h1').css({
      'color': '#17a2b8',
      'font-weight': 'bold',
      'border-bottom': '2px solid #17a2b8',
      'padding-bottom': '8px',
      'display': 'inline-block'
    });
  }
}
