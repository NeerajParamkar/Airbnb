
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
        favourites.push(homeId); 
        fs.writeFile(favouriteDataPath, JSON.stringify(favourites), callback);
      }
    });
  }

  static postgetfavourites(callback) {
    fs.readFile(favouriteDataPath, (err, data) => {
      try {
        callback(!err && data.length > 0 ? JSON.parse(data) : []);
      } catch (error) {
        callback([]);
      }
    });
  }

   static deletebyId(delhomeId,callback){
    Favourite.postgetfavourites(homesIds=>{
      homesIds=homesIds.filter(homeId=> delhomeId !== homeId);
        fs.writeFile(favouriteDataPath,JSON.stringify(homesIds),callback);
      })
    }
};
