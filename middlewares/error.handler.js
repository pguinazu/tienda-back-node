// crea un middleware de tipo error para usarlo de forma generica en todas mis peticiones http creadas en C:\Users\pguinazu\OneDrive - Aconcagua Software Factory\Escritorio\curso-node\node-api-products\services\product.service.js
function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    // continua al siguiente middleware
    next(err);
  }
}

module.exports = { logErrors, errorHandler, boomErrorHandler };
