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
            log(evt, 'evt')
            if (evt.startsWith('f1|ech4ng3')) {
                log(evt.slice(10, 40))
                file[evt.slice(10, 40).trim()] = evt.slice(40)
                log(file)
                socket.broadcast.emit('message', evt)
            } else if (evt.startsWith('n3Wf1|30k!')) {
                log(evt,"yo")
                file[evt.slice(10)] = ''
                log(evt.slice(10), "boys")
                log(file," file ingo")
                socket.send('h34d3rDCCN' + JSON.stringify(file))
                socket.broadcast.emit('message', 'h34d3rDCCN' + JSON.stringify(file))
            }
        })
    })
    io.on('disconnect', (evt) => {
        log('some people left')
    })

    process.on('SIGINT', () => {
        log('Server Closing!')
        fs.writeFile('files.json', JSON.stringify(file), () => {
            log('File Saved')
        })
        io.close()
    })
})