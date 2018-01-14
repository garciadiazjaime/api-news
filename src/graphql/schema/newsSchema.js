import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
} from 'graphql/type';

import NewsModel from '../../model/newsModel';

const newsType = new GraphQLObjectType({
  name: 'news',
  description: 'news news',
  fields: () => ({
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
      description: 'news source',
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
        },
        resolve: (root, { title }) => {
          const foundnews = new Promise((resolve, reject) => {
            const query = title ? { title } : {};
            NewsModel.find(query, (error, news) => (error ? reject(error) : resolve(news))).sort('-createdAt');
          });
          return foundnews;
        },
      },
    },
  }),
});

export default newschema;
