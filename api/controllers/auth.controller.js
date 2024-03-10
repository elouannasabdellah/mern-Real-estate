import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import  jwt  from "jsonwebtoken";

export const signup= async(req, res, next)=>{

    const { username , email,password }= req.body;
    if (!username || username === "") {
        next(errorHandler(400, "le champ username est obligatoire !" ))
        return;
      }
      if (!email || email === "") {x
        next(errorHandler(400, "le champ email est obligatoire !" ))
        return;
      }
      if (!password || password === "" || password.length < 8) {
        next(errorHandler(400, "le champ password est vide ou bien saisir plus que 8 caracters !" ))
        return;
      }
      
    const hasedPassword = bcryptjs.hashSync(password , 10);
    const newUser= new User({username, email, password:hasedPassword });
    try{
        await newUser.save();
        res.status(201).json("User Created successfully");
    } catch(error){
        // res.status(500).json(error.message) 
        next(error);
    }
   

}

export const login= async(req, res ,next)=>{
    const { email, password}= req.body;

    try{
        const validateUser= await User.findOne({email});
        if(!validateUser ) return next(errorHandler(404, "User Not found") );
        const validatPssword= bcryptjs.compareSync(password, validateUser.password);
        if(!validatPssword) return next(errorHandler(404, "Invalid Password or Email"));

        const token = jwt.sign( { id: validatPssword._id}, process.env.JWT_SECRET );
        const { password: pass, ...rest }=validateUser._doc;

        res.
        cookie("access_token", token , {httpOnly:true} )
        .status(200)
        .json(rest);

    }catch(err){
        next(err)

    }

}

export const google=async(req,res, next)=>{

    try{
        const user= await User.findOne({email:req.body.email})
        if(user){
            const token= jwt.sign( {id:user._id}, process.env.JWT_SECRET );
            const { password: pass, ...rest }= user._doc;
            res.
               cookie("access_token", token , {httpOnly:true} )
              .status(200)
              .json(rest);
        }else{
            const generatedPassword= Math.random().toString(36).slice(-8);
            const hashedPassword= bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({ username:req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
            email:req.body.email, password:hashedPassword, avatar: req.body.photo });

            await newUser.save();
            const token = jwt.sign( { id: newUser._id}, process.env.JWT_SECRET );
            const { password :pass, ...rest}= newUser._doc;
            res.cookie('access_token',token , {httpOnly:true} )
            .status(200)
            .json(rest)

        } 

    }catch(error){
        next(error)
    }

}