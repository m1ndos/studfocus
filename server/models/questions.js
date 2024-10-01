const { Schema, model } = require('mongoose');

const schema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    image: {
        type: Buffer,
        required: false
    },
    views_count: {
        type: Number,
        default: 0,
        required: false
    },
    comments_count: {
        type: Number,
        default: 0,
        required: false
    },
    date: {
        type: Date, // Тип данных для date
        default: Date.now, // Устанавливает текущее время по умолчанию
        required: false
    }
});

module.exports = model('questions', schema);
