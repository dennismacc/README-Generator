// Packages needed for this application
const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');

const questions = [{
    type: 'input',
    name: 'title',
    message: 'What is the title for your project?',
},
{
    type: 'input',
    name: 'description',
    message: 'What is the description for your project?',
},
{
    type: 'input',
    name: 'contents',
    message: 'What would you like to add to your project Table of Contents?',
},
{
    type: 'input',
    name: 'installation',
    message: 'What are the installation steps for your project?',
},
{
    type: 'input',
    name: 'usage',
    message: 'Do you have any usage information?',
},
{
    type: 'list',
    name: 'license',
    message: 'Would you like to include a license file for your project?',
    choices: ['Apache License 2.0', 'GNU General Public License', 'MIT License'],
},
{
    type: 'input',
    name: 'contributors',
    messages: 'Would you like to include a list of contributors?',
},
];

// Function to create README file
function createReadme(answers) {
    fs.writeFileSync('./README.md', `# ${answers.name}`);
}

// Array of questions for user input
function ask() {
    inquirer.prompt(questions)
        .then(answer => {
            createReadme(answer)
            console.log(chalk.green('Successfully created README.md'))
        })
        .catch((error) => {
            if (error.isTtyError) {
                console.error(`Prompts could not be created`)
            } else {
                console.error(`Something went wrong`, error)
            }
        })
};

// Function to initialize application
function init() {
    console.log(chalk.blue('Welcome to the README Generator!'));
    ask();
};

// Call to initialize application
init();
