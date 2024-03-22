//Middleware for console logging requests made to server
const requestHandler = (req, res, next) => {
    console.log(req.path, req.method)
    next()
}

module.exports = {
    requestHandler,
}