const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');


const app = express();

mongoose.connect('mongodb+srv://allanbarcelos:2fWUWvzkFDPsRsg@cluster0-ecxhr.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json()); // "use" vale para toda requisição
app.use(routes);

app.listen(3333);