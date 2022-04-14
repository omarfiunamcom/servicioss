const {Router} = require('express');
const { 
        renderSiginForm, 
        renderSignUpForm, 
        registerUser, 
        accountConfirm, 
        loginUser,
        renderProfile
    } = require('../controllers/userController');
const router = Router();
const {body} = require('express-validator')

router.get('/users/signUp',renderSignUpForm);
router.post(
    '/users/signUp',
    [
        body("name","ingrese un nombre valido")
            .trim()
            .notEmpty()
            .escape(),
        body("email","Ingrese un email valido")
            .trim()
            .isEmail()
            .normalizeEmail(),
        body("password","Ingrese contrasena de minimo 6 caracteres")
            .trim()
            .isLength({min:6})
            .escape()
            .custom((value,{req})=>{
                if(value !== req.body.confirm_password){
                    throw new Error("Contrasenas no coinciden")
                } else{
                    return value;
                }
            })
    ],registerUser);

router.get('/users/confirmAccount/:token',accountConfirm);
router.get('/users/logIn',renderSiginForm);
router.post(
    '/users/logIn',
    [
        body("email","Ingrese un email valido")
            .trim()
            .isEmail()
            .normalizeEmail(),
        body("password","Ingrese contrasena de minimo 6 caracteres")
            .trim()
            .isLength({min:6})
            .escape()
    ],loginUser)

router.get('/users/profile',renderProfile)    

module.exports=router;