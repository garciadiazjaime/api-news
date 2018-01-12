import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import newsRoutes from './routes/newsRoutes';
import config from './config';

const app = express();
mongoose.Promise = global.Promise;

app.set('secureToken', config.get('secureToken'));
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('static'));
app.use('/api', newsRoutes);

app.get('/health', (req, res) => {
  res.writeHead(200);
  res.end();
});

app.set('ipaddress', config.get('ipaddress'));
app.set('port', config.get('port'));

const startApp = () => {
  const server = app.listen(app.get('port'), app.get('ipaddress'), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`App listening at http://${server.address().address}:${server.address().port}`);
    }
  });
};

const dbConnect = () => {
  const options = {
    useMongoClient: true,
  };
  return mongoose.connect(config.get('db.url'), options);
};

dbConnect()
  .then(startApp)
  .catch(console.log);
