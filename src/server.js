import http from "http"
import SocketIO from "socket.io"
import express from "express";

const app = express();

app.set("view engine", "pug")
app.set("views", __dirname + "/views")

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (_, res) => res.render("home"))
app.get("/*", (_, res) => res.redirect("/"));

const port = 3000
const handleListen = () => console.log(`Listening on http://localhost:${port}`); 

const httpServer = http.createServer(app)
const io = SocketIO(httpServer)

io.on("connection", (socket) => {
    console.log(socket)
})

/*
const wss = new WebSocket.Server({ server })
const sockets = []

wss.on("connection", (socket) => {
    socket["nickname"] = "Anonymous"
    sockets.push(socket)
    console.log("Connected to Browser 😍")
    socket.on("close", () => console.log("Disconneted from the Browser ❎"))
    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message)
        console.log(parsedMessage)
        switch (parsedMessage.type) {
            case "nickname":
                socket["nickname"] = parsedMessage.payload
                break
            case "new_message":
                sockets.forEach((s) => s.send(`${socket.nickname}: ${parsedMessage.payload}`))
                break
        }
    })
})
*/

httpServer.listen(port, handleListen)
