import mongoose from 'mongoose'

export const connectToDataBase = async (DB_HOST) => {
    mongoose.connection.on("connected", () => {
        console.log("✅ Successfully connected to MongoDB");
    });

    mongoose.connection.on('error', (err) => {
        console.log([
            '🚫 MongoDB connection error. Please make sure MongoDB is running.',
            err,
        ].join('\n'))
    })

    await mongoose.connect(DB_HOST);
}

export const closeConnection = async () => {
    await mongoose.connection.close()
}