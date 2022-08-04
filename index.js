import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
    socket.on("sendPhaseAndCounter", ({ counter, phase }) => {
        io.sockets.emit("receivePhaseAndCounter", { counter, phase });
    });

    socket.on("sendTeamInfos", (teamInfos1, teamInfos2) => {
        io.sockets.emit("receiveTeamInfos", {
            blue: JSON.parse(teamInfos1),
            red: JSON.parse(teamInfos2),
        });
        console.log({
            blue: JSON.parse(teamInfos1),
            red: JSON.parse(teamInfos2),
        })
    });

    socket.on("sendCounter", (counter) => {
        io.sockets.emit("receiveCounter", counter);
    });

    socket.on("sendMatchInfo", (matchInfo) => {
        io.sockets.emit("receiveMatchInfo", matchInfo);
    });

    socket.on("sendPicksAndBans", (bluePicksAndBans, redPicksAndBans) => {
        io.sockets.emit("receivePicksAndBans", {
            blue: JSON.parse(bluePicksAndBans),
            red: JSON.parse(redPicksAndBans),
        });
        console.log({
            blue: JSON.parse(bluePicksAndBans),
            red: JSON.parse(redPicksAndBans),
        })
    });
});

httpServer.listen(5000);
console.log("listening on port ", 5000);