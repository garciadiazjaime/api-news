import express from 'express'
import mongoose from 'mongoose'
import graphqlHTTP from 'express-graphql'

import newsSchema from './graphql/schema/newsSchema'
import NewsModel from './model/newsModel'

mongoose.Promise = global.Promise

const router = express.Router()

router.get('/news', graphqlHTTP(() => ({
  schema: newsSchema
})))

router.post('/news', (req, res) => {
  const { data } = req.body
  const promises = data.map(item => {
    console.log('item', item)
    return new NewsModel(item).save()
  })
  Promise.all(promises)
    .then(results => {
      res.send({
        status: true,
        data: results.length
      })
    })
    .catch(error => {
      res.send({
        status: false,
        error
      })
    })
})

export default router
