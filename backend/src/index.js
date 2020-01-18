const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb+srv://allanbarcelos:2fWUWvzkFDPsRsg@cluster0-ecxhr.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json()); // "use" vale para toda requisição
app.use(routes);

server.listen(3333);