const express = require('express')

const app = express()

var expressWs = require('express-ws')(app)

app.get('/', function(req, res, next){
  console.log('get route', req.testing);
  res.end();
})

app.ws('/echo', (ws, req) => {
  var echoWss = expressWs.getWss('/echo');
  ws.on('message', msg => {
    echoWss.clients.
    forEach(function (client) {
      client.send('Hover:' + msg)
    })
  })

  ws.on('close', () => {
    console.log('WebSocket was closed')
  })
})

port = 8000
var uri = 'http://0.0.0.0:' + port
app.listen(port, '0.0.0.0')
console.log('> Listening at ' + uri + '\n')