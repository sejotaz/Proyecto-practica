import { connect } from "mongoose";

const { MONGODB } = process.env

export const connectionDB = async () => {
  try {
    const db = await connect(MONGODB)
    console.log(`DB connected to ${db.connection.name}`)
  } catch (e) {
    
  }
}