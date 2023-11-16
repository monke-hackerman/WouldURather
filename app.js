const express = require("express");
const session = require("express-session");
const db = require("better-sqlite3")("db.db", {verbose: console.log})
const path = require("path")
const hbs = require('hbs')

const app = express()

const viewPath = path.join(__dirname, "/views/pages")
const partialsPath = path.join(__dirname, "/views/partials")
app.set("view engine", hbs)
app.set('views', viewPath)
hbs.registerPartials(partialsPath)
app.use(express.urlencoded({ extended: true }))


// alt du trenger for session til å fungere
app.use(session({
    secret: "hrafnnafdafnafar",
    resave: false,
    saveUninitialized: false
}))





//prøver å stoppe serveren fra å stoppe hvis den krasjer
app.use((err, req, res, next) => {
    console.warn(err.stack)
    res.status(500).send("error 500 internal server error")
})

//hvilken port appen er på
app.listen("3000", () => {
    console.log("Server listening at http://localhost:3000")
})