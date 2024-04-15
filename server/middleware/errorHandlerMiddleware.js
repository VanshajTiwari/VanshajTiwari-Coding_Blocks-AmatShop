const errorHandlerMiddleware = (err, req, res, next) => {
    // Access the status code from the error object
    const statusCode = err.statusCode || 500; // Use 500 if no status code is set in the error object
  
    // Send an appropriate response with the status code
    console.log(err.customprop)
    res.status(statusCode).send('Internal Server Error: ' + err.message);
};

module.exports = { errorHandlerMiddleware };