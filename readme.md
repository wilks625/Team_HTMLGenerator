# 10 Object-Oriented Programming: Team Profile Generator

This application is a Node.js command-line application that takes in information about employees on a software engineering team, then generates an HTML webpage that displays summaries for each person. Jest tests were created and used to make code maintainable.

Below is a video that demonstrates the application's functionality:
https://drive.google.com/file/d/1fLwsfM6rl4Y_IpR4kQ3KhAGcZcBGtS60/view

the user must have jest and inquirer installed to run this application. These can be installed with the following commands:
npm install jest
npm install inquirer

The user will enter the following command to start the application:
node index

The user will then be prompted for their team members and their information. After the first employee answers are completed, the user will have the option to create another employee card. This information will then be used to create separate employee cards and will be displayed to a dynamically generated HTML page. The displayed email is clickable and opens the default email programs and populates to the field of the corresponding email address. The displayed GitHub profile is also clickable and opens up new tab in the web browser.

WHEN User starts the application
THEN User is prompted to enter the team manager’s name, employee ID, email address, and office number
WHEN User enter the team manager’s name, employee ID, email address, and office number
THEN User is presented with a menu with the option to add an engineer or an intern or to finish building my team
WHEN User select the engineer option
THEN User is prompted to enter the engineer’s name, ID, email, and GitHub username, and User is taken back to the menu
WHEN User select the intern option
THEN User is prompted to enter the intern’s name, ID, email, and school, and User is taken back to the menu
WHEN User decides to finish building my team
THEN User exits the application, and the HTML is generated