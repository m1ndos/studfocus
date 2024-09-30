const { Router } = require('express');
const User = require('../models/users'); // Импортируем модель
const router = Router();

// POST-запрос для регистрации пользователя
router.post('/api/registration', async (req, res) => {
    try {
        console.log(req.body);
        // Получаем данные из тела запроса
        const { firstname, lastname, login, password } = req.body;
        
        // Проверка на наличие всех обязательных полей
        if (!firstname || !lastname || !login || !password) {
            return res.status(400).json({ message: 'Заполните все поля!' });
        }

        // Создаем нового пользователя
        const newUser = new User({
            firstname,
            lastname,
            login,
            password
        });

        // Сохраняем пользователя в базу данных
        await newUser.save();

        // Отправляем успешный ответ
        res.status(201).json({ message: 'Пользователь успешно зарегистрирован!' });
    } catch (error) {
        // В случае ошибки отправляем сообщение об ошибке
        res.status(500).json({ message: 'Ошибка при регистрации пользователя', error: error.message });
    }
});

module.exports = router;
