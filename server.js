var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var morgan = require('morgan')
var io = require('socket.io')(http);
var routes = require('./Controllers/routes');
var apiRoutes = require('./api')

io.on('connection', function(socket){
	console.log('Se ha conectado un usuario');

	socket.on('envio de mensaje', function(msj){
		io.emit('envio de mensaje', msj);
	})

	socket.on('disconnect', function(){
		console.log('Se ha desconectado un usuario');
	});
});


app.use(morgan('combined'));
app.use(bodyParser.json());

/*views*/
app.use(routes.home);
app.use(routes.chat);
/*******/

app.use(apiRoutes)


var runServerChat = function(puerto) {
    http.listen(puerto, function(){
        console.log('listening on *:' + puerto);
    });
};

exports.app = app;

exports.runServerChat = runServerChat;
