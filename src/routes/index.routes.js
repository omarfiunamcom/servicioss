const {Router}=require('express');
const { renderIndex, renderAbout,renderActivities, renderJoinUp} = require('../controllers/indexController');
const router=Router();

router.get('/',renderIndex);
router.get('/about',renderAbout);
router.get('/activities',renderActivities);
router.get('/joinUp',renderJoinUp)
module.exports=router;