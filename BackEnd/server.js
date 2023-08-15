const express = require("express")
const mysql = require("mysql")
const cors = require("cors")

const app = express();
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "game"
})

app.get("/", (re, res) => {
    return res.json("from Backend site")
})

app.get("/game_type", (re, res) => {
    const sql = "select * from game_type"
    db.query(sql, (err, data) => {
        if (err) return res.json(err)
        return res.json(data) 
    })

})
app.listen(8081, () => {
    console.log("listen");
})
