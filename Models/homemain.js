
const fs = require('fs');
const path = require('path');
const rootdir = require('../utils/pathUtils'); 
const { error } = require('console');
const Favourite = require('./favourite');

const homeDataPath = path.join(rootdir, 'data', 'homes.json');

module.exports = class Home {
  constructor(hostname, price, Location, Rating, photo) {
    this.hostname = hostname;
    this.price = price;
    this.Location = Location;
    this.Rating = Rating;
    this.photo = photo;
  }

  save() {
    
    Home.fetchall(registeredHouses=>{
      if(this.id){
        registeredHouses=registeredHouses.map(homes=>
          homes.id===this.id ? this : homes
        );
      }
      else{
        this.id=Math.random().toString();
        registeredHouses.push(this);
      }
       
    
    fs.writeFile(homeDataPath, JSON.stringify(registeredHouses, null, 2), (err) => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log('File writing concluded');
      }
    });
    })
    
  }

  static fetchall(callback) {
    

    fs.readFile(homeDataPath, (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        callback([]); 
      } else {
        try {
          const homes = JSON.parse(data);
          callback(homes);
        } catch (parseErr) {
          console.error('Error parsing JSON:', parseErr);
          callback([]); 
        }
      }
    });
  }

  static findById(homeId,callback){
    this.fetchall(homes=>{
      const homeFound =homes.find(homes=>homes.id===homeId);
      callback(homeFound);
    })
  }
  static deletebyid(homeId,callback){
    this.fetchall(homes=>{
      homes=homes.filter(homes=> homes.id !== homeId);
      fs.writeFile(homeDataPath,JSON.stringify(homes),error=>{
        Favourite.deletebyId(homeId,callback);
      });
    })
  }
};
