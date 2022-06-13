var db = require("../config/connection");
var collection = require("../config/collections");
const { response } = require("express");
var objectId = require("mongodb").ObjectID;

module.exports = {
    addSlide: (slide, callback) => {
      db.get()
        .collection("slide")
        .insertOne(slide)
        .then((data) => {
          // console.log(data.insertedId)
          callback(data.insertedId);
        });
    },
 
  
    getAllSlides: () => {
      return new Promise(async (resolve, reject) => {
        let slides = await db
          .get()
          .collection(collection.SLIDE_COLLECTIONS)
          .find()
          .toArray();
        resolve(slides);
      });
    },

    deleteSlides: (prodId) => {
      return new Promise((resolve, reject) => {
        db.get()
          .collection(collection.SLIDE_COLLECTIONS)
          .deleteOne({ _id: objectId(prodId) })
          .then((response) => {
            console.log(response);
            resolve(response);
          });
      });
    }
  
}