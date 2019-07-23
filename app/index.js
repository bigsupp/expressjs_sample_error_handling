const express = require('express');
const app = express()

const hrefs = ['/error/throw/403', '/error/next/503', '/error/promise']
app.get('/', (req, res) => {
  const list = hrefs.map(href => `<li><a href="${href}">${href}</a></li>`)
  res.send(list.join(''))
})

app.get('/error/throw/403', (req, res) => {
  const err = new Error('just throw error 403')
  err.statusCode = 403
  throw err
})

app.get('/error/next/503', (req, res, next) => {
  const err = new Error('use error 500 with next()')
  err.statusCode = 503
  next(err)
})

app.get('/error/promise', (req, res, next) => {
  new Promise((resolve, reject) => {
      reject(new Error('promise is rejected, handled by next()'))
    })
    .then(data => {
      return res.send('this promise will not be resolved anyway')
    })
    .catch(next)
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Unknown error occurs.'
  if (err) {
    return res.status(statusCode).send(`${message}<br>
    <a href="/">Back to home</a>
    `)
  }
  res.status(400).send('Sorry, page not found.')
})

module.exports = app