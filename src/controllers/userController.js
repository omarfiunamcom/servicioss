const Users = require("../models/Users");
const {validationResult}=require('express-validator')
const {nanoid} = require('nanoid');
const { render } = require("express/lib/response");
const userController={}

userController.renderSignUpForm=(req,res)=>{
    res.render('users/signUp',{error_msg:req.flash("error_msg")});
}

userController.registerUser=async(req,res)=>{

    const errors=validationResult(req)
    if(!errors.isEmpty()){
        req.flash("error_msg",errors.array())
        return res.redirect('/users/signUp')
    }

    const {name,email,password}=req.body;
    try{
        let user=await Users.findOne({email:email});
        if(user) throw new Error('El usuario ya existe');
        user= new Users({name:name,email:email,password:password,tokenConfirm:nanoid()});
        await user.save();


        req.flash("aviso_msg",[{msg:"Revisa tu correo electronico y valida tu cuenta"}])
        
        return res.redirect('/users/logIn')
    }catch(error){
        req.flash("error_msg",[{msg:error.message}]);
        return res.redirect("/users/signUp")
    }
}

userController.accountConfirm = async (req,res)=>{
    const {token}=req.params;
    try {
        const user = await Users.findOne({tokenConfirm:token});
        if(!user) throw new Error('Usuario no existe ');

        user.accountConfirm = true;
        user.tokenConfirm = null;

        await user.save();

        req.flash('aviso_msg',[{msg:'cuenta verificada'}]);
        return res.redirect('/users/logIn');
    } catch (error) {
        req.flash('error_msg',[{msg:error.message}]);
        return res.redirect('/users/logIn')
    }
}
userController.renderSiginForm = (req,res)=>{
    res.render('users/logIn',{error_msg:req.flash("error_msg"),aviso_msg:req.flash('aviso_msg')});
}
userController.loginUser = async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        req.flash("error_msg",errors.array())
        return res.redirect('/users/logIn')
    }

    const {email,password} = req.body;
    try {
        const user = await Users.findOne({email});
        if(!user) throw new Error('El usuario no existe');

        if(!user.accountConfirm) throw new Error('Falta confirmar la cuenta')

        if(!await user.comparePassword(password)) throw new Error('Contrasena incorrecta')


        // res.render('users/profile',{name:user.name,email:user.email,date:user.date})
        // console.log(user.name)
        res.redirect('/users/profile')
    } catch (error) {
        req.flash("error_msg",[{msg:error.message}]);
        return res.redirect("/users/logIn")
    }
}

userController.renderProfile=(req,res) => {
    res.render('users/profile',{name:user.name})
    console.log()
}

module.exports=userController;