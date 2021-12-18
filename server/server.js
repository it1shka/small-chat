const { createServer } = require('http')
const { Server } = require('socket.io')

const httpServer = createServer()
const io = new Server(httpServer, {})

io.on('connection', (socket) => {
  socket.on('message', (message) => {
    socket.broadcast.emit('message', message)
  })
})

httpServer.listen(5050, () => {
  console.log('Running...')
})