const { Router } = require('express');
const User = require('../models/users');
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
            password
        });

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

router.post('/api/user/info', async (req, res) => {
    try {
        const { userId } = req.body; // Получаем userId из тела запроса
        
        // Проверка на наличие userId
        if (!userId) {
            return res.status(400).json({ message: 'Отсутствует ID пользователя' });
        }
        
        // Ищем пользователя по ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        // Отправляем данные пользователя
        res.status(200).json({
            message: 'Данные пользователя успешно получены',
            user: {
                firstname: user.firstname,
                lastname: user.lastname,
                login: user.login
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении данных пользователя', error: error.message });
    }
});

// Обработчик POST-запроса для изменения информации о пользователе
router.post('/api/user/change-info', async (req, res) => {
    try {
        const { userId, firstName, lastName } = req.body;

        // Проверка на наличие всех обязательных полей
        if (!userId || !firstName || !lastName) {
            return res.status(400).json({ message: 'Заполните все поля!' });
        }

        // Поиск пользователя по userId и обновление имени и фамилии
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { firstname: firstName, lastname: lastName },
            { new: true } // Возвращаем обновленного пользователя
        );

        // Проверка, существует ли пользователь
        if (!updatedUser) {
            return res.status(404).json({ message: 'Пользователь не найден!' });
        }

        res.status(200).json({ message: 'Информация о пользователе успешно обновлена!', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при обновлении информации о пользователе', error: error.message });
    }
});

// Маршрут для смены пароля
router.post('/api/user/change-password', async (req, res) => {
  const { userId, currentPassword, newPassword, confirmPassword } = req.body;

  try {
    // Проверка на заполненность полей
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: 'Заполните все поля!' });
    }

    // Найдем пользователя по ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден!' });
    }

    // Проверка на совпадение текущего пароля
    if (user.password !== currentPassword) {
      return res.status(400).json({ message: 'Неверный текущий пароль!' });
    }

    // Проверка, что новый пароль и подтверждение совпадают
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Новый пароль и подтверждение не совпадают!' });
    }

    // Проверка на то, что новый пароль отличается от текущего
    if (currentPassword === newPassword) {
      return res.status(400).json({ message: 'Новый пароль не должен совпадать с текущим паролем!' });
    }

    // Обновляем пароль пользователя
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Пароль успешно изменен!' });
  } catch (error) {
    console.error('Ошибка при смене пароля:', error);
    res.status(500).json({ message: 'Ошибка сервера при смене пароля', error: error.message });
  }
});


module.exports = router;
