// Backend Server
import express from "express";
import http from "http";
import WebSocket from "ws";

//Take express, install ws functionality to the same server
const app = express();
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
//Expose public folder to users
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
//Redirect users to root when they type any other urls
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);
//Expose a http server to access
const server = http.createServer(app);
//Create a Web socket server in the same server as http(on top of http server)
const wss = new WebSocket.Server({ server });
const sockets = [];
//wss Server listens for "connection event", once the event happens handleConnection happens.
//wss.on("conection") passes socket as argument
wss.on("connection", (socket) => {
  sockets.push(socket);
  console.log("Backend server connected to frontend browser ✅");
  //Send message to front end
  socket.send("Hello from server");
  //Listens close event from the browser
  socket.on("close", () => {
    console.log("Disconnected from the Browser ❌");
  });

  //Receives message from the front end and send it back to front end
  socket.on("message", (message) => {
    console.log(message);

    //Send messages to all sockets
    sockets.forEach((eachSocket) => eachSocket.send(message));
  });
});
server.listen(3000, handleListen);
