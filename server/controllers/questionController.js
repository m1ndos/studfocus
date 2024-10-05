const { Router } = require('express');
const multer = require('multer');
const Question = require('../models/questions'); // Импортируем модель
const User = require("../models/users")
const router = Router();

// Настройка multer для обработки файлов
const storage = multer.memoryStorage(); // Хранит файл в памяти
const upload = multer({ storage });

// Обработчик POST-запроса для создания вопроса
router.post('/api/question/create', upload.single('image'), async (req, res) => {
    try {
        console.log("111");
        
        const { user_id, title, text } = req.body;
        const image = req.file ? req.file.buffer : null; // Сохраняем файл в виде Buffer

        const newQuestion = new Question({
            user_id,
            title,
            text,
            image, // Сохраняем бинарные данные изображения
            views_count: 0,
            comments_count: 0,
            date: Date.now(),
        });

        await newQuestion.save();
        res.status(201).json({ message: 'Question created successfully!', question: newQuestion });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating question', error });
    }
});

router.post('/api/question/get-by-user-id', async (req, res) => {
    try {
        const { user_id } = req.body; // Предполагаем, что user_id передается в теле запроса как строка
        console.log('user_id from request:', user_id);
        
        // Находим все вопросы, созданные данным пользователем
        const questions = await Question.find({ user_id });

        if (!questions.length) {
            return res.status(404).json({ message: 'Questions not found for this user' });
        }

        // Находим пользователя по user_id
        const user = await User.findById(user_id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Добавляем к каждому вопросу поле autor (имя и фамилия пользователя) и форматируем дату
        const questionsWithAuthor = questions.map(question => {
            const formattedDate = new Date(question.date).toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });

            return {
                ...question.toObject(),
                autor: `${user.firstname} ${user.lastname}`, // Добавляем поле автор
                imageUrl: question.image ? `http://localhost:4000/api/question/image/${question._id}` : null, // Ссылка на изображение
                date: formattedDate // Добавляем отформатированную дату
            };
        });

        res.status(200).json({ questions: questionsWithAuthor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving questions', error });
    }
});




// Обработчик для получения изображения по идентификатору вопроса
router.get('/api/question/image/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Находим вопрос по id
        const question = await Question.findById(id);

        if (!question || !question.image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        // Устанавливаем заголовки для изображения
        res.set('Content-Type', 'image/jpeg'); // или другой формат, в зависимости от типа изображения
        res.send(question.image); // Отправляем изображение
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving image', error });
    }
});

// Обработчик для получения вопроса по его id
router.post('/api/question/get-by-id', async (req, res) => {
    try {
        const { id } = req.body; // Получаем id из тела запроса

        // Находим вопрос по id
        const question = await Question.findById(id);

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        // Получаем user_id из вопроса
        const userId = question.user_id;

        // Находим пользователя по user_id
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Форматируем дату для отображения
        const formattedDate = new Date(question.date).toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        // Если есть изображение, добавляем ссылку на него
        const questionWithImage = {
            ...question.toObject(),
            imageUrl: question.image ? `http://localhost:4000/api/question/image/${question._id}` : null,
            date: formattedDate,
            autor: `${user.firstname} ${user.lastname}`, // Добавляем имя и фамилию автора
        };

        res.status(200).json({ question: questionWithImage }); // Возвращаем вопрос с отформатированной датой, ссылкой на изображение и автором
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving question', error });
    }
});


module.exports = router;
