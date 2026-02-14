import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'angular-child-routing';

  ngAfterViewInit() {
    $('app-root .app-heading').css({
      'text-align': 'center',
      'color': '#333',
      'font-family': 'Arial, sans-serif',
      'margin-bottom': '10px'
    });

    $('app-root .sub-heading').css({
      'font-size': '1.2rem',
      'color': '#555',
      'margin-bottom': '15px',
      'padding-left': '10px'
    });

    $('app-root .navbar').css({
      'margin-bottom': '20px',
      'border-radius': '4px'
    });

    $('app-root .jumbotron').css({
      'background-color': '#e9ecef',
      'padding': '30px',
      'border-radius': '8px',
      'margin-top': '20px',
      'border': '1px solid #dee2e6'
    });

    $('app-root .jumbotron h2').css({
      'color': '#495057',
      'font-weight': '600'
    });
  }
}
