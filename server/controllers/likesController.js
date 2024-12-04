const { Router } = require('express');
const Like = require('../models/likes'); // Модель лайков
const User = require('../models/users'); // Модель пользователей
const Comment = require('../models/comments'); // Модель комментариев
const router = Router();

// POST запрос для создания лайка
router.post('/api/like/create', async (req, res) => {
    const { user_id, comment_id } = req.body; // Извлекаем данные из тела запроса

    // Проверяем, что все обязательные поля присутствуют
    if (!user_id || !comment_id) {
        return res.status(400).json({ error: 'user_id and comment_id are required' });
    }

    try {
        // Проверяем, существует ли пользователь
        const userExists = await User.findById(user_id);
        if (!userExists) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Проверяем, существует ли комментарий
        const commentExists = await Comment.findById(comment_id);
        if (!commentExists) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        // Проверяем, существует ли уже лайк с данным user_id и comment_id
        const existingLike = await Like.findOne({ user_id, comment_id });
        if (existingLike) {
            return res.status(409).json({ error: 'Like already exists for this user and comment' });
        }

        // Создаем новый документ лайка
        const newLike = new Like({
            user_id,
            comment_id
        });

        // Сохраняем лайк в базу данных
        await newLike.save();

        // Увеличиваем счетчик лайков в комментарии
        await Comment.findByIdAndUpdate(
            comment_id,
            { $inc: { likes_count: 1 } }, // Увеличиваем поле likes_count на 1
            { new: true } // Возвращаем обновленный документ (необязательно)
        );

        // Возвращаем успешный ответ
        res.status(201).json({ message: 'Like created successfully', like: newLike });
    } catch (error) {
        console.error(error); // Логируем ошибку
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
