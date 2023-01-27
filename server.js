const express = require('express');
const path = require('path');
require('dotenv').config();
const multer = require('multer'); // Import multer

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server listens on port  ${PORT}`);
});

/*** Multer Initization ***/

// Initialize fileStorageEngine object
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `./images/id_${req.params.id}`);
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + '--' + file.originalname);
  },
});

// Pass fileStorageEngine object to 'storage' option property of multer function
const upload = multer({ storage: fileStorageEngine });

/* ------------------------------------------------------------------ */

/*** Routes ***/

// homepage
app.get('/', (req, res) => {
  res
    .status(200)
    .send(
      '<h1>Home Page</h1><p> Go to <a href="http://localhost:5000/upload_forms">Upload Forms Page</a> to try on uploading file(s) </p>'
    );
});

// GET route to direct to upload_forms.html
app.get('/upload_forms', (req, res) => {
  res.sendFile(path.join(__dirname, 'upload_forms.html'));
});

// POST route to upload single file to server
app.post('/users/:id/upload/single', upload.single('image'), (req, res) => {
  const userId = req.params.id;
  console.log(req.file);
  res.status(200).json({
    message: `single file uploaded success to user ${userId}`,
    uploadedFile: req.file,
  });
});

// POST route to upload multiple files to server
app.post(
  '/users/:id/upload/multiple',
  upload.array('images', 3),
  (req, res) => {
    const userId = req.params.id;
    console.log(req.files);
    res.status(200).json({
      message: `multiple files uploaded success to user ${userId}`,
      uploadedFiles: req.files,
    });
  }
);

/* ------------------------------------------------------------------ */
