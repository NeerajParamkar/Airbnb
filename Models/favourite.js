
// const fs = require('fs');
// const path = require('path');
// const rootdir = require('../utils/pathUtils'); 
// // const { homedir } = require('os');

// const favouriteDataPath=path.join(rootdir,"data","favourite.JSON");

// module.exports = class favourite {
//   static addtofavourite(homeId,callback){
//     favourite.getfavourites((favourites) => {
       
//       if(favourites.includes(homeId)){
//         callback("Allready present")
//         console.log("All ready present");
//       }
//       else{
//         favourites.push(this);
//         fs.writeFile(favouriteDataPath, JSON.stringify(favourites), callback);
//       }
//         });
//   }
  
//   static getfavourites(callback){
//     fs.readFile(favouriteDataPath,(err,data)=>{
//       callback(!err ? JSON.parse(data) : []);
//     })
//   }
// };



const fs = require('fs');
const path = require('path');
const rootdir = require('../utils/pathUtils'); 

const favouriteDataPath = path.join(rootdir,'data', 'favourites.json');

module.exports = class Favourite {
  static addtofavourite(homeId, callback) {
    Favourite.postgetfavourites((favourites) => {
      if (favourites.includes(homeId)) {
        callback("Already present");
      } else {
        favourites.push(homeId); // Push homeId, not `this`
        fs.writeFile(favouriteDataPath, JSON.stringify(favourites), callback);
      }
    });
  }

  static postgetfavourites(callback) {
    fs.readFile(favouriteDataPath, (err, data) => {
      try {
        callback(!err && data.length > 0 ? JSON.parse(data) : []);
      } catch (error) {
        callback([]); // Return an empty array if parsing fails
      }
    });
  }
};
