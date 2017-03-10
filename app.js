var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);


app.use(express.static(__dirname + '/public'));


io.sockets.on('connection', function(socket) {
	socket.on('createNote', function(data) {
		socket.broadcast.emit('onNoteCreated', data);
	});

	socket.on('updateNote', function(data) {
		socket.broadcast.emit('onNoteUpdated', data);
	});

	socket.on('moveNote', function(data){
		socket.broadcast.emit('onNoteMoved', data);
	});

	socket.on('deleteNote', function(data){
		socket.broadcast.emit('onNoteDeleted', data);
	});
});

server.listen(1337, function () {
	console.log('Server running at http://0.0.0.0:' + server.address().port)
});
// app.listen(process.env.PORT || 1337, function () {
//   console.log('Server running at http://0.0.0.0:' + server.address().port)
// })
