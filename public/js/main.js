const server = 'http://localhost:3000';

var len = null;

var c_store = [];
let courses = [];
var access = [];

async function fetchValues() {
    const url = server + '/stored-data';
    const response = await fetch(url, {method: 'GET'});
    const results = await response.text();
    let data = JSON.parse(results);
    // console.log("results")
    // console.log(results)
    // s = data[-1];
    // console.log("Data")
    // console.log(data);
    // len = data.length;
    // console.log(len);
    // console.log(access);
    //console.log(access);
    for (var i = 0; i < data.length; i++) {
        access.push(data[i]);
    }

    // len = store.length;
    // console.log(store[0]);
    // console.log(store)
    populateContent(access);
}


function populateContent(results){
    // console.log(results)
    //Get Div ID
    var list = document.getElementById('res');
    //Create Table
    let text = `<table class = "table">
    <thead>
        <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>ID</th>
            <th>Role</th>
            <th>Email</th>
            <th>Password</th>
            <th> student Courses</th>
            <th> Lec Courses</th>
        </tr>
    </thead>
    
    <tbody>`;
    //Populate Table
    for (let i = 0; i < results.length; i++) {
        text += "<tr><td>" + results[i].FirstName + "</td>";
        text += "<td>" + results[i].LastName + "</td>";
        text += "<td>" + results[i].ID + "</td>";
        text += "<td>" + results[i].role + "</td>";
        text += "<td>" + results[i].email+ "</td>";
        text += "<td>" + results[i].password+ "</td>";
        if(results[i].courses==undefined){
            results[i].courses=" Not Enrolled  ";
        }
        if(results[i].lec_courses==undefined){
            results[i].lec_courses="Not Enrolled";
        }
        text += "<td>" + results[i].courses+ "</td>";
        text += "<td>" + results[i].lec_courses+ "</td>";
       
    }
    text += "</tbody></table>";

    list.innerHTML = text;


}

//Getting courses from addCourses
async function getCourses(){
    const urlTwo = server + '/stored-course';
    const responseTwo = await fetch(urlTwo, {method: 'GET'});
    const resultsTwo = await responseTwo.text();
    let dataTwo = JSON.parse(resultsTwo);

    
    for (var i = 0; i < dataTwo.length; i++) {
        c_store.push(dataTwo[i].CourseID);
        courses.push(dataTwo[i]);
    }
    console.log(c_store);
    console.log(courses);
    populateCourse(c_store);
    Coursetable(courses);

}

function populateCourse(store){
    

    var course = document.getElementById('course-add');
    var course2 = document.getElementById('course-add-lec');
   
    let trial = ``;
    let trial2 = ``;
    for (let n = 0; n < store.length; n++) {
        trial += `  ${store[n]} <input type="checkbox" value= "${store[n]}" name = "courses"/>`
        
        trial2 += `  ${store[n]} <input type="checkbox" value= "${store[n]}" name = "lec_courses"/>`
        
    }

    course.innerHTML = trial;
    
  

    course2.innerHTML = trial2;
}



    

async function fetchCourses(){
    const urlTwo = server + '/stored-course';
    const responseTwo = await fetch(urlTwo, {method: 'GET'});
    const resultsTwo = await responseTwo.text();
    let dataTwo = JSON.parse(resultsTwo);

    
    for (var i = 0; i < dataTwo.length; i++) {
        
        courses.push(dataTwo[i]);
    }
    
    console.log(courses);
   
    Coursetable(courses);

}

function Coursetable(results){
    
    var list = document.getElementById('COURSES');
    //Create Table
    let text = `<table class = "table">
    <thead>
        <tr>
            <th>CourseID</th>
            <th>CourseName</th>
            <th>Course Description</th>
            
        </tr>
    </thead>
    <tbody>`;
    //Populate Table
    for (let i = 0; i < results.length; i++) {
        text += "<tr><td>" + results[i].CourseID + "</td>";
        text += "<td>" + results[i].CourseName + "</td>";
        text += "<td>" + results[i].CourseDescription+ "</td>";
       
    
    }
    text += "</tbody></table>";

    list.innerHTML = text;
}
