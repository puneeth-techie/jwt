import mongoose from 'mongoose'
import dotenv from 'dotenv'

const url = process.env.DB_URL

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log(`Connected to the DB: ${conn.connection.host}`)
    }catch(err){
        console.log(`Failed to connect: ${err.message}`)
        process.exit(1)
    }
}

export default connectDB