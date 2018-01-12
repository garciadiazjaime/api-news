import express from 'express';
import mongoose from 'mongoose';
import NewsController from '../../controllers/newsController';

mongoose.Promise = global.Promise;

/*eslint-disable */
const router = express.Router({mergeParams: true});
/*eslint-enable */

router.get('/news', (req, res) => {
  NewsController.list(req.params)
    .then((data) => {
      res.json({
        status: true,
        data,
      });
    })
    .catch((error) => {
      res.json({
        status: false,
        error,
      });
    });
});

router.post('/news', (req, res) => {
  NewsController.save(req.body)
    .then((data) => {
      res.json({
        status: true,
        data,
      });
    })
    .catch((error) => {
      res.json({
        status: false,
        error,
      });
    });
});

export default router;
