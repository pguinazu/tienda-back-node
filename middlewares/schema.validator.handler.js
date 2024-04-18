const boom = require('@hapi/boom');

// crea un nuevo middleware para validar los schemas de product.schemas.js
function validatorHandler(schema, property) {
    return (req, res, next) => {
        // const { error } = schema.validate(req[property]); // obtenemos la data de forma dinamica con property para que pueda ser req.body, req.params, req.query
        // // sin usar boom, para manejar el error de forma estatica lo hariamos asi
        // if (error) { // si hay error, devolvemos el mensaje de error
        //     const message = error.details.map(e => e.message).join(', '); // obtenemos el mensaje de error y lo unimos con comas
        //     return next({ status: 400, message }); // devolvemos el error de forma estatica
        // }
        // next();

        // usando boom
        const { error } = schema.validate(req[property], { abortEarly: false }); // obtenemos la data de forma dinamica con property para que pueda ser req.body, req.params, req.query. AbortEarly para que nos devuelva todos los errores y no solo el primero que encuentra
        error ? next(boom.badRequest(error)) : next(); // si hay error, devolvemos el mensaje de error, si no, continuamos al siguiente middleware
    }
}

module.exports = validatorHandler;
