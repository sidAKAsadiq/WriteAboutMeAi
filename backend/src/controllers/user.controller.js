import { User } from '../models/user.models.js'
import { api_error } from '../utils/api_error.js'
import { api_response } from '../utils/api_response.js'
import { async_handler } from '../utils/async_handler.js'

const generate_access_and_refresh_tokens = async_handler(async function(user_obj) {
    const access_token = user_obj.generate_access_token()
    const refresh_token = user_obj.generate_refresh_token()

    user_obj.refresh_token = refresh_token

    await user_obj.save({validateBeforeSave : false})

    return {access_token , refresh_token} 
})


const register_user = async_handler(async (req, res) => {
    const {username, email, password} = req.body
    console.log("username in reg", username);
    console.log("email in reg", email);
    console.log("password in reg", password);
    

    if([username, email, password].some((field) => (field?.trim === ""))){
        return api_error(400 , "All fields are required!")
    }

    //checking if user already exisist or not
    
    const user_already_exsist = await User.findOne({
        $or : [{username} , {email}]
    })

    if(user_already_exsist){
        return api_error(400 , "User with given credentials already exsist!")
    }


    
    const new_user = await User.create({
        username,
        email,
        password,
        refresh_token,
    })    
    
    if(!new_user){
        return api_error(500 , "Unable to register new user")
    }

    const {refresh_token} = generate_access_and_refresh_tokens(new_user)

    return res.status(201).json(new api_response(200 , new_user  , "User registered successfully!"))

})


export {
    register_user,
}