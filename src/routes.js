import express from 'express';
import NewsController from './controllers/newsController';

const router = express.Router({ mergeParams: true });

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
