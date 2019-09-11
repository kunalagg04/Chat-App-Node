const socket = io()

const form = document.querySelector('form')
const msgbut = document.querySelector('#msg-but')
const msginput = document.querySelector('#msg')
const messages = document.querySelector('#messages')
const lochtml = document.querySelector('#location-template')

const msgTemplate = document.querySelector('#message-template').innerHTML
const locTemplate = document.querySelector('#location-template').innerHTML





form.addEventListener('submit' ,  (e) => {
    e.preventDefault()
    msgbut.setAttribute('disabled','disabled')
    // const msg = document.querySelector('input').value
    const msg = e.target.elements.message.value
    // console.log(msg)
   
    //message arg is actually the argument we passedin index.js ! it is not necessary
    //confuse mat ho bhosdike
    socket.emit('sendMessage',msg , (message) => {
        console.log('Gaya message !' , message)
    })
     
    msgbut.removeAttribute('disabled')
    msginput.value = ''
    msginput.focus()

    
})

socket.on('newMessage' , (msg) => {
    console.log(msg.text)
    const html = Mustache.render(msgTemplate , {
        createdAt : moment(msg.createdAt).format('h:mm a'),
        message : msg.text
    })
    // console.log(html )
    messages.insertAdjacentHTML('beforeend',html)

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

        // console.log(location)
        socket.emit('location',location)
    })

}) 

socket.on('rlocation',(l) => {
    // console.log(`Location : Latitude --> ${l.latitude} Longitude --> ${l.longitude} `)
    const url = `https://google.com/maps?q=${l.location.latitude},${l.location.longitude}`
    const lochtml = Mustache.render(locTemplate , {
        createdAt : moment(l.createdAt).format('h:mm a') ,
        url 
    })

    // console.log(lochtml)
    console.log(l.location)
    messages.insertAdjacentHTML('beforeend', lochtml)
   
    
})

