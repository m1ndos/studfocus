const { Router } = require('express');
const multer = require('multer');
const router = Router();
const Question = require('../models/questions'); // Импортируем модель вопросов
const Comment = require('../models/comments');  // Импортируем модель комментариев
const User = require('../models/users')

// Настройка multer для обработки файлов
const storage = multer.memoryStorage(); // Хранит файл в памяти
const upload = multer({ storage });

// Обработчик для создания комментария
router.post('/api/comment/create', upload.single('image'), async (req, res) => {
    try {
        const { user_id, question_id, text } = req.body; // Получаем данные из запроса
        const image = req.file ? req.file.buffer : null; // Если есть файл, сохраняем его как buffer
        
        // Создаем новый комментарий
        const newComment = new Comment({
            user_id,
            question_id,
            text,
            likes_count: 0, // Изначально количество лайков 0
            image,
            date: Date.now(),
        });

        // Сохраняем комментарий в базу данных
        await newComment.save();

        // Обновляем вопрос, добавляя ID комментария в массив комментариев
        await Question.findByIdAndUpdate(question_id, {
            $push: { comments: newComment._id } // Добавляем ID комментария в массив comments вопроса
        });

        res.status(201).json({ message: 'Comment added successfully!', comment: newComment });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Error adding comment', error });
    }
});

// Обработчик для получения всех комментариев по question_id
router.post('/api/comment/get-by-question-id', async (req, res) => {
    try {
        const { question_id } = req.body; // Получаем question_id из тела запроса

        // Находим все комментарии для данного вопроса
        const comments = await Comment.find({ question_id });

        if (!comments.length) {
            return res.status(404).json({ message: 'No comments found for this question' });
        }

        // Промисы для получения информации о пользователе для каждого комментария
        const commentsWithAuthor = await Promise.all(comments.map(async (comment) => {
            // Находим пользователя по user_id
            const user = await User.findById(comment.user_id);
            
            // Форматируем дату в формат "день.месяц.год"
            const formattedDate = new Date(comment.date).toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            });

            // Формируем новое поле автор и добавляем его в объект комментария
            return {
                ...comment.toObject(),
                autor: user ? `${user.firstname} ${user.lastname}` : 'Unknown Author', // Добавляем имя и фамилию автора или 'Unknown Author' если пользователь не найден
                date: formattedDate, // Добавляем отформатированную дату
            };
        }));

        res.status(200).json({ comments: commentsWithAuthor }); // Отправляем комментарии с автором и отформатированной датой
    } catch (error) {
        console.error('Error retrieving comments:', error);
        res.status(500).json({ message: 'Error retrieving comments', error });
    }
});




module.exports = router;
