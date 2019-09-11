const socket = io()

socket.on('welcome' , (welcome) => {
    console.log(welcome)
})

const form = document.querySelector('form')
form.addEventListener('submit' ,  (e) => {
    e.preventDefault()
    // const msg = document.querySelector('input').value
    const msg = e.target.elements.message.value
    // console.log(msg)
   
    //message arg is actually the argument we passedin index.js ! it is not necessary
    //confuse mat ho bhosdike
    socket.emit('sendMessage',msg, (message) => {
        console.log('Gaya message !' , message)
    })
    
})

socket.on('newMessage' , (msg) => {
    console.log(msg)
})

//share location
document.querySelector('#location').addEventListener('click',() => {
    if(!navigator.geolocation){
        return alert(' bhosdike browser update krle')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        const location =  {
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
        }

        console.log(location)
        socket.emit('location',location)
    })

}) 

socket.on('rlocation',(l) => {
    console.log(`Location : Latitude --> ${l.latitude} Longitude --> ${l.longitude} `)
    console.log(`https://google.com/maps?q=${l.latitude},${l.longitude}`)
})

