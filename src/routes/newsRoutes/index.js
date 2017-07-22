import express from 'express';
import NewsController from '../../controllers/newsController';

/*eslint-disable */
const router = express.Router({mergeParams: true});
/*eslint-enable */
const controller = new NewsController();
const identiyId = 'activityId';

router.get('/', (req, res) => {
  controller
    .list(req.params)
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
  controller
    .save(req.body)
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
