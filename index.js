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
    name: "OfficeNumber",
    message: "What is the office number?",
  },
];
const engineerQuestion = [
  {
    type: "input",
    name: "GitHubUser",
    message: "What is your employee's GitHub username?",
  },
];
const internQuestion = [
  {
    type: "input",
    name: "schoolName",
    message: "What is the name of your intern's school?",
  },
];

const promptUser = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "Which role card would you like to build?",
        choices: ["Manager", "Engineer", "Intern"],
      },
      {
        type: "input",
        name: "name",
        message: "What is your employee's name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is your employee's ID?",
      },
      {
        type: "input",
        name: "email",
        message: "What is your employee's email address?",
      },
    ])

    .then((userInput) => {
      if (userInput.role === "Manager") {
        return inquirer.prompt(managerQuestion).then((userInput2) => {
          const ManagerDude = new Manager(
            userInput.name,
            userInput.id,
            userInput.email,
            userInput2.officeNumber
          );
          teamMembers.push(ManagerDude);
          addEmployee()
        });
      }
      if (userInput.role === "Engineer") {
        return inquirer.prompt(engineerQuestion).then((userInput2) => {
          const EngineerDude = new Engineer(
            userInput.name,
            userInput.id,
            userInput.email,
            userInput2.GitHubUser
          );
          teamMembers.push(EngineerDude);
          addEmployee()
        });
      }
      if (userInput.role === "Intern") {
        return inquirer.prompt(internQuestion).then((userInput2) => {
          const InternDude = new Intern(
            userInput.name,
            userInput.id,
            userInput.email,
            userInput2.schoolName
          );
          teamMembers.push(InternDude);
          addEmployee()
        });
      }
      const addEmployee = () => {
        return inquirer.prompt([
          {
            type: "confirm",
            name: "addEmployee",
            message: "Would you like to add another employee?",
          },
        ])
        .then(userInput3 => {
          if(userInput3.addEmployee === true) {
            promptUser(teamMembers);
          } else {
            console.log('team', teamMembers)
            generateHTMLPage()
          }
          
        }) 
      };
    });
};

let generateHTMLPage = teamObject => {
    console.log('team object', teamObject)

   // set card to empty
    let htmlCard = ""

    //loop over array of objects

    for(let i = 0; i < teamObject.length; i++){
        let finalPrompt = teamObject[i].office || teamObject[i].gitHub || teamObject[i].school;
        let keys = Object.keys(teamObject[i]);
        let lastKey = keys[4];
        let finalOption = lastKey + ":" + finalPrompt

        if (lastKey === undefined){
            finalOption = "";

        } else if (lastKey === 'gitHub'){
          finalOption = (`GitHub : <a href = 'https://www.github.com/${teamObj[i].gitHub}'> ${teamObj[i].gitHub}</a>`)
            console.log(finalOption)
        }
        else {
            console.log(finalOption)
            
        }
    }
  }
///move to src folder
let newCard = ""

let {name, email, id, role} = teamObject[i]
htmlCard+=
`
<div class="card" style="width: 18rem;">
    <div class="container">
      <div style="background-color:rgb(66, 57, 240); color: white;">
          <h4 class="display-6">${userInput2.officeNumber}</h4>
          <h4>${userInput2.officeNumber}.</h4>
      </div> 
      <ul class="list-group">
        <li class="list-group-item">ID: ${userInput2.officeNumber}</li>
        <li class="list-group-item">Email: ${userInput2.officeNumber}</li>
        <li class="list-group-item">Email: ${userInput2.officeNumber}</li>
      </ul>
    </div>
  </div>

`

const generateHTML = (userInput2) =>
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
  
  
  
  </body>
  </html>`;

// Function to write README file
const writeToFile = (userInput) => {
  fs.writeFile("./dist/employeeRoster.html", userInput, (error) =>
    error ? console.log("Error!") : console.log("Success!")
  );
};

// Function to initialize app
const init = () => {
  promptUser()
    .then((userInput2) => {
      console.log(teamMembers);
      // writeFileAsync("./dist/employeeRoster.html", generateHTML(userInput2));
    })
    .then(() => console.log("Successfully wrote to employeeRoster.html!!!"))
    .catch((err) => console.error(err));
};

// Function call to initialize app
init();
