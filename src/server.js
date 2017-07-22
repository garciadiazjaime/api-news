import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import apiRoutes from './routes/apiRoutes';
import config from './config';

const app = express();
mongoose.Promise = global.Promise;

app.set('secureToken', config.get('secureToken'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('static'));
app.use('/api', apiRoutes);

app.get('/health', (req, res) => {
  res.writeHead(200);
  res.end();
});

app.set('ipaddress', config.get('ipaddress'));
app.set('port', config.get('port'));

const listen = () => {
  const server = app.listen(app.get('port'), app.get('ipaddress'), (err) => {
    if (err) {
      console.log(err);
    }
    const host = server.address().address;
    const port = server.address().port;
    console.log('App listening at http://%s:%s', host, port);
  });
};

const connect = () => {
  var options = {
    useMongoClient: true,
    promiseLibrary: global.Promise,
  };
  return mongoose.connect(config.get('db.url'), options);
};

connect()
  .then(() => {
    listen();
  })
  .catch(console.log)
