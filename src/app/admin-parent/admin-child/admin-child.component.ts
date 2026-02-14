import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-admin-child',
  templateUrl: './admin-child.component.html',
  styleUrls: ['./admin-child.component.css']
})
export class AdminChildComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $('app-admin-child p').css({
      'font-size': '1rem',
      'color': '#6c757d',
      'padding': '5px 0'
    });

    $('app-admin-child h1').css({
      'color': '#007bff',
      'font-weight': 'bold',
      'border-bottom': '2px solid #007bff',
      'padding-bottom': '8px',
      'display': 'inline-block'
    });
  }
}
