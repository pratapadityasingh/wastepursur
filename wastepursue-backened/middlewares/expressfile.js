const express = require('express');
const fileForge = require('express-fileforge');
const path = require('path');
const app = express();

app.post('/upload', async function (req, res) {
  try {
   
  
    const fileStoragePath = path.resolve(__dirname, 'myFiles');
    
    let uploadedFile = await fileForge.saveFile(req, fileStoragePath, 'abc.pdf');
    
    res.end(`File uploaded successfully: ${uploadedFile}`);
  } catch (error) {
    console.error(error);
    res.status(500).end('Internal Server Error');
  }
});

