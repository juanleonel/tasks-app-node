import mongoose from 'mongoose';

const TasksSchema = new mongoose.Schema({
    id: mongoose.ObjectId,
    title: { type: String, required: true },
    description: { type: String, required: true },
    done: false,
    created_at: Date,
    updated_at: Date
});
module.exports = mongoose.model('Tasks', TasksSchema);
