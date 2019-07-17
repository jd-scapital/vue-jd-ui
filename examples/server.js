var express = require('express')
var helmet = require('helmet')
var cons = require('consolidate')
var path = require('path')
var http = require('http')

var app = express()

var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: 'index.html',
  maxAge: '1d',
  redirect: false,
  setHeaders: function(res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}

app.use(helmet())

// engine set
app.set('views', path.resolve(__dirname, './dist'))
// mustache模板
app.engine('html', cons.mustache)
app.set('view engine', 'html')

// static
app.use('/', express.static('dist', options))
app.use('/favicon.ico', express.static('dist/favicon.ico', options))

// service
app.use('/', (req, res, next) => {
  res.render('index', {})
})

app.use((req, res) => {
  res.status(404).send('File not found!')
})

var port = 3002
var httpServer = http.createServer(app)
httpServer.listen(port, function() {
  console.log('start service: http://localhost:' + port)
})
