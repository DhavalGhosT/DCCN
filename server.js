const log = console.log
// initialize http server, socket.io and port number
let file = null
const fs = require('fs')
fs.readFile('files.json', (err, data) => {
    log(data.toString())
    file = JSON.parse(data.toString())
    
    const http = require('http').createServer()
    const io = require('socket.io')(http)
    const port = 3000
    http.listen(port, () => log(`server listening on port: ${port}`))
    io.on('connection', (socket) => {
        log('connected')
        newConnectionFlag = true
        if (newConnectionFlag) {
            header = 'h34d3rDCCN'
            header += JSON.stringify(file)            
            socket.send(header)

        }
        socket.on('message', (evt) => {
            log(evt,'evt')
            socket.broadcast.emit('message', evt)
        })
    })
    io.on('disconnect', (evt) => {
        log('some people left')
    })
})
