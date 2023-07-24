const mysql = require('mysql2');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'NodeUser4',
  password: '123',
  database: 'nodeuser4'
});

pool.on('aquire',function(connection) {
    console.log('Connection %d aquired', connection.threadId);
});

pool.on('connection',function(connection) {
    console.log('Connection %d connected', connection.threadId);
});

pool.on('enqueue', function(connection) {
    console.log('Connection %d enqueued', connection.threadId);
});

pool.on('release', function(connection) {
    console.log('Connection %d release', connection.threadId);
});

module.exports = pool;