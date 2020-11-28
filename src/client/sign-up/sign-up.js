let mysql = require('mysql')
let express = require('express')
let session = require('express-session')
let bodyParser = require('body-parser')
let path = require('path')
let app = express()

let connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'nodelogin'
})

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}))
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/login.html'))
})

app.post('/auth', function(request, response) {
	var username = request.body.username
	var password = request.body.password
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true
				request.session.username = username
				response.redirect('/home')
			} else {
				response.send('Incorrect Username and/or Password!')
			}			
			response.end()
		});
	} else {
		response.send('Please enter Username and Password!')
		response.end()
	}
})

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!')
	} else {
		response.send('Please login to view this page!')
	}
	response.end()
})

app.listen(3000);