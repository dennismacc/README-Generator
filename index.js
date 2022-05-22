// Packages needed for this application
const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');

// Array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title for your project?',
    }
]

// Function to create README file
function createReadme(answers) {
    fs.writeFileSync('./README.md', `# ${answers.title}`)
}

inquirer
    .prompt(questions)
    .then((answers) => { 
        createReadme(answers)
        console.log(chalk.green('Successfully created README.md'))
    })
    .catch((err) => {
        if (err.isTtyError) {
            console.error(`Prompts could not be created`)
        } else {
            console.error(`Something went wrong`, err)
        }
    });

// // Function to initialize application
// init();

createReadme();