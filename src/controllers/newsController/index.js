import _ from 'lodash';

import News from '../../models/newsModel';

export default class NewsController {

  constructor() {
    this.collectionName = 'news';
  }

  list(params) {
    const filter = {
      status: true,
    };
    if (params.sourceId) {
      filter.sourceId = params.sourceId;
    }
    return News.find({}).exec();
  }

  save(body) {
    const { data } = body;
    const promises = data.map((item) => {
      const { title, image, source } = item;
      const news = new News({
        title,
        image,
        source,
        status: true,
        createdAt: new Date(),
      });
      return news.save();
    });
    return Promise.all(promises);
  }

}
