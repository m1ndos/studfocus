const { Router } = require('express');
const models = require('../models/models'); // Импортируем модель
const router = Router();

// Пример GET-запроса
router.get('/', async (req, res) => {
    res.json({ message: 'Hello, world' });
});

// Пример POST-запроса для добавления данных в MongoDB с ответом об успешности
router.post('/api/data', async (req, res) => {
    try {
        const { title, completed } = req.body;

        // Проверяем, передан ли обязательный параметр title
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        // Создаем новый документ в базе данных
        const newModel = await models.create({
            title,
            completed: completed || false // Если completed не передан, используется значение по умолчанию
        });

        // Возвращаем сообщение об успешной операции и добавленные данные
        res.status(201).json({ 
            message: 'Data successfully added', 
            data: newModel 
        });
    } catch (error) {
        // Обработка ошибок и отправка сообщения об ошибке
        console.error('Error creating new model:', error);
        res.status(500).json({ 
            message: 'Failed to add data', 
            error: error.message 
        });
    }
});

module.exports = router;
