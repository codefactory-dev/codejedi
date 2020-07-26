
const mongoose = require('mongoose');

const connectDB = async () => {
    const connection = await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        bufferCommands: false,
        bufferMaxEntries: 0
      });
    const db = mongoose.connection;
    
    //console.log(`connected to ${process.env.MONGODB_URL}`);

    return {connection, db};
};

const disconnectDB = async () => mongoose.disconnect();

module.exports = {connectDB, disconnectDB};