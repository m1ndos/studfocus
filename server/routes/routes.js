const { Router } = require('express');
const User = require('../models/users'); // Импортируем модель
const router = Router();

// POST-запрос для регистрации пользователя
router.post('/api/user/registration', async (req, res) => {
    try {
        console.log(req.body);

        const { firstname, lastname, login, password } = req.body;

        // Проверка на наличие всех обязательных полей
        if (!firstname || !lastname || !login || !password) {
            return res.status(400).json({ message: 'Заполните все поля!' });
        }

        // Проверка на существующего пользователя
        const existingUser = await User.findOne({ login });
        if (existingUser) {
            return res.status(400).json({ message: 'Пользователь с таким логином уже существует!' });
        }

        // Создаем нового пользователя
        const newUser = new User({
            firstname,
            lastname,
            login,
            password // Сохраняем пароль в открытом виде (небезопасно)
        });

        // Сохраняем пользователя в базу данных
        await newUser.save();

        res.status(201).json({ message: 'Пользователь успешно зарегистрирован!' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при регистрации пользователя', error: error.message });
    }
});

// POST-запрос для входа пользователя
router.post('/api/user/signin', async (req, res) => {
    try {
        const { login, password } = req.body;

        // Проверка на наличие логина и пароля
        if (!login || !password) {
            return res.status(400).json({ message: 'Заполните логин и пароль' });
        }

        // Ищем пользователя по логину
        const user = await User.findOne({ login });
        if (!user) {
            return res.status(400).json({ message: 'Неверный логин или пароль' });
        }

        // Проверяем совпадение пароля
        if (user.password !== password) {
            return res.status(400).json({ message: 'Неверный логин или пароль' });
        }

        // Если логин и пароль совпадают, отправляем успешный ответ
        res.status(200).json({ message: 'Вход успешен', userId: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при входе', error: error.message });
    }
});

module.exports = router;
