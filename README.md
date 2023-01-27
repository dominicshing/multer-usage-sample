# Multer Usage Sample

To show the basic uses of 'Multer' node package for uploading files to server or localhost

## To install and import "Multer" package

- Intall multer package (express also needed)
```
npm install multer express
```

- Import multer package
```js 
const multer = require('multer') 
```

## To initialize StorageEngine object

### Properties defined
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

### Get the upload forms from upload_forms.html
#### URL of upload forms: localhost:5000/upload_forms
```js
app.get('/upload_forms', (req, res) => {

  res.sendFile(path.join(__dirname, 'upload_forms.html'));
  
});
```

### Upload single file
-  Use upload.single(fieldname) in post function
#### POST API example: /users/1/upload/single
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
#### POST API example: /users/1/upload/multiple
-  Use upload.array(fieldname [, max files]) in post function
```js
app.post('/users/:id/upload/multiple', upload.array('images', 3), (req, res) => {

    const userId = req.params.id;
    console.log(req.files);
    res.status(200).json({
      message: `multiple files uploaded success to user ${userId}`,
      uploadedFiles: req.files,
    });
  }
  
);
```


