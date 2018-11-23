import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
} from 'graphql/type';

const moment = require('moment')

import NewsModel from '../../model/newsModel';

const newsType = new GraphQLObjectType({
  name: 'news',
  description: 'news news',
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
    }
  }),
});

const newschema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      news: {
        type: new GraphQLList(newsType),
        args: {
          title: {
            name: 'title',
            type: GraphQLString,
          },
          createdAt: {
            name: 'createdAt',
            type: GraphQLString,
          },
          limit: {
            name: 'limit',
            type: GraphQLString
          }
        },
        resolve: (root, { title, createdAt = new Date(), limit = 50 }) => {
          const newsFound = new Promise((resolve, reject) => {
            const query = title ? { title } : {};
            if (title) {
              query.title = title;
            }
            if (createdAt) {
              query.createdAt = {
                "$gte": moment(createdAt).startOf('day'),
                "$lt": moment(createdAt).endOf('day')
              }
            }

            NewsModel
              .find(query, (error, news) => {
                if (error) {
                  return reject(error)
                }
                return resolve(news)
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

export default newschema;
