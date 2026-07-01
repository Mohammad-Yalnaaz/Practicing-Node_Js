const express = require('express');
//const users = require("./MOCK_DATA.json");
const fs = require('fs');
const mongoose = require('mongoose');


const app = express();
const port = 3000;

//Connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/youtube-app-1')
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log("Mongo Error: ", err));

//Schema
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('user', userSchema);


//Middleware - Plugin
app.use(express.urlencoded({extended: false}));

//Custom Middleware
app.use((req,res,next) => {
    console.log('Hello from Middleware 1');
    next();
})


//REST API

app.get('/api/users', async(req,res) => {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
})

//Routes

app.get('/users', async(req,res) => {
    const allDbUsers = await User.find({});
    const html = `
    <ul>
    ${allDbUsers.map(user => `<li>${user.first_name} ${user.last_name} - ${user.email}</li>`).join('')}
    </ul>
    `;
    res.send(html);
})


app.route('/api/users/:id').get(async(req,res) => {
    const user = await User.findById(req.params.id);
    return res.json(user);
})
.patch(async(req,res) => {
    //Edit user with id
    await User.findByIdAndUpdate(req.params.id, {last_name: "Changed"});

    const body = req.body;
    
    return res.json({status: "Success"});
})
.delete(async(req,res) => {
    //Delete user with id
    await User.findByIdAndDelete(req.params.id);
    return res.json({status: "Success"});
});



app.post('/api/users', async(req,res) => {
    //Create new user       
    const body = req.body;
    if(!body||
        !body.first_name||
        !body.last_name||
        !body.email||
        !body.job_title||
        !body.gender)
    {
        return res.status(400).json({status: "Error", message: "All fields required"});
    }
    // users.push({id: users.length + 1, ...body});
    // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err,data) => {
    //         return res.status(201).json({status: "Success", message: "User Created"});
    //     });
    const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    job_title: body.job_title,
    gender: body.gender,
});
    console.log("result: ", result);
    return res.status(201).json({status: "Success", message: "User Created", data: result});
})
app.listen(port, () => console.log('Server Started on port ' + port));

// HTTP Status Codes

// 1xx – Informational
// 2xx – Successful
// 3xx – Redirection
// 4xx – Client Error
// 5xx – Server Error
