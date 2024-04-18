const express = require('express');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
// importa cors
const cors = require('cors');

const app = express();

app.use(express.json());

const whiteList = ['http://localhost:8080', 'https://myapp.co']; // dominios permitidos para acceder a la API
const options = { // opciones de cors
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}

// // aplicamos cors antes de usar nuestro routerApi para que pueda ser accedido desde cualquier lugar - solo usar para APIs publicas
// app.use(cors());

// aplicamos cors antes de usar nuestro routerApi para que pueda ser accedido desde cualquier lugar - solo usar para APIs publicas
app.use(cors(options));

routerApi(app);

// se aplican los error middleware DESPUES de usar nuestro routerApi
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(process.env.PORT || 3000);
