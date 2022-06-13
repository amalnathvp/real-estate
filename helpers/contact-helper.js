var db = require("../config/connection");
var collection = require("../config/collections");
const { response } = require("express");
var objectId = require("mongodb").ObjectID;

module.exports = {
    addContact: (contact, callback) => {
      //console.log(product);
  
      db.get()
        .collection("contact")
        .insertOne(contact)
        .then((data) => {
          // console.log(data.insertedId)
          callback(data.insertedId);
        });
    },
    addEmail: (email, callback) => {
      //console.log(product);
  
      db.get()
        .collection("email")
        .insertOne(email)
        .then((data) => {
          // console.log(data.insertedId)
          callback(data.insertedId);
        });
    },
   

    getAllContact: () => {
      return new Promise(async (resolve, reject) => {
        let contacts = await db
          .get()
          .collection(collection.CONTACT_COLLECTIONS)
          .find()
          .toArray();
        resolve(contacts);
      });
    },
    getAllemail: () => {
      return new Promise(async (resolve, reject) => {
        let email= await db
          .get()
          .collection(collection.EMAIL_COLLECTIONS)
          .find()
          .toArray();
        resolve(email);
      });
    },

    deleteContact: (prodId) => {
      return new Promise((resolve, reject) => {
        db.get()
          .collection(collection.CONTACT_COLLECTIONS)
          .deleteOne({ _id: objectId(prodId) })
          .then((response) => {
            console.log(response);
            resolve(response);
          });
      });
    }
  
    
}