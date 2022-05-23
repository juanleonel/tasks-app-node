const mongoose = require('mongoose');

const TasksSchema = new mongoose.Schema({
    _id: mongoose.ObjectId,
    title: { type: String, required: true },
    description: { type: String, required: true },
    done: false,
    created_at: Date,
    updated_at: Date,
    user: {
        _id: String,
        name: String
    }
});
module.exports = mongoose.model('Tasks', TasksSchema);
