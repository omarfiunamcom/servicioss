const {src,dest,watch,parallel}=require('gulp');



//css
const sass= require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');


function css(done) {
    //Identificar el archivo .SCSS a compilar
    src('src/scss/app.scss')
        .pipe(plumber())
        .pipe(sass())//compilar
        .pipe(dest('src/public/css'))//almacenarlo
    done();
}

//watch para gulp

function dev(done) {
    watch('src/scss/**/*.scss',css)
    done();
}

exports.css=css;
exports.dev=dev;