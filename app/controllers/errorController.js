module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    console.log({
        status: err.status,
        error: err,
        message: err.message
        // stack: err.stack
    })
    res.status(err.statusCode).json({
        error: err,
        message: err.message
    });

};