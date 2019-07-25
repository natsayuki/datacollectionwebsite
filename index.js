const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const spawn = require("child_process").spawn;

const app = express();
const server = http.Server(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('index.html'));
});

app.post("/getdata", (req, res) => {
  url = req.body.url;

  const pythonProcess = spawn('py',["getdata.py", url]);

  console.log(url);
  pythonProcess.stdout.on('data', (data) => {
    res.send(data);
  });
});

app.get("", (req, res) => {
  res.sendFile(path.resolve('index.html'));
});

app.use(express.static(__dirname));

let port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`server up on port ${port}`);
});
