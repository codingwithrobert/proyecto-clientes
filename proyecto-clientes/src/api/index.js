'use strict';

// Express
const express = require('express');
// Cors
const cors = require('cors');
// BodyParser
const bodyParser = require('body-parser');
// Base de Datos
const mysql = require('mysql');

// JSONWEBTOKEN modulos
const jwt = require('jsonwebtoken');
const config = require('./config');

/////////////////////////////////////////////
const app = express();
//////////////// APP //////////////////////
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('llave', config.llave);

//Datos de Conexion

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'clients_db'
});

// Conexion de base de Datos
connection.connect(error => {
  if (error) throw error;
  console.log(`✔️ 🚀 >>>> DataBase working 100% <<<< 🚀 ✔️`);
});

// Config Puerto y launch del server
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`✔️ 🚀 >>>> API working on PORT ${PORT}  <<<< 🚀 ✔️`)
);

// GET de Prueba

app.get('/', (request, resolve) => {
  resolve.send('Te doy la bienvenida API');
});
//////////////////// Definiendo Rutas ////////////////////////
////////////////////////////////////////////////////////////////////////////// Recogiendo Datos(CLIENTS)
app.get('/clients', (request, resolve) => {
  // Secuencia SQL
  const sql = 'SELECT * FROM client_list';
  // Conexion yy ejecucion de MYSQL
  connection.query(sql, (error, results) => {
    // Si hay error que lo tire
    if (error) throw error;
    // Comprobar que la respuesta no viene vacia
    if (results.length !== 0) {
      resolve.json(results);
    }
    // Si esta vacia ...
    else {
      resolve.send('No Clients yet');
    }
  });
});
/////////////////////////////////////////////////////////////////////////////// Actualizando NOTAS
app.put('/notas/update/:id', (request, resolve) => {
  // Texto que llega del body
  const texto = request.body.texto;
  // ID que llega del body
  const id = request.body.id;
  const sql = `UPDATE lista_notas SET texto= '${texto}' WHERE id=${id}`;
  connection.query(sql, error => {
    if (error) throw error;
    resolve.send('Nota Actualizada');
  });
});
/////////////////////////////////////////////////////////////////////////////// Borrando una NOTA
app.delete('/notas/delete/:id', (request, resolve) => {
  // Almacenamos id que recogemos como parametro
  const id = request.params.id;
  // Secuencia MYSQL a ejecutar
  const sql = `DELETE FROM lista_notas WHERE id=${id}`;
  connection.query(sql, error => {
    if (error) throw error;
    resolve.send('Nota Borrada');
  });
});

///////////////////////////////////////////////////////////////////////////////  Añadiendo CLIENT
app.post('/add', (request, resolve) => {
  // Secuencia MYSQL
  const sql = `INSERT INTO client_list SET ?`;
  // Objeto que recibe de database
  const newClient = {
    name: request.body.name,
    surname: request.body.surname,
    city: request.body.city,
    company: request.body.company
  };
  // Conexion y ejecucion de MYSQL
  connection.query(sql, newClient, error => {
    if (error) throw error;
    resolve.send('Nota ha sido creada');
  });
});

// METODO LOGIN QUE CREA EL TOKEN
app.post('/auth', (request, resolve) => {
  // Datos que recogemos del body
  const user = request.body.user;
  const password = request.body.password;
  // Secuencia MYSQL
  // el campo user  == nickname io email
  const sql = `SELECT * FROM users WHERE user='${user}' AND password='${password}'`;
  // Conexion DB
  connection.query(sql, (error, results) => {
    let admin = null;
    if (error) throw error;
    if (results.length !== 0) {
      const payload = {
        check: true
      };
      if (results[0].isadmin === 1) {
        admin = true;
      } else {
        admin = false;
      }
      const token = jwt.sign(payload, app.get('llave'), {
        expiresIn: '1day'
      });
      resolve.json({
        message: 'Autenticacion es correcta',
        token: token,
        isAdmin: admin
      });
    } else {
      console.log('Datos incorrectos');
    }
  });
});

//   if (user === 'admin' && password == 'admin') {
//     const payload = {
//       check: true
//     };
//     const token = jwt.sign(payload, app.get('llave'), {
//       expiresIn: '1 day'
//     });
//     resolve.json({
//       message: 'Te has autenticado correctamente',
//       token: token
//     });
//     console.log(token);
//   } else {
//     console.log('Datos incorrectos');
//   }
// });
