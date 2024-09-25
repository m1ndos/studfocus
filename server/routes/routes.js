const { Router } = require('express');
const models = require('../models/models');
const router = Router();

// Пример GET-запроса
router.get('/', async (req, res) => {
    const models = await models.find({})
});

// Пример POST-запроса
router.post('/api/data', (req, res) => {
    const { name } = req.body;
    res.json({ message: `Hello, ${name}` });
});

module.exports = router;
