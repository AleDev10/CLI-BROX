#!/usr/bin/env node

//importações
const readline = require('readline')
const inquirer = require("@inquirer/prompts");
const yp = require("yargs-parser");
const giz = require("chalk");
const figlet = require("figlet");
const { stdin, stdout } = require('process');

const cli = readline.createInterface({
    input:stdin,
    output:stdout,
    prompt:giz.white.bgRed('BROX@§:')
});

async function pergunta() {
    await inquirer.input({ message: "Enter your name" })
    try {
        cli.prompt();
    } catch (error) {
        console.log(error);
    }
}

async function iniciarCLI() {
  console.clear();

  console.log(
    await figlet.text("BROX", {
      font: "Standard",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 80,
      whitespaceBreak: true,
    })
  );
  try {
    console.log(giz.italic("O centro de todas as operações"))
    cli.prompt();
  } catch (err) {
    console.log("Something went wrong...");
    console.dir(err);
  }
}

cli.on("line",(data)=>{
    if (data==='') {
        cli.prompt();
    } else {
        let parse = yp(data);
        let [comando,...args]= parse._;
        console.log('comando: '+comando);
        console.log('args: '+args);
        console.log('flags: '+parse);
        cli.prompt();
        if (comando=='pf') {
            pergunta();
        }
    }
});

cli.on("close",()=>{
    process.exit(0)
});


iniciarCLI();
