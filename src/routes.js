import express from 'express'
import mongoose from 'mongoose'
import graphqlHTTP from 'express-graphql'

import newsSchema from './graphql/schema/newsSchema'

mongoose.Promise = global.Promise

const router = express.Router()

router.get('/events', graphqlHTTP(() => ({
  schema: newsSchema
})))

export default router
