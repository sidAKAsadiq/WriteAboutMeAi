import { User } from '../models/user.models.js'
import { api_error } from '../utils/api_error.js'
import { api_response } from '../utils/api_response.js'
import { async_handler } from '../utils/async_handler.js'

const generate_access_and_refresh_tokens = async function(user_obj) {
    const access_token = user_obj.generate_access_token()
    const refresh_token = user_obj.generate_refresh_token()

    user_obj.refresh_token = refresh_token

    await user_obj.save({validateBeforeSave : false})

    return {access_token , refresh_token} 
}


const register_user = async_handler(async (req, res) => {
    const {username, email, password} = req.body
    console.log("username in reg", username);
    console.log("email in reg", email);
    console.log("password in reg", password);
    

    if([username, email, password].some((field) => (field?.trim === ""))){
        return res.status(400).json(new api_error(400 , "All fields are required!", "All fields are required!"))
    }

    //checking if user already exisist or not
    
    const user_already_exsist = await User.findOne({
        $or : [{username} , {email}]
    })

    
    
    if(user_already_exsist){
        return res.status(201).json(new api_response(200 , user_already_exsist , "User already exsist!"))
    }


    
    const new_user = await User.create({
        username,
        email,
        password,
    })    
    
    if(!new_user){
        return res.status(400).json(new api_error(400 , "Unable to register new user", "Unable to register new user"))
    }


    return res.status(201).json(new api_response(200 , new_user  , "User registered successfully!"))

})


const login_user = async_handler(async(req , res) => {
    const {username_or_email , password} = req.body

    console.log("username or emial" , username_or_email);
    console.log("pas" , password);
    

    const does_user_exist = await User.findOne({
        $or : [{username : username_or_email} , {email : username_or_email}]
    })

    if(!does_user_exist){
        console.log("User nahi hai");
        return res.status(400).json(new api_error(400 , "User with given username or email does not exists!","User with given username or email does not exists!"))
    }

    const match_password = await does_user_exist.check_password(password)

    if(!match_password){
        return res.status(400).json(new api_error(400 , "Invalid Password!" , "Invalid Password!"))
    }

    const {access_token , refresh_token} = await generate_access_and_refresh_tokens(does_user_exist)

    does_user_exist.refresh_token = undefined
    does_user_exist.password = undefined

    //cookie settings
    const options = {
        httpOnly : true,
        secure : true,
    }    

    return res.status(200).cookie('access_token' , access_token , options).cookie("refresh_token" , refresh_token, options).json(new api_response(200 , does_user_exist , "User logged in successfully"))


})


const logout_user = async_handler(async(req,res) => {
    console.log("In logout");
    
    const logged_out_user = await User.findByIdAndUpdate( req.user._id  ,
        {
        $set : {
            refresh_token : undefined
        }
        },
        {
            new : true
        }
)


const options = {
    httpOnly : true,
    secure : true,
}

return res.status(200).clearCookie("access_token" , options).clearCookie("refresh_token" , options).json(new api_response(200 , logged_out_user , "Logout successfull!"))
})


const get_current_user = async_handler(async(req,res) => {
    console.log("In get current user");
    const current_user = await User.findById(req?.user?._id)
    if(!current_user){
        return res.status(500).json(new api_error(500, null , "Current user NOT found!"))
    }
    return res.status(200).json(new api_response(200, current_user , "Current user found!"))
})


export {
    register_user,
    login_user,
    logout_user,
    get_current_user,
}