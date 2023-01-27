# Multer Sample Project

To show the basic uses of 'Multer' node package for uploading files

## To install and import "Multer" package

- Intall multer package 
```
npm install multer
```

- Import multer package
```js 
const multer = require('multer') 
```

## To initialize StorageEngine object

### Properties included
- **destination**: Set destination for saving the upload file(s) in localhost / server
- **filename**: Set the new file name to be applied after uploading to localhost / server

```js

const fileStorageEngine = multer.diskStorage({

  destination: (req, file, callback) => {
    callback(null, `./images/id_${req.params.id}`);
  },
  
  filename: (req, file, callback) => {
    callback(null, Date.now() + '--' + file.originalname);
  }
  
});

```

## Pass storageEngine object to multer function

```js
const upload = multer({ storage: fileStorageEngine });
```

## Setting routes for uploading files

### GET the upload forms from index.html
- GET route to direct to index.html
```js
app.get('/', (req, res) => {

  res.sendFile(path.join(__dirname, 'index.html'));
  
});
```

### Upload single file
- POST route to upload single file to server
```js
app.post('/users/:id/upload/single', upload.single('image'), (req, res) => {

  const userId = req.params.id;
  
  console.log(req.file);
  
  res.status(200).json({
    message: `single file uploaded success to user ${userId}`,
    uploadedFile: req.file,
  });
  
});
```

### Upload multiple files
- POST route to upload multiple files to server
```js
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
```


