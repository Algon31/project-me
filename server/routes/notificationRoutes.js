const express=require("express");

const router=express.Router();

const auth=require("../middleware/authMiddleware");

const getNotifications=
require("../controllers/notification/getNotifications");

router.use(auth);

router.get("/",getNotifications);

module.exports=router;