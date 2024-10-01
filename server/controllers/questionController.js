const { Router } = require('express');
const multer = require('multer');
const Question = require('../models/questions'); // Импортируем модель
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

router.get('/api/question/get-image/:id', async (req, res) => {
    
});


module.exports = router;
