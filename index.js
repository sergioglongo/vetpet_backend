const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {API_PORT} = process.env;


// Syncing all the models at once.
conn.sync({ force: false }).then(() => { // false persistente, true borra en cada reinicio de conexion
  server.listen(API_PORT, () => {
    console.log(`listening at ${API_PORT}`); // eslint-disable-line no-console
  });
});