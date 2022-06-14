//Frontend Server

const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");
//Connects frontend to backend
const socket = new WebSocket(`ws://${window.location.host}`);

//Happens when socket opens a connection
socket.addEventListener("open", () => {
  console.log("Frontend browser connected to backend server ✅");
});
//Receive message from the server
socket.addEventListener("message", (message) => {
  console.log("New message", message.data);
});
//Listens close event from the server
socket.addEventListener("close", () => {
  console.log("Disconnected from the server ❌");
});

setTimeout(() => {
  //Sent message to backend server
  socket.send("Hello from the browser");
}, 10000);

const handleSubmit = (event) => {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(input.value);
  input.value = "";
};

messageForm.addEventListener("submit", handleSubmit);
