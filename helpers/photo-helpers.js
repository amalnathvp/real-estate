var db = require("../config/connection");
var collection = require("../config/collections");
const { response } = require("express");
var objectId = require("mongodb").ObjectID;

module.exports = {
    addPhoto: (photo, callback) => {
      //console.log(product);
  
      db.get()
        .collection("photo")
        .insertOne(photo)
        .then((data) => {
          // console.log(data.insertedId)
          callback(data.insertedId);
        });
    },
   
  
    getAllPhotos: () => {
      return new Promise(async (resolve, reject) => {
        let photos = await db
          .get()
          .collection(collection.PHOTO_COLLECTIONS)
          .find()
          .toArray();
        resolve(photos);
      });
    },

    deletePhotos: (prodId) => {
      return new Promise((resolve, reject) => {
        db.get()
          .collection(collection.PHOTO_COLLECTIONS)
          .deleteOne({ _id: objectId(prodId) })
          .then((response) => {
            console.log(response);
            resolve(response);
          });
      });
    }
  
    
}