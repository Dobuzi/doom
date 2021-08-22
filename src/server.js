import http from "http"
import WebSocket from "ws"
import express from "express";

const app = express();

app.set("view engine", "pug")
app.set("views", __dirname + "/views")

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (_, res) => res.render("home"))
app.get("/*", (_, res) => res.redirect("/"));

const port = 3000
const handleListen = () => console.log(`Listening on http://localhost:${port}`); 

const server = http.createServer(app)

const wss = new WebSocket.Server({ server })

wss.on("connection", (socket) => {
    console.log("Connected to Browser 😍")
    socket.on("close", () => console.log("Disconneted from the Browser ❎"))
    socket.on("message", (message) => {
        console.log(message.toString('utf8'))
    })
    socket.send("hello!!")
})

server.listen(port, handleListen)
