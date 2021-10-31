// link to page creation
const generateHTMl = require('./src/generateHTML');

// Team Profile

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

//node modules
const fs = require('fs');
const inquirer = require('inquirer');

// Team array 
const teamArr = [];

// Manager prompt

const addManager = () => {
    return inquirer.prompt([{
            type: 'input',
            name: 'name',
            message: 'Enter Manager Name ?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please provide Manager's name !");
                    return false;
                }
            }

        },
        {
            type: 'input',
            name: 'id',
            message: "Please enter the manager's ID.",
            validate: nameInput => {
                if (isNaN(nameInput)) {
                    console.log("Please enter the manager's ID!")
                    return false;
                } else {
                    return true;
                }
            }
        },

        {
            type: 'input',
            name: 'email',
            message: "Please enter the manager's email.",
            validate: email => {
                // Regex mail check (return true if valid mail)
                valid = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email);
                if (valid) {
                    return true;
                } else {
                    console.log('Please enter an email!');
                    return false;
                }
            }
        },

        {
            type: 'input',
            name: 'officeNumber',
            message: "Please enter the manager's office number",
            validate: nameInput => {
                if (isNaN(nameInput)) {
                    console.log('Please enter an office number!')
                    return false;
                } else {
                    return true;
                }
            }
        }

    ]).then(managerInput => {
        const { name, id, email, officeNumber } = managerInput;
        const manager = new Manager(name, id, email, officeNumber);
        teamArr.push(manager);
    })
};

const addEmployee = () => {
    console.log(`
    // add employee 
    
    `);

    return inquirer.prompt([{
            type: 'list',
            name: 'role',
            message: "Please choose your employee's role",
            choices: ['Intern', 'Engineer']
        },
        {
            type: 'input',
            name: 'name',
            message: "What's the name of the employee?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter an employee's name!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "Please enter the employee's ID.",
            validate: nameInput => {
                if (isNaN(nameInput)) {
                    console.log("Please enter the employee's ID!")
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Please enter the employee's email.",
            validate: email => {
                // Regex mail check (return true if valid mail)
                valid = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email);
                if (valid) {
                    return true;
                } else {
                    console.log('Please enter an email!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: "please enter the employee's github username",
            when: (input) => input.role === "Engineer",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter the employee's github username!")
                }
            }
        },
        {
            type: 'input',
            name: 'school',
            message: "Please enter the intern's school",
            when: (input) => input.role === "Intern",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter the intern's school!")
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAddEmployee',
            message: 'Would you like to add more team members?',
            default: false
        }
    ]).then(employeeInput => {
        let { name, id, email, role, github, school, confirmAddEmployee } = employeeInput;
        let employee;
        if (role === "Engineer") {
            employee = new Engineer(name, id, email, github);

            console.log(employee);

        } else if (role === "Intern") {
            employee = new Intern(name, id, email, school);

            console.log(employee);
        }

        teamArr.push(employee);
        if (confirmAddEmployee) {
            return addEmployee(teamArr);
        } else {
            return teamArr;
        }

    })
};

// function to generate HTML page file using file system

const writeFile = data => {
    fs.writeFile('./dist/index.html', data, err => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("Your team profile has been successfully created! Please check out the index.html")
        }
    })
};

addManager()
    .then(addEmployee)
    .then(teamArr => {
        return generateHTML(teamArr);
    })
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .catch(err => {
        console.log(err);
    });