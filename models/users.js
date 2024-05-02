import mongoose from 'mongoose';

// Create a user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'faculty', 'admin'],
        required: true
    }
});


// Create a user model
const user = mongoose.model('User', userSchema);

export default user;