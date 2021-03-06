var express = require('express');
var app = express();
var PORT = process.env.PORT  || 3000;
var bodyParser = require('body-parser');
var _ = require('underscore');


app.use(bodyParser.json());
// var todos = [{
// 	id: 1,
// 	description: 'Meet kabila parents',
// 	completed: false
// },{
// 	id:2,
// 	description: 'Go to market',
// 	completed: false
// }, {
// 	id:3,
// 	description: 'Run',
// 	completed:true
// }];

var todos = []
var todoNextId = 1;

app.get('/',function(req,res) {
	res.send('Hello Shivangi!');
});

//GET /todos
app.get('/todos', function(req, res) {
	res.json(todos);
});

//GET //todos/:id

app.get('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id);
	var matchedTodo = _.findWhere(todos, {id: todoId});

	// var matchedTodo;

	// todos.forEach(function(todo){
	// 	if(todo.id === todoId) {
	// 		matchedTodo = todo;
	// 	}
	// });
	if(matchedTodo) {
		res.json(matchedTodo);
	} else {
		res.status(404).send();
	}
	//res.send('Asking for response for' + req.params.id);
});


//POST /todos
app.post('/todos',function(req, res) {
	var body = _.pick(req.body,'description','completed');
	if(!_.isBoolean(body.completed) || !_.isString(body.description)
	 || body.description.trim().length === 0) {
		return res.status(400).send();
	}

	body.description = body.description.trim();
	body.id = todoNextId++;

	todos.push(body);

	//console.log('description: ' + body.description);
	res.json(body);
});

//DELETE /todos/:id
app.delete('/todos/:id',function(req,res) {
	var todoId = parseInt(req.params.id,10);
	//Second argument appears to be base
	var matchedTodo = _.findWhere(todos, { id: todoId});

	if(!matchedTodo) {
		res.status(404).json({"error" : " no todos found with that id"});
	} else {
		todos = _.without(todos,matchedTodo);
		res.json(matchedTodo);
	}
});

// PUT /todos/:id

app.put('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id,10);
	//Second argument appears to be base
	var matchedTodo = _.findWhere(todos, { id: todoId});
	var body = _.pick(req.body,'description','completed');
	var validAttributes = {};

	if(!matchedTodo) {
		return res.status(404).send();
	}

	if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
		validAttributes.completed = body.completed;
		console.log('Hit completed case!' + body.completed);
	} else if(body.hasOwnProperty('completed')) {
		return response.status(400).send();
	} else {
		// No update required as no attribute provided
	}

	if(body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
		validAttributes.description = body.description;
		console.log('Hit description case!' + body.description);
	} else if(body.hasOwnProperty('description')) {
		return response.status(400).send();
	} else {
		// No updates required as desc is not passed
	}

	// Update the existing item
	_.extend(matchedTodo,validAttributes);
	// It will be autmaticall assigned to matchedTodo as
	// the variable is passed by reference

	res.json(matchedTodo);



});


app.listen(PORT, function() {
	console.log('Express JS is running on port: ' + PORT);
});