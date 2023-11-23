require('dotenv').config()

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
app.use(cors());

app.use(express.json())

let refreshTokens = []

app.post('/login', (req, res) => {
  const username = req.body.username
  const user = { name: username }

  const accessToken = generateAccessToken(user)
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
  refreshTokens.push(refreshToken)
  res.json({ accessToken: accessToken, refreshToken: refreshToken })
})

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}

app.post('/bikes', authenticateJWT, (req, res) => {
    const { page } = req.body;
  
    axios.get(`https://bikeindex.org:443/api/v3/search?page=${page}&per_page=25&location=Berlin&distance=10&stolenness=proximity`)
      .then(response => {
        res.send(response.data);
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Error fetching data from external service');
      });
  });

app.listen(4000)