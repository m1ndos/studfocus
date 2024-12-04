const {Schema, model} = require('mongoose');

const schema = new Schema({
    question_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
})

module.exports = model('views', schema)