import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-user-parent',
  templateUrl: './user-parent.component.html',
  styleUrls: ['./user-parent.component.css']
})
export class UserParentComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $('app-user-parent p').css({
      'font-size': '1.1rem',
      'color': '#dc3545',
      'font-weight': 'bold',
      'padding': '10px',
      'background-color': '#fff3cd',
      'border-radius': '4px',
      'display': 'inline-block'
    });
  }
}
