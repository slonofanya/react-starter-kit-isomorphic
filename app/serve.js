import express from 'express';
import _ from 'lodash';
import React from "react";
import path from 'path';
import fs from 'fs';

import render from 'react-dom/server';
import { match, RoutingContext } from 'react-router'
import routes from './routes';

const server = global.server = express();
const template = _.template(fs.readFileSync('dist/index.html', 'utf8'));

server.set('port', (process.env.PORT || 3000));
server.use(express.static('./dist/public'));
server.use(express.static('./dist/public/js'));
server.use('/commonjs', express.static('./public/js/common'));

server.get('*', (req, res, next) => {
  if ((/.*public.*\.[a-z\d]+/i).test(req.path))
    return next();

  match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      res
        .status(200)
        .send(template({
          title: 'React starter kit from Slonofanya',
          body: render.renderToString(<RoutingContext {...renderProps} />)
        }))
      ;
    } else {
      res.status(404).send('Not found');
    }
  });
});

server.listen(server.get('port'), () => {
  /* eslint-disable no-console */
  console.log('The server is running at http://localhost:' + server.get('port'));
  if (process.send) {
    process.send('online');
  }
});