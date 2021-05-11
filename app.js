var express = require("express");
var portNum = process.env.PORT || "1000";
var userID;
var socket = require("socket.io");
var socketIDs = [];

var app = express();
app.set("view engine", "ejs");

//Server setup

//Port setup
var server = app.listen(portNum, () => {
  console.log(`listening stated..`);
});

//setting static folder
app.use(express.static("./public"));

//socket setup
var io = socket(server);

io.on("connection", (socket) => {
  socketIDs.push(socket.id);
  console.log("connected ID: " + socket.id);
  userID = socket.id;

  io.sockets.emit("checkAll", socketIDs);

  //listen and then send data
  //socket.on("function name", (data)=>{
  // io.sockets.emit("function name", data);
  //for broadcast
  // socket.broadcast.emit("function name", data);
  //});startGame

  socket.on("startGame", (data) => {
    io.sockets.emit("startGame", data);
  });

  socket.on("startGameAgain", (data) => {
    socket.broadcast.emit("startGameAgain", data);
  });

  socket.on("both_connected", (data) => {
    io.sockets.emit("both_connected", data);
  });

  socket.on("obj_game_info", (data) => {
    socket.broadcast.emit("obj_game_info", data);
  });

  socket.on("obj_game_info1", (data) => {
    socket.broadcast.emit("obj_game_info1", data);
  });
});

//get dynamic server
app.get("/", (req, res) => {
  res.render("index", { userID, socketIDs });
});
