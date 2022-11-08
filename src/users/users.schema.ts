import { Schema, models, model } from "mongoose";




const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true },
    isAdmin:{type:Boolean,required:true, default:false}
}, { timestamps: true })


const UserModel = models.UserModel || model("UserModel", UserSchema)

export default UserModel