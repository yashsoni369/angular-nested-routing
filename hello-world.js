$(document).ready(function() {
  $('<div>')
    .text('Hello, World!')
    .css({
      'font-size': '24px',
      'font-weight': 'bold',
      'color': '#333',
      'padding': '20px',
      'text-align': 'center',
      'margin-top': '50px'
    })
    .appendTo('body');
});
