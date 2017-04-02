import React from 'react';
import ReactDOM from 'react-dom';

function toUnderscore(str) {
  //CommentSection -> comment_section
  return str.replace(/([A-Z])/g, function($1) { return '_' + $1.toLowerCase(); }).slice(1);
}

window.renderReact = function(id, component, props) {
  var component = require("./components/" + toUnderscore(component)).default;
  ReactDOM.render(React.createElement(component, props), document.getElementById(id));
}
