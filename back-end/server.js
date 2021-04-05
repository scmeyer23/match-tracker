const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/matches', {
  useNewUrlParser: true
});

const matchSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category'
    },
    title: String,
    opponent: String,
    score: String,
    date: String,
    notes: String,
    win: Boolean
});

const Match = mongoose.model('Match', matchSchema);

const catSchema = new mongoose.Schema({
    name: String
});

const Category = new mongoose.model('Category', catSchema);

app.post('/api/cat/:cat/match', async (req, res) => {
    try {
        let cat = await Category.findOne({ name: req.params.cat });
        if (!cat) {
            res.send(404);
            return;
        }
        let match = new Match({
            category: cat,
            title: req.body.title,
            opponent: req.body.opponent,
            score: req.body.score,
            date: req.body.date,
            notes: req.body.notes,
            win: req.body.win
        });
        await match.save();
        res.send(match);
    } catch (error) {
        res.sendStatus(500);
    }
});

app.get('/api/cat/:cat/match', async (req, res) => {
    try {
        let cat = await Category.findOne({ name: req.params.cat });
        if (!cat) {
            res.send(404);
            return;
        }
        let match = await Match.find({ category: cat });
        res.send(match);
    } catch (error) {
        res.sendStatus(500);
    }
});

app.put('/api/cat/:catID/match/:matchID', async (req, res) => {
    console.log("PUT Called")
    try {
        let match = await Match.findOne({ _id: req.params.matchID});
        if (!match) {
            res.send(404);
            return;
        }
        match.title = req.body.title;
        match.opponent = req.body.opponent;
        match.score = req.body.score;
        match.date = req.body.date;
        match.notes = req.body.notes;
        match.win = req.body.win;
        await match.save();
        res.send(match);
    } catch (error) {
        res.sendStatus(500);
    }
});

app.delete('/api/cat/:catID/match/:matchID', async (req, res) => {
    console.log("Delete called");
    try {
        let match = await Match.findOne({ _id: req.params.matchID});
        console.log(match);
        if (!match) {
            res.send(404);
            return;
        }
        await match.delete();
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }
});

app.post('/api/cat', async (req, res) => {
    const cat = new Category({
        name: req.body.name
    });
    try {
        await cat.save();
        res.send(cat);
    } catch (error) {
        res.sendStatus(500);
    }
});

app.get('/api/cat', async (req, res) => {
    try {
        let cat = await Category.find();
        res.send(cat);
    } catch (error) {
        res.sendStatus(500);
    }
});


app.listen(3000, () => console.log('Server listening on port 3000!'));
