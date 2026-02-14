import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-admin-parent',
  templateUrl: './admin-parent.component.html',
  styleUrls: ['./admin-parent.component.css']
})
export class AdminParentComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $('app-admin-parent p').css({
      'font-size': '1.1rem',
      'font-weight': 'bold',
      'padding': '10px',
      'background': 'green',
      'color': '#fff',
      'border-radius': '4px',
      'display': 'inline-block'
    });

    $('app-admin-parent h2').css({
      'color': '#333',
      'margin': '15px 0',
      'font-size': '1.3rem'
    });

    $('app-admin-parent .btn').css({
      'margin-right': '10px',
      'margin-bottom': '15px',
      'padding': '8px 20px',
      'font-size': '1rem',
      'border-radius': '4px',
      'cursor': 'pointer'
    });

    $('app-admin-parent .jumbotron').css({
      'border': '1px solid black',
      'padding': '20px',
      'border-radius': '6px',
      'background-color': '#f8f9fa',
      'margin-top': '10px'
    });
  }
}
