const mongoose=require('mongoose');
const DATABASE=process.env.DATABASE;


mongoose.connect(DATABASE,{
    useNewUrlParser:true,
})
    .then(db=>console.log('db is connected'))
    .catch(err=> console.error(err));