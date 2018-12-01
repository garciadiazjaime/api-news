import express from 'express';
import mongoose from 'mongoose';
import graphqlHTTP from 'express-graphql';

import newsSchema from './graphql/schema/newsSchema';
import NewsModel from './model/newsModel';

const cors = require('cors');
const AnalysisSchema = require('./graphql/schema/analysisSchema');
const AnalysisModel = require('./model/analysisModel');
const GoogleSearchModel = require('./model/google-search-model');


mongoose.Promise = global.Promise;

const router = express.Router();

router.get('/news', cors(), graphqlHTTP(() => ({
  schema: newsSchema,
})));

router.post('/news', (req, res) => {
  const { data } = req.body;

  const promises = data.map(item => NewsModel
    .count({
      source: item.source,
      url: item.url,
    })
    .then(count => !count && new NewsModel(item).save()));

  Promise.all(promises)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      res.send(error).status(404);
    });
});

router.get('/analysis', graphqlHTTP(() => ({
  schema: AnalysisSchema,
})));

router.post('/analysis', (req, res) => {
  const { data } = req.body;
  const promises = data.map(item => AnalysisModel
    .countDocuments({
      newsId: item.newsId,
    })
    .then(count => !count && new AnalysisModel(item).save()));

  Promise.all(promises)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      res.send(error).status(404);
    });
});

router.post('/google-results', (req, res) => {
  const { analysisId, data = [] } = req.body;
  const promises = data.map(item => GoogleSearchModel
    .countDocuments({
      analysisId,
    })
    .then(count => !count && new GoogleSearchModel(
      Object.assign({}, item, { analysisId }),
    ).save()));

  Promise.all(promises)
    .then((results) => {
      AnalysisModel
        .findOneAndUpdate({
          _id: mongoose.Types.ObjectId(analysisId),
        }, {
          $set: { googleSearched: true },
        })
        .then(() => {
          res.send(results);
        })
        .catch((error) => {
          res.send(error).status(404);
        });
    })
    .catch((error) => {
      res.send(error).status(404);
    });
});

export default router;
