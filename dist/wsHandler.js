"use strict";

var _actions = require("./actions");

var _errors = _interopRequireDefault(require("./errors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

module.exports = /*#__PURE__*/function () {
  function WsHandler() {
    _classCallCheck(this, WsHandler);

    this.getModel = _actions.getModel;
    this.setModel = _actions.setModel;
  }

  _createClass(WsHandler, [{
    key: "go",
    value: function go(wss, ws, msg) {
      var data = WsHandler.parseRequest(msg); // Вдруг прилетел неправильный json

      if (data) {
        if (data.get) {
          this.getModel(wss, ws, {
            model: data.get,
            query: data.query
          });
        } else if (data.set) {
          this.setModel(wss, ws, {
            model: data.set,
            query: data.query,
            params: data.params
          });
        } else {
          ws.send(JSON.stringify(_errors["default"]['404']));
        }
      } else {
        ws.send(JSON.stringify(_errors["default"]['400']));
      }
    }
  }], [{
    key: "parseRequest",
    value: function parseRequest(str) {
      var data = false;

      try {
        data = JSON.parse(str);
      } catch (e) {//
      }

      return data;
    }
  }]);

  return WsHandler;
}();