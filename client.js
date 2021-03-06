var socket = io('http://localhost:3000');

const l = console.log
let file = null
let selectedFile = null

function getEl(id) {
    return document.getElementById(id)
}
const editor = getEl("editor")
const newFileButton = getEl('newFile')
const inputFileName = getEl('name')
const listElements = document.getElementsByTagName('li')

editor.addEventListener("keyup", (evt) => {
    file[selectedFile] = editor.value
    const headBlanks = 30 - selectedFile.length;
    header = 'f1|ech4ng3' + selectedFile + (' '.repeat(headBlanks)) + editor.value
    l('keyUP', header)
    socket.send(header)
})

newFileButton.addEventListener('click', event => {
    l('event ON')
    fileName = inputFileName.value
    if (fileName != '' && fileName.length <= 30) {
        l(fileName)
        header = 'n3Wf1|30k!' + fileName
        socket.send(header)
        inputFileName.value = ''
    }
})

socket.on('message', (data) => {
    l(data)
    l(typeof (data))
    if (data.startsWith('h34d3rDCCN')) {
        l(data.slice(10), 'hi')
        if (listElements) {
            l(listElements)
            Array.from(listElements).forEach(element => {
                l(element)
                element.parentNode.removeChild(element)
            })
        }
        file = JSON.parse(data.slice(10))
        list = getEl('fileList')
        for (let key of Object.keys(file)) {
            l(key)
            let li = document.createElement('li')
            li.textContent = key
            list.appendChild(li)
            li.addEventListener('click', event => {
                l(event)
                selectedFile = event.srcElement.innerHTML
                editor.value = file[selectedFile]
            })
        }
        l(listElements, 'heli')

    } else if (data.startsWith('f1|ech4ng3')) {
        let changedFile = data.slice(10, 40).trim()
        file[changedFile] = data.slice(40)
        // l(file)
        if (file[selectedFile]) editor.value = file[selectedFile]
    }

})