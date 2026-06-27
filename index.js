const express = require('express');
const users = require("./MOCK_DATA.json");

const app = express();
const port = 3000;



//Routes
app.get('/users', (req,res) => {
    return res.json(users);
})


app.listen(port, () => console.log('Server Started on port ' + port));