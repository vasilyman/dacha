"use strict";

var _ws = _interopRequireDefault(require("ws"));

var _wsHandler = _interopRequireDefault(require("./wsHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import express from 'express';
// const app = express();
var wss = new _ws["default"].Server({
  port: 3000
});
var wsHandler = new _wsHandler["default"]();
wss.on('connection', function (ws) {
  console.log('connected');
  ws.on('message', function (msg) {
    wss.clients.forEach(function (client) {
      if (client.readyState === _ws["default"].OPEN) {
        wsHandler.go(wss, ws, msg);
      }
    });
  });
}); // app.ws('/', (ws, req) => {
//   ws.on('message', (msg) => {
//     wsHandler.go(req, ws, msg);
//   });
// });
// app.listen(3000, () => {
//   console.log('Started, port: 3000');
// });