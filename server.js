var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var createdTasks = [];
var server = app.listen(4000,listening);

function listening(err,result){
	console.log('server listening on http://localhost:4000');
}

app.use(express.static('public'));
app.use(bodyParser.json());

//server listening for GET requests from client-sidebar
app.get('/tasks',function(req,res){
	res.send(createdTasks);
}); 

//server listening for posts requests from the client side
app.post('/tasks',function(req,res){
	var task = req.body.task;
	if(createdTasks.indexOf(task) !=-1){
		res.send('task exists..');
	}else{
		createdTasks.push(task);
		res.send(createdTasks);
	}
});	
//server listening for put requests from client side
app.put('/tasks',function(req,res){
	var task = req.body.task;
	var id = req.body.id;
	if(createdTasks.indexOf(task) !=-1){
		res.send("task already exists..");
	}else{
		createdTasks[Number(id-1)]=task;
		res.send(createdTasks);
	}
	
});
//server listening for delete requests from client side
app.delete('/tasks',function(req,res){
	var task = req.body.task;
	if(!task) return;
	createdTasks.splice(createdTasks.indexOf(task),1);
	res.send(createdTasks);
});