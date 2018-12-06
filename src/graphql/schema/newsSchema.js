const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} = require('graphql/type');

const moment = require('moment');
const NewsModel = require('../../model/newsModel');
const AnalysisModel = require('../../model/analysisModel');
const GoogleSearchModel = require('../../model/google-search-model');


const newsType = new GraphQLObjectType({
  name: 'news',
  description: 'news',
  fields: () => ({
    _id: {
      type: GraphQLString,
      description: 'news id',
    },
    title: {
      type: GraphQLString,
      description: 'news title',
    },
    description: {
      type: new GraphQLList(GraphQLString),
      description: 'news description',
    },
    image: {
      type: GraphQLString,
      description: 'news image',
    },
    url: {
      type: GraphQLString,
      description: 'news url',
    },
    source: {
      type: GraphQLString,
      description: 'news source',
    },
    createdAt: {
      type: GraphQLString,
      description: 'news created at',
    },
  }),
});

const newschema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      news: {
        type: new GraphQLList(newsType),
        args: {
          id: {
            name: 'news ID',
            type: GraphQLString,
          },
          createdAt: {
            name: 'createdAt',
            type: GraphQLString,
          },
          limit: {
            name: 'limit',
            type: GraphQLInt,
          },
        },
        resolve: async (root, { id: newsId, createdAt = new Date(), limit = 50 }) => {
          const query = {};
          if (createdAt) {
            query.createdAt = {
              $gte: new Date(moment(createdAt).startOf('day').toJSON()),
              $lt: new Date(moment(createdAt).endOf('day').toJSON()),
            };
          }

          if (newsId) {
            query._id = newsId;

            const analysis = await AnalysisModel.find({
              newsId,
            });

            const googleSearchs = await GoogleSearchModel.find({
              newsId,
            });
            console.log('analysis', analysis);
          }

          const newsFound = await NewsModel
            .find(query, (error, news) => {
              if (error) {
                return [];
              }
              return news;
            })
            .sort('-createdAt')
            .limit(limit);

          return newsFound;
        },
      },
    },
  }),
});

module.exports = newschema;
