const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(cors());

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Nouvelle connexion');

  // Écoute des messages du client
  socket.on('message', (message) => {
    // Diffuser le message à tous les clients connectés
    io.emit('message', message);
  });

  // Gestion de la déconnexion
  socket.on('disconnect', () => {
    console.log('Déconnexion');
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Serveur écoutant sur le port ${port}`);
});
