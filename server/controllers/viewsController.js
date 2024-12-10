const { Router } = require('express');
const View = require('../models/views'); // Модель просмотров
const User = require('../models/users'); // Модель пользователей
const Question = require('../models/questions'); // Модель вопросов
const router = Router();

// POST запрос для создания просмотра
router.post('/api/view/create', async (req, res) => {
    const { user_id, question_id } = req.body; // Извлекаем данные из тела запроса

    // Проверяем, что все обязательные поля присутствуют
    if (!user_id || !question_id) {
        return res.status(400).json({ error: 'user_id and question_id are required' });
    }

    try {
        // Проверяем, существует ли пользователь
        const userExists = await User.findById(user_id);
        if (!userExists) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Проверяем, существует ли вопрос
        const questionExists = await Question.findById(question_id);
        if (!questionExists) {
            return res.status(404).json({ error: 'Question not found' });
        }

        // Проверяем, существует ли уже просмотр с данным user_id и question_id
        const existingView = await View.findOne({ user_id, question_id });
        if (existingView) {
            return res.status(409).json({ error: 'View already exists for this user and question' });
        }

        // Создаем новый документ просмотра
        const newView = new View({
            user_id,
            question_id
        });

        // Сохраняем просмотр в базу данных
        await newView.save();

        // Увеличиваем счетчик просмотров в вопросе
        await Question.findByIdAndUpdate(
            question_id,
            { $inc: { views_count: 1 } }, // Увеличиваем поле views_count на 1
            { new: true } // Возвращаем обновленный документ (необязательно)
        );

        // Возвращаем успешный ответ
        res.status(201).json({ message: 'View created successfully', view: newView });
    } catch (error) {
        console.error(error); // Логируем ошибку
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST запрос для подсчета количества просмотров вопроса
router.post('/api/view/count', async (req, res) => {
    const { question_id } = req.body; // Извлекаем question_id из тела запроса

    // Проверяем, что question_id передан
    if (!question_id) {
        return res.status(400).json({ error: 'question_id is required' });
    }

    try {
        // Подсчитываем количество документов с данным question_id
        const count = await View.countDocuments({ question_id });

        // Возвращаем успешный ответ с числом просмотров
        res.status(200).json({ question_id, count });
    } catch (error) {
        console.error(error); // Логируем ошибку
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET запрос для получения общего количества просмотров
router.get('/api/view/total', async (req, res) => {
    try {
        // Подсчитываем общее количество документов в коллекции View
        const totalViews = await View.countDocuments();

        // Возвращаем успешный ответ с общим числом просмотров
        res.status(200).json({ totalViews });
    } catch (error) {
        console.error(error); // Логируем ошибку
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
