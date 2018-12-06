const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID,
} = require('graphql/type');

const moment = require('moment');

const GoogleResultsModel = require('../../model/google-results-model');

const GoogleResultsType = new GraphQLObjectType({
  name: 'GoogleResults',
  fields: () => ({
    _id: {
      type: GraphQLID,
      description: 'analysis id',
    },
    analysisId: {
      type: GraphQLString,
    },
    newsId: {
      type: GraphQLString,
    },
    title: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    link: {
      type: GraphQLString,
    },
    createdAt: {
      type: GraphQLString,
    },
  }),
});

const GoogleResultsSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      googleResults: {
        type: new GraphQLList(GoogleResultsType),
        args: {
          createdAt: {
            name: 'createdAt',
            type: GraphQLString,
          },
          limit: {
            name: 'limit',
            type: GraphQLInt,
          },
          newsId: {
            name: 'newsId',
            type: GraphQLString,
          },
        },
        resolve: (root, { createdAt, limit = 50, newsId }) => {
          const analysisFound = new Promise((resolve, reject) => {
            const query = {};

            if (newsId) {
              query.newsId = newsId;
            }

            if (createdAt) {
              const date = createdAt ? new Date(createdAt) : new Date();
              query.createdAt = {
                $gte: moment(date).startOf('day'),
                $lt: moment(date).endOf('day'),
              };
            }

            GoogleResultsModel
              .find(query, (error, analysis) => {
                if (error) {
                  return reject(error);
                }
                return resolve(analysis);
              })
              .sort('-createdAt')
              .limit(limit);
          });

          return analysisFound;
        },
      },
    },
  }),
});

module.exports = GoogleResultsSchema;
module.exports.GoogleResultsType = GoogleResultsType;
