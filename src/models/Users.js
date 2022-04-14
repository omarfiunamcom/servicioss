const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    tokenConfirm:{
        type:String,
        default:null,
    },
    accountConfirm:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date,
        default:Date.now
    }
    },
    {
        timestamps:true,
    }
);

userSchema.pre('save',async function (next) {
    const user=this
    if(!user.isModified('password'))
    return next()  
    try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(user.password,salt)
        user.password=hash;
        next();
    } catch (error) {
        console.log(error)
        next();
    }
});

userSchema.methods.comparePassword = async function (pass) {
    return await bcrypt.compare(pass,this.password)
}

module.exports=mongoose.model('User',userSchema)