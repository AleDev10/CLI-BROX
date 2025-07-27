#!/usr/bin/env node

const blessed = require("blessed");
const contrib = require('blessed-contrib');
const giz = require("chalk");
const { fonts } = require("figlet");
const figlet = require('figlet');

/*configurações gerais*/
const screen = blessed.screen({
  smartCSR: true,
  title: 'CLI BROX'
});

let texto;

figlet.text('HELLO', { font: 'Ghost' }, function (err, data) {
  if (err) throw err;
  texto = data;
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
    bg: "#262626",
  },
});

const boxPrompt = blessed.box({
  parent: box,
  bottom: 1,
  left: "2%",
  width: "50%",
  height: 3,
  label:'Prompt',
  border: { type: "line" },
  style:{
    border:{
      fg:'#F21B2D'
    }
  }
});

const input = blessed.textbox({
  parent: boxPrompt,
  top: 0,
  left: "15%",
  width: '70%',
  height: 1,
  border: false,
  inputOnFocus: true, // Permite digitar ao focar
  style:{
    fg: '#D9D9D9',
  }
});

const textPrompt = blessed.text({
  parent: boxPrompt,
  top: 0,
  left: "1%",
  width: 'shrink',
  height: 1,
  border: false,
  content: giz.hex('#D9D9D9').bold(" BROX@> "),
  style:{
    bg: '#F21B2D',
  }
});

const logsMain = blessed.log({
  parent: box,
  top: '20%', 
  left: '2%',
  width: '50%', 
  height: '60%',
  border: 'line',
  label: 'Logs',
});

const line = blessed.line({
  parent: box,
  orientation: 'horizontal',
  top: 1,
  left: 'center',
  width: '95%',

});

const boxAtalhos = blessed.box({
  parent: box,
  top: 0,
  left: 'center',
  width: '50%',
  height: 1,
  style:{
    bg: '#f21b2d',
  }
});

const atalhos = blessed.text({
  parent: boxAtalhos,
  top: 'center',
  left: 'center',
  width: 'shrink',
  height: 1,
  tags: true,
  content: '{#f21b2d-bg}ESC:{/#f21b2d-bg}'+'{bold}{#262626-bg} Sair {/#262626-bg}{/bold}'+'{#f21b2d-bg}|{/#f21b2d-bg}'+'{#f21b2d-bg}F1:{/#f21b2d-bg}'+'{bold}{#262626-bg} Ajuda {/#262626-bg}{/bold}',
  style:{
    fg: '#D9D9D9',
  }
});

const titulo = blessed.bigtext({
  parent: box,
  top: 'center',
  left: 'center',
  width: '20%',
  height: 3,
  content: texto,
  style: {
    fg: '#F21B2D',
  }
});

/*funções */
function resetarInput() {
  input.setValue('');
  screen.render();
  input.focus();
}

/*eventos*/
box.key(["escape", "C-c", 'q'], function (ch, key) {
  return process.exit(0);
});

input.key(["escape", "C-c"], function (ch, key) {
  return process.exit(0);
});
input.key("enter", () => {
  const texto = input.getValue();
  const logtxt = '@\>';
  logsMain.log(`${logtxt} ${texto}`);
  resetarInput();
});

/*Adiciona os elementos à tela */
screen.append(box);

/*Renderiza a tela e foca no input */
screen.render();
input.focus();