
var db=require('../config/connection')
var collection=require('../config/collections')
const bcrypt=require('bcrypt');
const { response } = require('express');
const { ObjectID } = require('bson');
var objectId = require("mongodb").ObjectID;


 //to get data from register
 module.exports={
 doSignup:(userData)=>{
    return new Promise(async(resolve,reject)=>{
        const salt= await bcrypt.genSalt(10)
        userData.Password= await
        bcrypt.hash(userData.Password,salt)
        db.get().collection(collection.USER_COLLECTIONS).insertOne(userData).then((data)=>{
            resolve(data)
            console.log(data);

        })
    })
},
//check data and logging in
doLogin:(userData)=>{
    return new Promise(async (resolve,reject)=>{
        let loginStatus = false;
        let response={}
        let user = await db.get().collection(collection.USER_COLLECTIONS).findOne({Email:userData.Email})
        console.log(userData)
        if(user){
            bcrypt.compare(userData.Password,user.Password).then((status)=>{
                if(status){
                    console.log("login success")
                    response.user=user;
                    response.status=true;
                    resolve(response)
                }else{
                    console.log("login failed");
                    resolve({status:false})
                }
            })
        }else{
            console.log("login falied")
            resolve({status:false})
        }
    })
}
 }