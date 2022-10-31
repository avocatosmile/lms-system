const express = require('express');
const bodyParser = require('body-parser');
const urlEncoder = bodyParser.urlencoded({extended:true});
const session = require('express-session');
const fs = require('fs');
const userRecords = 'Users.json'
const jsonParser = bodyParser.json();
const expressValidator = require('express-validator');
const app = express();
const port = 3000;
const expressSession = session({secret: 'grp7', resave: false, saveUninitialized:false});
const courseStore = 'Courses.json';

//Load the user JSON
let rawUsers = fs.readFileSync(userRecords)
let parsedUsers = JSON.parse(rawUsers)

var message;

app.use(express.static('public'));
app.set('view engine','hbs');
app.set('views','views');

app.use(bodyParser.json());
app.use(urlEncoder);
app.use(expressSession);
app.use(expressValidator());

// Renders the form
app.get('/', function(req,res){
    res.render('access', {err:message})
    
});
//Admin credentials
var root = 'root';
var eRoot = 'root@gmail.com'

//Runs what happens when login button is clicked
app.post('/login', function(req,res){

//Check if it is admin who has logged in
    if (req.body.email == eRoot && req.body.password == root)
     {
        res.redirect('/read-saved') 
     } 
//Otherwise now refer to the JSON and confirm the user's identity
    else {
        
        for (let i = 0; i < parsedUsers.length; i++) {
            if ((req.body.email == parsedUsers[i].email) && (req.body.password == parsedUsers[i].password)) {

                req.session.parsedUsers = parsedUsers[i].FirstName;
                req.session.role = parsedUsers[i].role;
                req.session.LastName = parsedUsers[i].LastName;
                req.session.email = parsedUsers[i].email;
                req.session.identification= parsedUsers[i].ID;
                req.session.courses = parsedUsers[i].courses;
                req.session.courseslec = parsedUsers[i].lec_courses;
            
       
                values =[req.session.parsedUsers,req.session.role,req.session.LastName ,
                    req.session.email , req.session.identification , req.session.courseslec , req.session.courses ];
                
                persona={
                    name :values[0],
                    role: values[1],
                    lname :values[2],
                    email: values[3],
                    id: values[4],
                    courseD: values[6],
                    courselec: values[5]
                }
                return res.render('welcome',  {persona: persona});
            }
        }
        message = "Invalid email or password, Please try again";
        return res.redirect('/');
    }
});

app.get('/logout', (req,res) =>{
    message = ''
    req.session.destroy((err) =>{
        if(err) throw err;
        res.redirect('/')
    })
})

//Get the Courses JSON
let courseData = fs.readFileSync(courseStore);
let dataCourse = JSON.parse(courseData);

app.get('/add', function(req, res)
{
    res.render('add');
});


//Users form post for saved users
app.post('/users-saved', urlEncoder, function(req, res)
{ 
    person = req.body;
    let id = person.id;
    
    parsedUsers.push(person)
    fs.writeFileSync(userRecords,JSON.stringify(parsedUsers,null,2));
    res.redirect('/read-saved');
});
//Users form post for saved courses
app.post('/courses-saved', urlEncoder, function(req, res)
{ 
 
    var getData = req.body;
    dataCourse.push(getData);
    fs.writeFileSync(courseStore,JSON.stringify(dataCourse,null,2));
    res.redirect('/readCourse');
});

//Send the Users JSON
app.get('/stored-data',(req,res) =>
{
    res.send(parsedUsers);
});

//Send the Courses JSON
app.get('/stored-course',(req,res) =>
{
    res.send(dataCourse);
});

//View the Users
app.get('/read-saved', jsonParser, function(req,res){
    res.render('readData');
});

//Add the Courses
app.get('/course-form', jsonParser, function(req,res){
    res.render('addCourse');
});

//View the Courses
app.get('/readCourse', jsonParser, function(req,res){
    res.render('readCourses');
});

app.listen(port);
console.log('Server running on port 3000');
