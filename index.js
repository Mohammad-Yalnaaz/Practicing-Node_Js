const express = require('express');
const users = require("./MOCK_DATA.json");
const fs = require('fs');


const app = express();
const port = 3000;

//Middleware - Plugin
app.use(express.urlencoded({extended: false}));

//Custom Middleware
app.use((req,res,next) => {
    console.log('Hello from Middleware 1');
    next();
})


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
    const body = req.body;
    users.pop()
    return res.json({status: "Pending"});
})
.delete((req,res) => {
    //Delete user with id
    return res.json({status: "Pending"});
});



app.post('/api/users', (req,res) => {
    //Create new user       
    const body = req.body;
    users.push({id: users.length + 1, ...body});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err,data) => {
            return res.status(201).json({status: "Success", message: "User Created"});
        });
});

app.listen(port, () => console.log('Server Started on port ' + port));

// HTTP Status Codes

// 1xx – Informational
// 2xx – Successful
// 3xx – Redirection
// 4xx – Client Error
// 5xx – Server Error
