const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userController = require('./controllers/userController');
const questionController = require('./controllers/questionController')
const commentController = require("./controllers/commentController")
const viewsController = require("./controllers/viewsController")
const likesController = require("./controllers/likesController")

const PORT = process.env.PORT || 4000;

const app = express();

// Используем CORS для разрешения запросов с других доменов
app.use(cors()); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Используем маршруты
app.use(userController);
app.use(questionController);
app.use(commentController);
app.use(viewsController);
app.use(likesController)

// Функция для подключения к базе данных и запуска сервера
async function start() {
  try {
    await mongoose.connect(
      "mongodb+srv://csgoezkatka:IaHwPbyEcG3lGfnz@cluster0.tyiy1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    app.listen(PORT, () => {
      console.log('Server has been started...');
    });
  } catch (e) {
    console.log(e);
  }
}

start();
