"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var errors = {
  400: {
    code: 400,
    message: 'Bad Request',
    description: 'Bad request data'
  },
  401: {
    code: 401,
    message: 'Unauthorized',
    description: 'Please authorize first.'
  },
  404: {
    code: 404,
    message: 'Not found',
    description: 'Action not found'
  },
  500: {
    code: 500,
    message: 'Internal Server Error',
    description: 'Internal Server Error.'
  }
};
var _default = errors;
exports["default"] = _default;