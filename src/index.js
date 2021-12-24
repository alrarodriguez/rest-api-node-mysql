const express = require ('express');
const app = express();
const cors = require('cors');

// Settings (configuracion de servidor, puerto, entorno de desarrollo)
app.set('port', process.env.PORT || 3000); //servidor del puerto


// Middelwares (funciones que se ejecutan antes de llegar a las rutas) 
app.use(express.json());


// Routes (url del servidor para procesar datos)
app.use(require('./routes/people'));

// Starting the server
app.listen(app.get('port'), ()  => {
    console.log('Server on port', app.get('port'));
});