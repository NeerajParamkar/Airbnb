
const Home = require('../Models/homemain');
const favourite = require('../Models/favourite');

exports.getHomes=(req,res,next)=>{
  Home.fetchall((registeredHouses)=> res.render('store/home-list',{registeredHouses:registeredHouses,title:'Home',currentpage:"Home Lists"})
);
};

exports.getindex=(req,res,next)=>{
  Home.fetchall((registeredHouses)=> res.render('store/index',{registeredHouses:registeredHouses,title:'Index',currentpage:"Airbnb"})
);
};

exports.getbookings=(req,res,next)=>{
 res.render('store/booking',{title:'My Bookings',currentpage:"Bookings"});
};


exports.getfavouritelist = (req, res, next) => {
  favourite.postgetfavourites((favourites) => { 
    Home.fetchall((registeredHouses) => {
      const favouratehomesdetaisl = registeredHouses.filter(home => favourites.includes(home.id));
      res.render("store/favourite-list", {
        favouratehomesdetaisl: favouratehomesdetaisl,
        title: 'My favourites',currentpage:"Favourite"
      });
    });
  });
};






exports.getHomeDetails=(req,res,next)=>{
  const homeId = req.params.homeId;
  console.log("Id of home details page",homeId);
  Home.findById(homeId,homes=>{
    if(!homes){
      res.redirect("/home")
    }
    else {
  res.render('store/home-details',{home:homes,title:'home details',currentpage:"Bookings"});
}
  })
};

exports.postaddtofavourite=(req,res,next)=>{
  console.log("Added to favourite ",req.body);
  favourite.addtofavourite(req.body.homeId,error=>{
    if(error){
      console.log("Error while adding favourite");
    }
    res.redirect("/favourite-list");
  })
  
}
exports.postremovefromfavourite=(req,res,next)=>{
  const homeId=req.params.homeId;
  favourite.deletebyId(homeId,error=>{
    if(error){
      console.log("Error while deleting favourite",error);
    }
    res.redirect("/favourite-list");
    
  })
    
}






