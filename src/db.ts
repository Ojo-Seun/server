import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()


const dbUrl = process.env.NODE_ENV === "production"?process.env.ATLAS_URL:process.env.LOCAL_MONGODB_URL
const connection = {
    isConnected:0
}

const connect = async () => {
    if (connection.isConnected) {
        return
    }

    if (mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState
        if (connection.isConnected === 1) {
            return
        }
        await mongoose.disconnect()
    }

    const db = await mongoose.connect(dbUrl!);

    connection.isConnected = db.connections[0].readyState
}

const disconnect = async () => {
    if (connection.isConnected) {
        if (process.env.NODE_ENV === 'production') {
            await mongoose.disconnect()
            connection.isConnected  = 0
        } else {
        }
    }
}

    const db = {connect,disconnect}
export default db



