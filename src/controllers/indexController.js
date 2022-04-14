const indexController={}
indexController.renderIndex=(req,res)=>{
    res.render('index',{namePage:'Universo FONO'});
}
indexController.renderAbout=(req,res)=>{
    res.render('about',{namePage:'Acerca de nosotros'});
}
indexController.renderActivities=(req,res)=>{
    res.render('activities',{namePage:'Nuestras actividades'});
}
indexController.renderJoinUp=(req,res)=>{
    res.render('joinUp',{namePage:'Unete a la familia FONO'});
}

module.exports=indexController;