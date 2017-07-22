import _ from 'lodash';

import News from '../../models/newsModel';

export default class NewsController {

  constructor() {
    // this.mongoUtil = new MongoUtil();
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

  // get(identityId) {
  //   const filter = {
  //     _id: this.mongoUtil.getObjectID(identityId),
  //     status: true,
  //   };
  //   return new Promise((resolve, reject) => {
  //     this.mongoUtil
  //       .findOne(this.collectionName, filter)
  //       .then(results => resolve(results))
  //       .catch(err => reject(err));
  //   });
  // }
  //
  save(data) {
    // const newData = _.assign({}, data, {
    //   status: true,
    //   created: new Date(),
    // });

    var news = new News({
      title: 'Chris',
      image: 'sevilayha',
      source: 1,
    });

    return news.save();

    // return new Promise((resolve, reject) => {
    //   this.mongoUtil
    //     .insert(this.collectionName, newData)
    //     .then(results => resolve(results))
    //     .catch(err => reject(err));
    // });
  }

  // update(identityId, data) {
  //   const filter = {
  //     _id: this.mongoUtil.getObjectID(identityId),
  //   };
  //   const newData = _.assign({}, data, {
  //     updated: new Date(),
  //   });
  //   return new Promise((resolve, reject) => {
  //     this.mongoUtil
  //       .update(this.collectionName, newData, filter)
  //       .then(results => resolve(results))
  //       .catch(err => reject(err));
  //   });
  // }
  //
  // delete(identityId) {
  //   return new Promise((resolve, reject) => {
  //     const filter = {
  //       _id: this.mongoUtil.getObjectID(identityId),
  //     };
  //     const newData = _.assign({}, {
  //       deleted: new Date(),
  //       status: false,
  //     });
  //     this.mongoUtil
  //       .update(this.collectionName, newData, filter)
  //       .then(results => resolve(results))
  //       .catch(err => reject(err));
  //   });
  // }
}
