const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path:'./db.env'});

// const dbURI = process.env.CLOUD_DB_URI;
const dbURI = "mongodb+srv://drbao79:sGrhLqNuO6zUJuYX@cluster0.5qzol.mongodb.net/temp?retryWrites=true&w=majority&appName=Cluster0"

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