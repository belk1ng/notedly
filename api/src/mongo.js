import mongoose from 'mongoose'

export const connectToDataBase = async (DB_HOST) => {
    await mongoose.connect(DB_HOST);
    mongoose.connection.on('error', (err) => {
        console.error(err);
        console.log('MongoDB connection error. Please make sure MongoDB is running.');
    })
}

export const closeConnection = async () => {
    await mongoose.connection.close()
}