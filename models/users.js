import mongoose from 'mongoose';

const UsersSchema = new mongoose.Schema({
    id: mongoose.ObjectId,
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    enable: false,
    created_at: Date,
    updated_at: Date
});
module.exports = mongoose.model('Users', UsersSchema);
