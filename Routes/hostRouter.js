const express=require('express');
const path=require('path');
const hostRouter=express.Router();

const addedhome=require("../controllers/host");

hostRouter.get("/host/home-page",addedhome.getAddedHome);
hostRouter.post("/host/home-page",addedhome.postAdded);
hostRouter.get("/host/host-home-list",addedhome.getHomelist );
hostRouter.get("/host/edit-home/:homeId",addedhome.getedithome );
hostRouter.post("/host/edit-home/",addedhome.postedithome);

// exports.hostRouter=hostRouter;
module.exports=hostRouter;