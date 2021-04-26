var express = require('express');
var multer  = require('multer');
var router = express.Router();
var upload = multer({ dest: './public/images' })

var cpUpload = upload.fields([{ name: 'avatar', maxCount: 2 }, { name: 'gallery', maxCount: 2 }])
router.post('/photos/upload', cpUpload, function (req, res, next) {
  // req.file is the `avatar` file
  res.send("success")
  // req.body will hold the text fields, if there were any
})

module.exports = router;
