const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} = require('graphql/type');

const moment = require('moment');
const NewsModel = require('../../model/newsModel');


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
        resolve: (root, { id, createdAt = new Date(), limit = 50 }) => {
          const newsFound = new Promise((resolve, reject) => {
            const query = {};
            if (id) {
              query._id = id;
            }

            if (createdAt) {
              query.createdAt = {
                $gte: new Date(moment(createdAt).startOf('day').toJSON()),
                $lt: new Date(moment(createdAt).endOf('day').toJSON()),
              };
            }

            NewsModel
              .find(query, (error, news) => {
                if (error) {
                  return reject(error);
                }
                return resolve(news);
              })
              .sort('-createdAt')
              .limit(limit);
          });

          return newsFound;
        },
      },
    },
  }),
});

module.exports = newschema;
