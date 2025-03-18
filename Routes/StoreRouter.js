const express=require('express');
const path=require('path');

// const {registeredHouses}=require('./hostRouter');
const addedhome=require("../controllers/store");

const storeRouter=express.Router();

storeRouter.get("/",addedhome.getindex);
storeRouter.get("/booking",addedhome.getbookings);
storeRouter.get("/favourite-list",addedhome.getfavouritelist);
storeRouter.get("/home",addedhome.getHomes);
storeRouter.get("/homes/:homeId",addedhome.getHomeDetails);
storeRouter.post("/favourite-list",addedhome.postaddtofavourite);

module.exports=storeRouter;