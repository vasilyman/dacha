"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setModel = exports.getModel = void 0;

var _errors = _interopRequireDefault(require("./errors"));

var _models = _interopRequireDefault(require("./db/models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getModel = function getModel(wss, ws, _ref) {
  var model = _ref.model,
      query = _ref.query;

  if (model && query) {
    var res = [];

    _models["default"][model].findOne({
      where: query
    }).then(function (switches) {
      res = switches;
    })["catch"](function () {
      res = 'Database error';
    })["finally"](function () {
      ws.send(JSON.stringify({
        code: 200,
        message: 'OK',
        model: model,
        data: res
      }));
    });
  } else ws.send(JSON.stringify(_errors["default"]['400']));
};

exports.getModel = getModel;

var setModel = function setModel(wss, ws, _ref2) {
  var model = _ref2.model,
      query = _ref2.query,
      params = _ref2.params;

  if (model && query && params) {
    _models["default"][model].update(params, {
      where: query
    }).then(function () {
      _models["default"][model].findOne({
        where: query
      }).then(function (result) {
        var prmss = [];
        wss.clients.forEach(function (client) {
          prmss.push(new Promise(function (resolve) {
            client.send(JSON.stringify({
              code: 200,
              message: 'OK',
              model: model,
              data: result
            }));
            resolve();
          }));
        });
        return Promise.all(prmss);
      });
    })["catch"](function () {
      ws.send(JSON.stringify(_errors["default"]['400']));
    });
  } else ws.send(JSON.stringify(_errors["default"]['400']));
};

exports.setModel = setModel;