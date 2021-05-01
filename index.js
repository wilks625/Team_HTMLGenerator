const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const teamMembers = [];

const writeFileAsync = util.promisify(fs.writeFile);

const managerQuestion = [
  {
    type: "input",
    name: "officeNumber",
    message: "What is the office number?",
  },
];

const engineerQuestion = [
  {
    type: "input",
    name: "Github",
    message: "What is your employee's GitHub username?",
  },
];

const internQuestion = [
  {
    type: "input",
    name: "school",
    message: "What is the name of your intern's school?",
  },
];

const promptUser = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "jobType",
        message: "Which role card would you like to build?",
        choices: ["Manager", "Engineer", "Intern"],
      },
      {
        type: "input",
        name: "employeeName",
        message: "What is your employee's name?",
      },
      {
        type: "input",
        name: "employeeID",
        message: "What is your employee's ID?",
      },
      {
        type: "input",
        name: "employeeEmail",
        message: "What is your employee's email address?",
      },
    ])

    .then((userInput) => {
      if (userInput.jobType === "Manager") {
        return inquirer.prompt(managerQuestion).then((userInput2) => {
          const ManagerDude = new Manager(
            userInput.employeeName,
            userInput.employeeID,
            userInput.employeeEmail,
            userInput2.officeNumber
          );
          teamMembers.push(ManagerDude);
        });
      }
      if (userInput.jobType === "Engineer") {
        return inquirer.prompt(engineerQuestion).then((userInput2) => {
          const EngineerDude = new Engineer(
            userInput.employeeName,
            userInput.employeeID,
            userInput.employeeEmail,
            userInput2.Github
          );
          teamMembers.push(EngineerDude);
        });
      }
      if (userInput.jobType === "Intern") {
        return inquirer.prompt(internQuestion).then((userInput2) => {
          const InternDude = new Intern(
            userInput.employeeName,
            userInput.employeeID,
            userInput.employeeEmail,
            userInput2.school
          );
          teamMembers.push(InternDude);
        });
      }
      
    });
};

// let generatehtmlPage = teamObj => {
//     console.log('team object', teamObj)

//    // set card to empty
//     let htmlCard = ""

//     //loop over array of objects

//     for(let i = 0; i < teamObj.length; i++){
//         let finalPrompt = teamObj[i].office  teamObj[i].gitHub  teamObj[i].school;
//         let keys = Object.keys(teamObj[i]);
//         let lastKey = keys[4];
//         let finalOption = lastKey + ":" + finalPrompt

//         if (lastKey === undefined){
//             finalOption = "";

//         } else if (lastKey === 'gitHub'){
//             finalOption = (GitHub : <a href = 'https://www.github.com/${teamObj[i].gitHub}'> ${teamObj[i].gitHub}</a>)
//             console.log(finalOption)
//         }
//         else {
//             console.log(finalOption)
//         }
//     }

///move to src folder
const generateHTML = (userInput) =>
  `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="/Develop/dist/css/style.css">
    <title>Document</title>
  </head>
  <body>
      <header style="background-color:red; color: white; text-align: center; font-size: large;">My Team</header>
  
  <div class="card" style="width: 18rem;">
    <div class="container">
      <div style="background-color:rgb(66, 57, 240); color: white;">
          <h4 class="display-6">${userInput.employeeName}</h4>
          <h4>${userInput.jobType}.</h4>
      </div> 
      <ul class="list-group">
        <li class="list-group-item">ID: ${userInput.employeeID}</li>
        <li class="list-group-item">Email: ${userInput.employeeEmail}</li>
        
      </ul>
    </div>
  </div>
  
  </body>
  </html>`;

// Function to write README file
const writeToFile = (userInput, userInput2) => {
  fs.writeFile("./dist/employeeRoster.html", userInput, userInput2, (error) =>
    error ? console.log("Error!") : console.log("Success!")
  );
};

// Function to initialize app
const init = () => {
  promptUser()
    .then((userInput) => {
      console.log(teamMembers);
      writeFileAsync("./dist/employeeRoster.html", generateHTML(userInput));
    })
    .then(() => console.log("Successfully wrote to employeeRoster.html!!!"))
    .catch((err) => console.error(err));
};

// Function call to initialize app
init();
