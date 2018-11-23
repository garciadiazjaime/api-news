const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLInt,
  GraphQLID,
} = require('graphql/type');

const moment = require('moment');

const AnalysisModel = require('../../model/analysisModel');

const WordsFrequency = new GraphQLObjectType({
  name: 'wordsFrequency',
  fields: {
    word: { type: GraphQLString },
    frequency: { type: GraphQLInt },
  },
});

const analysisType = new GraphQLObjectType({
  name: 'analysis',
  description: 'analysis',
  fields: () => ({
    _id: {
      type: GraphQLID,
      description: 'analysis id',
    },
    wordsFrequency: {
      type: new GraphQLList(WordsFrequency),
    },
    newsId: {
      type: GraphQLID,
    },
    sentiment: {
      type: GraphQLFloat,
    },
    createdAt: {
      type: GraphQLString,
    },
  }),
});

const analysisSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      analysis: {
        type: new GraphQLList(analysisType),
        args: {
          createdAt: {
            name: 'createdAt',
            type: GraphQLString,
          },
          limit: {
            name: 'limit',
            type: GraphQLString,
          },
        },
        resolve: (root, { createdAt = new Date(), limit = 50 }) => {
          const analysisFound = new Promise((resolve, reject) => {
            const query = {};

            if (createdAt) {
              query.createdAt = {
                $gte: moment(createdAt).startOf('day'),
                $lt: moment(createdAt).endOf('day'),
              };
            }

            AnalysisModel
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

module.exports = analysisSchema;
