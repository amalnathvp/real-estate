require('dotenv').config();
var express = require('express');
var router = express.Router();
var photoHelpers = require('../helpers/photo-helpers')
var slideHelpers = require('../helpers/slide-helpers')
var contactHelpers = require('../helpers/contact-helper')
const session = require("express-session");
// const bannerHelpers = require('../helpers/banner-helpers');
const userHelpers = require('../helpers/user-helpers');
const verifyLogin=(req,res,next)=>{
  if(req.session.loggedIn){
    next()
  }else{
    res.redirect('/login')
  }
}

/* GET users listing. */
router.get('/admin',verifyLogin,function(req, res, next) {
  let user=req.session.user
  photoHelpers.getAllPhotos().then((photos)=>{
    slideHelpers.getAllSlides().then((slides)=>{
      contactHelpers.getAllContact().then((contacts)=>{
        contactHelpers.getAllemail().then((email)=>{
        console.log(email);
        res.render("admin",{admin:true, photos,email,slides,contacts,user})
      })
    })
    })
  })
});

router.get('/register', function(req,res){
  res.render('register')
})


router.post('/register',(req,res)=>{
  userHelpers.doSignup(req.body).then((response)=>{
    console.log(response);
    req.session.loggedIn=true
    req.session.user=response
    res.redirect('/login')
  })

})

router.get('/login', function(req, res, next) {
  if(req.session.loggedIn){
    res.redirect('/admin');
  }else{

  res.render('login', {"loginErr":req.session.loginErr});
  req.session.loginErr=false
  }
}); 

router.post('/login',(req,res)=>{
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn=true;
      req.session.user=response.user
      res.redirect('/admin')
    }else{
      req.session.loginErr=true
      res.redirect("/login")
      

    }
  })
})


//add photos
router.get('/admin/add-photo',verifyLogin,function(req,res){
  res.render('add-photo')
})


router.post('/admin/add-photo',function(req,res){
  console.log(req.body);
  console.log(req.files.image);
  photoHelpers.addPhoto(req.body,(id)=>{
    let image=req.files.image
    console.log(id);
    image.mv('./public/images/'+id+'.jpg',(err,done)=>{
    if(!err){
      res.redirect('/admin')
    }else{
      console.log(err)
    }
    })
  });
})

//delete products
router.get('/admin/delete-photo/:id',verifyLogin,(req,res)=>{
  let proId=req.params.id
  console.log(proId);
  photoHelpers.deletePhotos(proId).then((responsive)=>{
    res.redirect('/admin')
  })
})

//add sliders
router.get('/admin/add-slide',verifyLogin, function(req,res){
  res.render('add-slide')
})


router.post('/admin/add-slide',function(req,res){
  console.log(req.body);
  console.log(req.files.image);
  slideHelpers.addSlide(req.body,(id)=>{
    let image=req.files.image
    console.log(id);
    image.mv('./public/images/'+id+'.jpg',(err,done)=>{
    if(!err){
      res.redirect('/admin')
    }else{
      console.log(err)
    }
    })
  });
})

//delete slide
router.get('/admin/delete-slide/:id',verifyLogin,(req,res)=>{
  let proId=req.params.id
  console.log(proId);
  slideHelpers.deleteSlides(proId).then((responsive)=>{
    res.redirect('/admin')
  })
})





module.exports = router;
