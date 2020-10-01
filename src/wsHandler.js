import { getModel, setModel } from './actions'; // Подключаем экшен
import errors from './errors';

module.exports = class WsHandler {
  constructor() {
    this.getModel = getModel;
    this.setModel = setModel;
  }

  static parseRequest(str) {
    let data = false;
    try {
      data = JSON.parse(str);
    } catch (e) {
      //
    }
    return data;
  }

  go(wss, ws, msg) {
    const data = WsHandler.parseRequest(msg); // Вдруг прилетел неправильный json
    if (data) {
      if (data.get) {
        this.getModel(wss, ws, { model: data.get, query: data.query });
      } else if (data.set) {
        this.setModel(wss, ws, { model: data.set, query: data.query, params: data.params });
      } else {
        ws.send(JSON.stringify(errors['404']));
      }
    } else { ws.send(JSON.stringify(errors['400'])); }
  }
};
