import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js'

const connectDB = async () => {
    try {
        const connection_instance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("DB connected successfully, Current Host : ", connection_instance.connection.host);
    } catch (error) {
        console.log("Error connecting the Database : ",  error);
        process.exit(1)
    }
}

export default connectDB