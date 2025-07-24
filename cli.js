#!/usr/bin/env node

//importações
const readline = require('readline');
const inquirer = require('inquirer');

const cli = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
    prompt:"BROX>",
});

cli.prompt();

cli.on(()=>{
    process.exit(0);
})

console.log("Inicio do projeto.");