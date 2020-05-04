require('dotenv').config();
const express = require('express');
const app = express();
const serveStatic = require("serve-static");
const cors = require('cors');
const mongoose = require('mongoose');
const games = require('./routes/api/games');
const teams = require('./routes/api/teams');
const users = require('./routes/api/users');

const PORT = process.env.PORT || 3000

mongoose.connect(process.env.DATABASE_LOCAL, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.on('connected', () => console.log('Connected to database!'));

app.use(express.json());
app.use(cors());


app.use('/api/games', games);
app.use('/api/teams', teams);
app.use('/api/users', users);

if (process.env.NODE_ENV === 'production') {
    app.use(serveStatic(path.join(__dirname, 'public')));
}



app.listen(PORT, () => console.log("Server started!"));