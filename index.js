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
    },
    {
        type: 'input',
        name: 'description',
        message: 'What is the description for your project?',
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
        choices: ['Apache 2.0', 'GNU GPL v3', 'MIT', 'BSD 3-Clause', 'MPL 2.0', 'Unlicense'],
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'How can others contribute to your project?',
    },
    {
        type: 'input',
        name: 'username',
        message: 'What is your GitHub username?',
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email address?',
    }
];

// Function to return license badge
function licenseBadge(value) {
    if (value === "GNU GPLv3") {
      return "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
    } else if (value === "MPL 2.0") {
      return "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
    } else if (value === "MIT") {
      return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    } else if (value === "Apache 2.0") {
      return "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
    } else if (value === "BSD 3-Clause") {
        return "[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)"; 
    } else {
      return "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)";
    }
  }
  

// Function to create README file
function createReadme(answers) { 
    answers.licenseBadge = licenseBadge(answers.license);
    fs.writeFileSync('./READMEexample.md',
     `
    # ${answers.title}
    ${answers.licenseBadge}

    ## Table of Contents
    - [Description](#description)
    - [Installation](#installation)
    - [Usage](#usage)
    - [License](#license)
    - [Contributing](#contributing)
    - [Contact](#contact)
    
    ## Description
    ${answers.description}

    ## Installation
    ${answers.installation}

    ## Usage
    ${answers.usage}

    ## License
    This project is licensed under ${answers.license}

    ## Contributing
    ${answers.contributing}

    ## Contact
    If you have any questions about this project please reach out for more information!
    - GitHub: https//:github.com/${answers.username}
    - Email: ${answers.email}
    `
    );
};

// Function to ask user questions
function ask() {
    inquirer.prompt(questions)
        .then(answers => {
            createReadme(answers)
            console.log(chalk.green('Successfully created README.md'))
            const filename = `${answers.title.toLowerCase().split(' ').join('')}.json`;
            fs.writeFileSync(filename, JSON.stringify(answers, null, '\t'));
            console.log(chalk.green(`Successfully created ${filename}`));
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
