require('babel-register')({ experimental: true });

var bodyParser = require('body-parser');

var express = require('express');
var app = express();
var React = require('react');

function toUnderscore(str) {
  //CommentSection -> comment_section
  return str.replace(/([A-Z])/g, function($1) { return '_' + $1.toLowerCase(); }).slice(1);
}

function renderToString(component, props, callback) {
  var component = require("./components/" + toUnderscore(component)).default;
  callback(React.renderToString(React.createElement(component, props)));
}

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// app.get('/', function( req, res ){
//   res.end('hello');
// });

app.post('/', function( req, res ){
  // return res.end(req.body.props.toString) - just for debug
  renderToString(req.body.component, req.body.props, function(str){
    res.end(str);
  });
});

app.listen(3001)
