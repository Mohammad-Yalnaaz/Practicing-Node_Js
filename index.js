const express = require('express');
const users = require("./MOCK_DATA.json");

const app = express();
const port = 3000;



//Routes
app.get('/api/users', (req,res) => {
    return res.json(users);
})
app.get('/users', (req,res) => {
    const html = `
    <ul>
    ${users.map(user => `<li>${user.first_name} ${user.last_name}</li>`).join('')}
    </ul>
    `;
    res.send(html);
})

app.listen(port, () => console.log('Server Started on port ' + port));