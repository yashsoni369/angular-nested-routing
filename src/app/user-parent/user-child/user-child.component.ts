import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-user-child',
  templateUrl: './user-child.component.html',
  styleUrls: ['./user-child.component.css']
})
export class UserChildComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $('app-user-child p').css({
      'font-size': '1rem',
      'color': '#6c757d',
      'padding': '5px 0'
    });
  }
}
