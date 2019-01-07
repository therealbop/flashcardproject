const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const path = require('path'); 
const app = express()

let db


app.set("view engine", "pug")
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));

MongoClient.connect("mongodb://sandbox:beast1@ds237574.mlab.com:37574/flashcards", (err,database) => {
    if (err) return console.log(err)
    db = database.db('flashcards')
    app.listen(3000, function() {
     console.log("Listening on 3000!")
    }) 
})

app.get("/", (req, res) => {
        res.render('index.pug')
    })


app.get("/flashcards", (req, res) => {
    let cursor = db.collection('flashcards').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.send(results)
    })
})
//app.get('/flashcards', (req.res) =>{
//let cursor = db.collection('flashcards').insertOne()
//})

app.put("/", (req, res)=> {
    let cursor = db.collection("flashcards").insert().toArray((err, results)=>{
        if (err) return console.log(err)
        })
})

app.post("/flashcards", (req, res) => {
    db.collection('flashcards').save(req.body, (err,result) => {
        if (err) return console.log(err)
        console.log('saved to database :)')
        res.redirect('/')
    })
})
app.delete('/:id', (req,res)=>{
    const flaschCardId = req.params.id
    console.log(flashCardId)
    db.collection('flashcards').findByIdAndRemove(flashCardId).then(()=>{
        res.send({msg: 'flash card deleted'})
     })
   .catch((err)=>{
     console.log(err)
   })
})