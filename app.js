//importing required libraries and files
const express = require('express');
const path = require('path');
const data = require('./db/db.json');
const { addNote, deleteNote} = require('./helper');

const app = express();
//changed default port to 5001
const PORT = process.env.PORT || 5001

//To parse incoming request with url encoded payloads
app.use(express.urlencoded({
    extended: true
}));

//To parse incoming post requests with json payloads
app.use(express.json());

//Creates a home path which loads index.html file as a home page
app.get('/',function(req, res) {
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

//creates a /notes path which loads notes.html file
app.get('/notes',function(req, res) {
    res.sendFile(path.join(__dirname+'/public/notes.html'));
});

//creates an /api/notes get endpoint which is returning entore data from db.json file
app.get('/api/notes', (req,res) => {
    res.json(data);
})

//creates an /api/notes post endpoint which is calling addnote function from helper file
app.post('/api/notes', (req, res) => {  
    addNote(req.body, data);
    res.json(req.body);
});

//creates an /api/notes delete end point which is taking id as path param and calling deletenote function from helper file
app.delete('/api/notes/:id', (req,res) => {
    deleteNote(req.params.id, data);
    res.json(data);
});

//this line helps to serve static files on sever
app.use(express.static(path.join(__dirname, 'public')));

//create a port on PORT
app.listen(PORT);
 
//console statement that is printing once server is loaded
console.log('Running at Port '+PORT);