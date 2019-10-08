const express = require("express");
const { join } = require("path");
const morgan = require("morgan");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const port = process.env.SERVER_PORT || 3040;

app.use(morgan("dev"));
app.use(express.static(join(__dirname, "build")));

app.use((_, res) => {
  res.sendFile(join(__dirname, "build", "index.html"));
});

app.use(express.static(__dirname + "/public"));

let clients = 0;

io.on("connection", function(socket) {
  socket.on("NewClient", function() {
    if (clients < 2) {
      if (clients == 1) {
        this.emit("CreatePeer");
      }
    } else this.emit("SessionActive");
    clients++;
  });
  socket.on("Offer", SendOffer);
  socket.on("Answer", SendAnswer);
  socket.on("disconnect", Disconnect);
});

function Disconnect() {
  if (clients > 0) {
    if (clients <= 2) {
      this.broadcast.emit("Disconnect");
    }
    clients--;
  }
}

function SendOffer(offer) {
  this.broadcast.emit("BackOffer", offer);
}

function SendAnswer(data) {
  this.broadcast.emit("BackAnswer", data);
}

http.listen(port, () => console.log(`Listening on port ${port}`));
