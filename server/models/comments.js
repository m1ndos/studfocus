const { Schema, model } = require('mongoose');

const schema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    question_id: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    likes_count: {
        type: Number,
        required: false
    },
    image: {
        type: Buffer,
        required: false
    },
    date: {
        type: Date,
        default: Date.now, 
        required: true
    }
});

module.exports = model('comments', schema);