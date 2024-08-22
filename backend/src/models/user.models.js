import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const user_schema = new mongoose.Schema({
    username : {
        type: String,
        required : true,
        unique : true,
        index : true,
    },
    email : {
        type: String,
        required : true,
        unique : true,
        lowercase : true,
    },
    password : {
        type: String,
        required: [true,  "Password is required!"]
    },
    refresh_token : {
        type: String,
    },
    LinkedIn_url : {
        type: String,
        default : "",
    },
    about_me_history : [
        {
            type: String,
            default: ""
        }
    ]

} , {timestamps : true}) 


//jab bhi password save kro, encrypted form may save karo
user_schema.pre('save' , async function (next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password , 12)
        next()
    }
    else{
        return next()
    }
})

//Custom methods for password check and token generation
user_schema.methods.check_password = async function (password) {
    return await bcrypt.compare(password, this.password)
}

user_schema.methods.generate_access_token = function (){
    return jwt.sign(
        {   
            id: this._id,
            email: this.email,
            username: this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

user_schema.methods.generate_refresh_token = function (){
    return jwt.sign(
        {
            id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


user_schema.plugin(mongooseAggregatePaginate)

export const User = mongoose.model('User' , user_schema)