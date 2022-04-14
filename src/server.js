const express = require('express');
const session = require('express-session')
const flash=require('connect-flash')
const path = require('path')
const exphbs=require('express-handlebars')




//initialitation
const app=express();




//settings

app.set('port',process.env.PORT||5000);

app.set('views',path.join(__dirname,'views'));
// enable handlebars as view
app.engine('.hbs',exphbs.engine({
    defaultLayout:'main',
    layoutsDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname:'.hbs'
}));
app.set('view engine','.hbs')


//Middlewares

app.use(express.urlencoded({extended:true}));
app.use(
    session({
        secret:'secreto',
        resave:true,
        saveUninitialized:true,
    })
);

//alerts and flash messages
app.use(flash())

//Global variables

//Routes

app.use(require('./routes/index.routes'));
app.use(require('./routes/user.routes'))
//static files

app.use(express.static(path.join(__dirname,'public')));

module.exports=app;