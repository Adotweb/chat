const app = require("localhostjs");
const express = app.express; 
require("dotenv").config()

const env = require("./env.json")
const path = require("path")

app.rest.use(express.static(path.join(__dirname, "static")))


let clients = []

app.socket.on("register", (data) => {
	
	clients.push(data)
	
	console.log(data)

	app.socket.send("registered", true, [data])

})

app.socket.on("message", (data) => {

	let {id, message} = data


	console.log(id, message)


	console.log(clients)

	app.socket.send("message", {
		message, id
	}, clients.filter(s => s!== id))

})

app.listen(env)
