import express from 'express';
import NewsController from '../../controllers/newsController';

/*eslint-disable */
const router = express.Router({mergeParams: true});
/*eslint-enable */

router.get('/', (req, res) => {
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

router.post('/', (req, res) => {
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
