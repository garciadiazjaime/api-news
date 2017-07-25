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
      const { title, image, link, source } = item;
      const news = new NewsModel({
        title,
        image,
        link,
        source,
      });
      return news.save();
    });
    return Promise.all(promises);
  }
}
