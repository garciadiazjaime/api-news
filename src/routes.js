import express from 'express'
import mongoose from 'mongoose'
import graphqlHTTP from 'express-graphql'

import newsSchema from './graphql/schema/newsSchema'
// import NewsModel from './models/newsModel'

mongoose.Promise = global.Promise

const router = express.Router()

router.get('/news', graphqlHTTP(() => ({
  schema: newsSchema
})))

// router.post('/news', (req, res) => {
//   NewsController.save(req.body)
//     .then((data) => {
//       res.json({
//         status: true,
//         data,
//       })
//     })
//     .catch((error) => {
//       res.json({
//         status: false,
//         error,
//       })
//     })
// })

export default router
