"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
app.get('/', function (_req, res) {
  res.json({
    hello: 'you'
  });
});
app.listen(9500, function () {
  console.log('Listening on port 9500');
});