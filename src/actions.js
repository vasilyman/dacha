import errors from './errors';
import db from './db/models';

const getModel = (wss, ws, { model, query }) => {
  if (model && query) {
    let res = [];
    db[model].findOne({
      where: query,
    })
      .then((switches) => {
        res = switches;
      })
      .catch(() => {
        res = 'Database error';
      })
      .finally(() => {
        ws.send(JSON.stringify({
          code: 200,
          message: 'OK',
          model,
          data: res,
        }));
      });
  } else ws.send(JSON.stringify(errors['400']));
};
const setModel = (wss, ws, { model, query, params }) => {
  if (model && query && params) {
    db[model].update(params, {
      where: query,
    })
      .then(() => {
        db[model].findOne({
          where: query,
        })
          .then((result) => {
            const prmss = [];
            wss.clients.forEach((client) => {
              prmss.push(new Promise((resolve) => {
                client.send(JSON.stringify({
                  code: 200,
                  message: 'OK',
                  model,
                  data: result,
                }));
                resolve();
              }));
            });
            return Promise.all(prmss);
          });
      })
      .catch(() => {
        ws.send(JSON.stringify(errors['400']));
      });
  } else ws.send(JSON.stringify(errors['400']));
};

export { getModel, setModel };
