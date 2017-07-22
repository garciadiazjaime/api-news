import express from 'express';

import newsRoutes from '../newsRoutes';

const router = express.Router({mergeParams: true});

router.use('/news', newsRoutes);

export default router;
