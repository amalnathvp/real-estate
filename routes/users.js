require('dotenv').config();
var express = require('express');
var router = express.Router();
let multer = require('multer')
let upload = multer()
var photoHelpers = require('../helpers/photo-helpers')
var slideHelpers = require('../helpers/slide-helpers')
var contactHelpers = require('../helpers/contact-helper')
const userHelpers = require('../helpers/user-helpers');

 

//main page
router.get('/', function(req, res, next) {
  slideHelpers.getAllSlides().then((slides)=>{
    photoHelpers.getAllPhotos().then((photos)=>{
      res.render('index',{slides,photos}); 
      })

  })
});

//about page
router.get('/about', function(req,res, next){
  photoHelpers.getAllPhotos().then((photos)=>{
    res.render('about', {photos})
    })
});

//service page
router.get('/service', function(req,res, next){
  photoHelpers.getAllPhotos().then((photos)=>{
    res.render('service', {photos})
    })
});

//project page
router.get('/project', function(req,res, next){
  photoHelpers.getAllPhotos().then((photos)=>{
  res.render('project', {photos})
  })
});

//contact page
router.get('/contact', function(req,res, next){
  photoHelpers.getAllPhotos().then((photos)=>{
    res.render('contact', {photos})
    })
});


router.post('/add-contact',upload.fields([]),function(req,res){
  
  contactHelpers.addContact(req.body,(id)=>{
    // console.log(id);
   res.redirect('/contact')
  });
})
router.post('/addemail',upload.fields([]),function(req,res){
  console.log(req.body)
  contactHelpers.addEmail(req.body,(id)=>{
    // console.log(id);
   res.redirect('/')
  });
})

//delete slide
router.get('/delete-contact/:id',(req,res)=>{
  let proId=req.params.id
  console.log(proId);
  contactHelpers.deleteContact(proId).then((responsive)=>{
    res.redirect('/admin')
  })
})


module.exports = router;
