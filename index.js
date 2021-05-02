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
    name: "github",
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
// prompts user if they would like to add another employee
const promptAnotherEmployee = () => {
// console.log("hey, im here!")
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "addEmployee",
        message: "Would you like to add another emplyoyee?",
      },
    ])
    .then((userInput3) => {
      if (userInput3.addEmployee === true) {
        console.log("prompting for additional user");
        promptUser();
      }
      else {
        // console.log("team", teamMembers);
        // generateHTMLPage();
        const htmlCard = generateHTMLCard(teamMembers);
        const htmlPage = generateHTMLPage(htmlCard);
        writeFileAsync("./dist/employeeRoster.html", htmlPage);
      }
    });
};
// questions for user to answer
const promptUser = () => {
  inquirer
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
        inquirer.prompt(managerQuestion).then((userInput2) => {
          const ManagerDude = new Manager(
            userInput.name,
            userInput.id,
            userInput.email,
            userInput2.officeNumber
          );
          teamMembers.push(ManagerDude);
          promptAnotherEmployee();
        });
      } else if (userInput.role === "Engineer") {
        inquirer.prompt(engineerQuestion).then((userInput2) => {
          const EngineerDude = new Engineer(
            userInput.name,
            userInput.id,
            userInput.email,
            userInput2.github
          );
          teamMembers.push(EngineerDude);
          promptAnotherEmployee();
        });
      } else if (userInput.role === "Intern") {
        inquirer.prompt(internQuestion).then((userInput2) => {
          const InternDude = new Intern(
            userInput.name,
            userInput.id,
            userInput.email,
            userInput2.schoolName
          );
          teamMembers.push(InternDude);
          promptAnotherEmployee();
        });
      } else {
        const employee = new Employee(
          userInput.name,
          userInput.id,
          userInput.email,
          userInput.role
        );
        teamMembers.push(employee);
      }
    });
};


let generateHTMLCard = (teamObject) => {
  console.log("team object", teamObject);

  let newCard = "";

  for (let i = 0; i < teamObject.length; i++) {
    let finalPrompt =
      teamObject[i].officeNumber || teamObject[i].github || teamObject[i].school;
    let keys = Object.keys(teamObject[i]);
    let lastKey = keys[3];
    let finalOption = lastKey + ": " + finalPrompt;

    if (lastKey === undefined) {
      finalOption = "";
    } else if (lastKey === "github") {
      // finalOption = `GitHub : <a href = 'https://www.github.com/${teamObject[i].github}'> ${teamObject[i].github}</a>`;
      finalOption = `GitHub : <a value="Open Window"
      onclick="window.open('https://github.com/${teamObject[i].github}')">${teamObject[i].github}</a>`
      console.log(finalOption);
    } else {
      console.log(finalOption);
    }
    let { name, email, id } = teamObject[i];
    console.log(name, email, id, finalOption);
    newCard += `
         <div class="card" style="width: 18rem;">
          <div class="container">
            <div style="background-color:rgb(66, 57, 240); color: white;">
               <h4 class="display-6">${name}</h4>
               <h4>${teamObject[i].constructor.name}</h4>
             </div> 
              <ul class="list-group">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
                <li class="list-group-item">${finalOption} </li>
              </ul>
          </div>
        </div>
    `;
  }

  return newCard;
};

const generateHTMLPage = (htmlCard) =>
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
  
  ${htmlCard}
  
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
  promptUser();
};

/*
promptUser - get user info
ask if they wanna add another user?
  - yes: promptUser
  - no: save
*/

// Function call to initialize app
init();
