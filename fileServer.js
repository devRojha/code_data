/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module
  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files
  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt
    - For any other route not defined in the server return 404
    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());

app.use("*", function(req, res){
  res.status(404).send('Not Found');
})
const PORT = process.env.PORT || 3000;

app.get("/files" ,  async function(req , res){
  try{
    const data = await fs.promises.readdir("files")
      res.status(200).send(data);
  }
  catch(err){
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
})

app.get("/file", async function(req , res){
  const filename = req.query.filename;
  try{
    const file = await fs.promises.readdir("files");
    if(file.includes(filename)){
      const filestring = path.join("files" , filename);
      const data = await fs.promises.readFile(filestring , "utf-8");
      res.status(200).send(data);
    }
    else{
      res.status(404).send("file not found");
    }
  }
  catch(err){
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
})

app.listen(PORT , function(){
  console.log("online....");
})

module.exports = app;