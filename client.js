var socket = io('http://localhost:3000');
const l = console.log
let file = null
function getEl(id) {
    return document.getElementById(id)
}
const editor = getEl("editor")
editor.addEventListener("keyup", (evt) => {
    const text = editor.value
    l('keyUP', text)
    socket.send(text)
})
socket.on('message', (data) => {
    l(data)
    l(typeof(data))
    if (data.startsWith('h34d3rDCCN')) {
        l(data.slice(10), 'hi')
        file = JSON.parse(data.slice(10))
        list = getEl('fileList')
        for(let key of Object.keys(file)) {
            l(key)
            let li = document.createElement('li')
            li.textContent = key
            list.appendChild(li)
        }
    } else {

        editor.value = data
    }
})