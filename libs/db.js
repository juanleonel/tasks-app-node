const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/tododb');
        console.log('Success!');
    } catch (error) {
        console.log(error);
    }
}
module.exports = connectDB();
