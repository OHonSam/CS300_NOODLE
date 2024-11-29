const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path:'./.env'});

const dbURI = process.env.CLOUD_DB_URI;

async function connect() {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB Atlas successfully!');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
}

module.exports = { connect };