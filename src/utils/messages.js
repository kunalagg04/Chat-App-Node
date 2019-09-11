const getMessage = (text) => {
    return {
        text , 
        createdAt : new Date().getTime()
    }
}

const getLocationMessage = (location) => {
    return {
        location , 
        createdAt : new Date().getTime()
    }
}

module.exports = {
    getMessage , 
    getLocationMessage
}