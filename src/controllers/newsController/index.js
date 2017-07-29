import NewsModel from '../../models/newsModel';

export default class NewsController {
  static list() {
    const newsSince = new Date();
    newsSince.setDate(newsSince.getHours() - 24);
    return NewsModel.find({})
      .where('createdAt')
      .gt(newsSince)
      .sort('-createdAt')
      .exec();
  }

  static save(body) {
    const { data } = body;
    const promises = data.map((item) => {
      const { title, image, link, source, description } = item;
      return NewsModel.count({ $or: [{ title }, { link }] })
        .exec()
        .then((count) => {
          if (!count) {
            const news = new NewsModel({
              title,
              image,
              link,
              description,
              source,
            });
            return news.save();
          }
          return null;
        });
    });
    return Promise.all(promises);
  }
}
