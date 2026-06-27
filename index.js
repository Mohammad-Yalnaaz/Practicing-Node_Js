const express = require('express');
const users = require("./MOCK_DATA.json");

const app = express();
const port = 3000;



//REST API

app.get('/api/users', (req,res) => {
    return res.json(users);
})

//Routes

app.get('/users', (req,res) => {
    const html = `
    <ul>
    ${users.map(user => `<li>${user.first_name} ${user.last_name}</li>`).join('')}
    </ul>
    `;
    res.send(html);
})

app.route('/api/users/:id').get((req,res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id ===id);
    return res.json(user);
})
.patch((req,res) => {
    //Edit user with id
    return res.json({status: "Pending"});
})
.delete((req,res) => {
    //Delete user with id
    return res.json({status: "Pending"});
});



app.post('/api/users', (req,res) => {
    //Todo: Create new User
    return res.json({status: "Pending"});
});    

app.listen(port, () => console.log('Server Started on port ' + port));