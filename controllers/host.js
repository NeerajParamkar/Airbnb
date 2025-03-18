
const Home = require('../Models/homemain');

exports.getAddedHome = (req,res,next)=>{
  res.render('host/edit-home',{title:'Add Home',editing:false,currentpage:"Add Home"});
};

exports.getedithome = (req,res,next)=>{
  const homeId=req.params.homeId;
  const editing=req.query.editing === 'true';
  Home.findById(homeId,(home) =>{
    if(!home){
      console.log("Home not found for editing");
      return res.redirect("/host/host-home-list");
    }

  // console.log(homeId,editing,home);

     res.render('host/edit-home',{home:home,title:'Edit home',editing:"editing",currentpage:"Add Home"});
  })
  
};



exports.getHomelist=(req,res,next)=>{
  Home.fetchall((registeredHouses)=> res.render('host/host-home-list',{registeredHouses:registeredHouses,title:'Host Home list',currentpage:"Host Homes"})
);
};



exports.postAdded=(req,res,next)=>{
  const {hostname,price,Location,Rating, photo}=req.body;
  const home=new Home(hostname,price,Location,Rating, photo);
  home.save();
  res.render('host/HomeAdded',{title:'Add Home',currentpage:"Add Home"});
};

exports.postedithome=(req,res,next)=>{
  const {id,hostname,price,Location,Rating, photo}=req.body;
  const home=new Home(hostname,price,Location,Rating, photo);
  home.id=id;
  home.save();
  res.redirect('/host/host-home-list');
};
