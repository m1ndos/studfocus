const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const PORT = process.env.PORT || 4000;

const app = express();

// Middleware для парсинга JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(routes);

async function start() {
    try {
        await mongoose.connect("mongodb+srv://csgoezkatka:IaHwPbyEcG3lGfnz@cluster0.tyiy1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        app.listen(PORT, () => {
            console.log('Server has been started...');
        });
    } catch (e) {
        console.log(e);
    }
}

start();