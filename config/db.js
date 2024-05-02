import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('Connected to database');
    } catch (err) {
        console.log(err);
    }
};

export default connect;