// server.js
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Statische Dateien aus dem "public"-Verzeichnis bereitstellen
app.use(express.static('public'));

// Socket.IO-Verbindung
io.on('connection', (socket) => {
  console.log('Ein Nutzer hat sich verbunden.');

  // Wenn eine Nachricht empfangen wird, an alle Clients senden
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Ein Nutzer hat die Verbindung getrennt.');
  });
});

// Server startet auf Port 3000
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
