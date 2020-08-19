const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const register = require('./controlers/register');
const signin = require('./controlers/signin');
const profile = require('./controlers/profile');
const image = require('./controlers/image');

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : '',
        database : 'smart-brain'
    }
});
const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> {res.send(db.users);})
app.post('/signin', signin.handleSignIn(db, bcrypt))
app.post('/register',register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handleProfile(db))
app.put('/image', (req, res) =>{image.handleImage(req, res, db)}) 
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(3000, ()=> {console.log('app is running on port 3000');})
