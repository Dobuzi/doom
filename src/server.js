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
    socket.on("enter_room", (msg, done) => {
        console.log(msg)
        setTimeout(() => {
            done()
        }, 3000)
    })
})

httpServer.listen(port, handleListen)
