const express = require("express")

const path = require("path")

const app = express()
//const server = require("http").createServer(app)

//const io = require("socket.io")(server)

const socket = require("socket.io")

app.use(express.static(path.join(__dirname, "public")))


app.set("views", path.join(__dirname, "public"))
app.engine("html", require("ejs").renderFile)
app.set("view engine", "html")


app.get("/", (req, res) => {
    res.render("index.html")
    //res.sendFile(__dirname + "/public/index.html")
})






let server = app.listen(3000, () => {
    console.log("server started")  
})

let io = socket(server)

io.on("connection", (socket) => {
    console.log("nova conexao "+socket.id)

    socket.on("message", (data)=> {
        
        socket.broadcast.emit("receivedMessage", data)

    })



})

