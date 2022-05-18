import mongoose from 'mongoose';

const TasksSchema = new mongoose.Schema({
    id: mongoose.ObjectId,
    title:  String,
    done: false
});
module.exports = mongoose.model('Tasks', TasksSchema);
