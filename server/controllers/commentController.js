const { Router } = require('express');
const multer = require('multer');
const router = Router();
const Question = require('../models/questions'); 
const Comment = require('../models/comments');  
const User = require('../models/users')

// Настройка multer для обработки файлов
const storage = multer.memoryStorage(); 
const upload = multer({ storage });

// Обработчик для создания комментария
router.post('/api/comment/create', upload.single('image'), async (req, res) => {
    try {
        const { user_id, question_id, text } = req.body;
        const image = req.file ? req.file.buffer : null; // Если есть файл, сохраняем его как buffer
        
        // Находим пользователя по user_id, чтобы получить имя и фамилию
        const user = await User.findById(user_id).select('firstname lastname');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Создаем новый комментарий
        const newComment = new Comment({
            user_id,
            question_id,
            text,
            likes_count: 0,
            image,
            date: Date.now(),
        });

        // Сохраняем комментарий в базу данных
        await newComment.save();

        // Обновляем вопрос: добавляем ID комментария и увеличиваем счетчик комментариев
        await Question.findByIdAndUpdate(question_id, {
            $push: { comments: newComment._id }, // Добавляем ID комментария в массив comments вопроса
            $inc: { comments_count: 1 } // Увеличиваем comments_count на 1
        });

        // Форматируем дату как день.месяц.год
        const formattedDate = new Date(newComment.date).toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });

        // Добавляем поле autor с именем и фамилией пользователя
        const responseComment = {
            ...newComment.toObject(), // Преобразуем документ в объект
            autor: `${user.firstname} ${user.lastname}`, // Имя и фамилия пользователя
            date: formattedDate, // Форматированная дата
            imageUrl: newComment.image ? `http://localhost:4000/api/comment/image/${newComment._id}` : null, // Ссылка на изображение
        };

        res.status(201).json({ message: 'Comment added successfully!', comment: responseComment });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Error adding comment', error });
    }
});

// Обработчик для удаления комментария
router.post('/api/comment/delete', async (req, res) => {
    try {
        const { comment_id } = req.body;

        // Найти комментарий
        const comment = await Comment.findById(comment_id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        const { question_id } = comment;

        // Удалить комментарий
        await Comment.findByIdAndDelete(comment_id);

        // Обновить вопрос: удалить ID комментария из массива comments и уменьшить счетчик комментариев
        await Question.findByIdAndUpdate(question_id, {
            $pull: { comments: comment_id }, // Удаляем ID комментария из массива
            $inc: { comments_count: -1 }    // Уменьшаем comments_count на 1
        });

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ message: 'Error deleting comment', error });
    }
});


// Обработчик для получения всех комментариев по question_id
router.post('/api/comment/get-by-question-id', async (req, res) => {
    try {
        const { question_id } = req.body; 

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
                imageUrl: comment.image ? `http://localhost:4000/api/comment/image/${comment._id}` : null, // Ссылка на изображение
            };
        }));

        res.status(200).json({ comments: commentsWithAuthor }); // Отправляем комментарии с автором, изображением и отформатированной датой
    } catch (error) {
        console.error('Error retrieving comments:', error);
        res.status(500).json({ message: 'Error retrieving comments', error });
    }
});


// Обработчик для получения изображения по id комментария
router.get('/api/comment/image/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Находим комментарий по ID
        const comment = await Comment.findById(id);

        if (!comment || !comment.image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        // Отправляем изображение
        res.set('Content-Type', 'image/png'); // Устанавливаем тип контента, предполагая, что изображение в формате PNG
        res.send(comment.image); // Отправляем изображение как бинарные данные
    } catch (error) {
        console.error('Error retrieving image:', error);
        res.status(500).json({ message: 'Error retrieving image', error });
    }
});

module.exports = router;
