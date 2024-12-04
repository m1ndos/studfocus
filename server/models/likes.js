const {Schema, model} = require('mongoose');

const schema = new Schema({
    comment_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
})

module.exports = model('likes', schema)