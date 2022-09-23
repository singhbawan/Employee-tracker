const figlet = require("figlet");
let { mainMenu } = require('./lib/prompts');



init();


function init() {

    console.log(figlet.textSync('EMPLOYEE TRACKER', {
        font: 'ANSI Shadow',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
    }));
    
    mainMenu();
};
