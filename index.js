import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
    socket.on("sendTeamInfos", (teamInfos) => {
        io.sockets.emit("receiveTeamInfos", teamInfos);
    });

    socket.on("sendPicksAndBans", (picksAndBans) => {
        io.sockets.emit("receivePicksAndBans", picksAndBans);
    });
});

httpServer.listen(5000);
console.log("listening on port ", 5000);