$(document).ready(function () {
  $('body').css({
    'font-family': 'Arial, sans-serif',
    'background-color': '#f0f0f0',
    'margin': '0',
    'padding': '20px'
  });

  var $heading = $('<h1>Hello, World!</h1>');
  $heading.css({
    'color': '#333',
    'text-align': 'center',
    'padding': '20px',
    'background-color': '#fff',
    'border-radius': '8px',
    'box-shadow': '0 2px 4px rgba(0,0,0,0.1)'
  });

  $('body').append($heading);

  $.each(['Hello, World!'], function (index, message) {
    console.log(message);
  });
});
