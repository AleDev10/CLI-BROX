#!/usr/bin/env node

const blessed = require("blessed");
const giz = require("chalk");

/*configurações gerais*/
const screen = blessed.screen({
  smartCSR: true,
});

/*elementos*/
const box = blessed.box({
  top: "center",
  left: "center",
  width: "100%",
  height: "100%",
  border: { type: "line" },
  style: {
    fg: "white",
    bg: "blue",
  },
});

const input = blessed.textbox({
  top: '100%-5',
  left: "2%",
  width: "50%",
  height: 3,
  border: { type: "line" },
  inputOnFocus: true, // Permite digitar ao focar
  value: giz.white.bgGreen.bold("BROX@>"),
});

const logsMain = blessed.log({
  top: '0%+2', 
  left: '2%',
  width: '50%', 
  height: 22,
  border: 'line',
  scrollable: true,
  label:'Terminal'
});

/*funções */
function resetarInput() {
  input.setValue(giz.white.bgGreen.bold("BROX@>"));
  screen.render();
  input.focus();
}

/*eventos*/
box.key(["escape", "C-c"], function (ch, key) {
  return process.exit(0);
});

input.key("enter", () => {
  const texto = input.getValue().slice(35);
  const info = box.getContent();
  const logtxt = '@\>';
  logsMain.add(`${logtxt} ${info} ${texto}`);
  resetarInput();
});
input.key("backspace", () => {
  const texto = input.getValue();
  if (texto.length == 34) {
    resetarInput();
  }
});

/*Adiciona os elementos à tela */
screen.append(box);
screen.append(input);
screen.append(logsMain);


/*Renderiza a tela e foca no input */
screen.render();
input.focus();
