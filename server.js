// server.js
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Statische Dateien aus dem "public"-Ordner bereitstellen
app.use(express.static('public'));

// Socket.IO: Verbindung und Nachrichten-Handling
io.on('connection', (socket) => {
  console.log('Ein Nutzer verbunden: ' + socket.id);

  socket.on('chat message', (data) => {
    // Leite das Nachrichtenobjekt (enthält senderId, message und timestamp) an alle Clients weiter
    io.emit('chat message', data);
  });

  socket.on('disconnect', () => {
    console.log('Nutzer getrennt: ' + socket.id);
  });
});

// Server startet auf Port 5500 oder dem in der Umgebungsvariable angegebenen Port
const PORT = process.env.PORT || 7500;
http.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
