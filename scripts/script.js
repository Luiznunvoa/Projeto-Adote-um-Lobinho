fetch("http://localhost:8080/data/lobinhos.json")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.get('/data/lobinhos.json', (req, res) => {
  res.sendFile(__dirname + '/data/lobinhos.json');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});