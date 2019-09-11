const socket = io()

//accepting an event from server
//the order matters not name 
socket.on('countUpdated' , (count) => {
    console.log(count)
})

const but = document.querySelector("#but")
but.addEventListener('click' , () => {
    console.log("button dabaya bc")
    socket.emit('increment')
})