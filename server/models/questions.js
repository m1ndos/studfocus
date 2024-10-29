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
    comments: {
        type: [String],
        default: []
    },
    best_comment_id: {
        type: String,
        required: false
    },
    date: {
        type: Date, 
        default: Date.now,
        required: false
    }
});

module.exports = model('questions', schema);
