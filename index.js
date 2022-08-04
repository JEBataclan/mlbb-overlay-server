import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 5000;
//const INDEX = '/index.html';

const app = express();
//.use((req, res) => res.sendFile(INDEX, { root: __dirname }))
//.listen(PORT, () => console.log(`Listening on ${PORT}`));
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

//io.set("transports", ["xhr-polling"]); 
//io.set("polling duration", 10); 

io.on("connection", (socket) => {
    console.log(`Socket with ID: ${socket.id} has connected.`);

    socket.on("join-room", (room) => {
        socket.join(room);
        console.log(`Socket with ID: ${socket.id} has joined room ${room}.`)
    })

    socket.on("sendPhaseAndCounter", ({ counter, phase }) => {
        io.sockets.emit("receivePhaseAndCounter", { counter, phase });
    });

    socket.on("sendTeamInfos", (room, teamInfos1, teamInfos2) => {
        //io.sockets.emit("receiveTeamInfos", {
        //    blue: JSON.parse(teamInfos1),
        //    red: JSON.parse(teamInfos2),
        //});

        socket.broadcast.to(room).emit("receiveTeamInfos", {
            blue: JSON.parse(teamInfos1),
            red: JSON.parse(teamInfos2),
        });
    });

    socket.on("sendCounter", (room, counter) => {
        //io.sockets.emit("receiveCounter", counter);

        socket.broadcast.to(room).emit("receiveCounter", counter);
    });

    socket.on("sendMatchInfo", (room, matchInfo) => {
       //io.sockets.emit("receiveMatchInfo", matchInfo);

       socket.broadcast.to(room).emit("receiveMatchInfo", matchInfo);
    });

    socket.on("sendPicksAndBans", (room, bluePicksAndBans, redPicksAndBans) => {
        //io.sockets.emit("receivePicksAndBans", {
        //    blue: JSON.parse(bluePicksAndBans),
        //    red: JSON.parse(redPicksAndBans),
        //});
        
        socket.broadcast.to(room).emit("receivePicksAndBans", {
            blue: JSON.parse(bluePicksAndBans),
            red: JSON.parse(redPicksAndBans),
        });
    });
});

httpServer.listen(PORT, function () {
    console.log("Server is listening at port " + PORT);
})