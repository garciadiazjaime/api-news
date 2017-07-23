import News from '../../models/newsModel';

export default class NewsController {
  static list() {
    const newsSince = new Date();
    newsSince.setDate(newsSince.getHours() - 24);
    return News.find({})
      .where('createdAt')
      .gt(newsSince)
      .exec();
  }

  static save(body) {
    const { data } = body;
    const promises = data.map((item) => {
      const { title, image, source } = item;
      const news = new News({
        title,
        image,
        source,
      });
      return news.save();
    });
    return Promise.all(promises);
  }
}
