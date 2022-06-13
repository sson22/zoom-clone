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
//Create a http server from express
const server = http.createServer(app);
//Create a Web socket server in the same server as http(on top of http server)
const wss = new WebSocket.Server({ server });

function handleConnection(socket) {
  console.log(socket);
}
wss.on("connection", handleConnection);
server.listen(3000, handleListen);
