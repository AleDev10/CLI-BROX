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

const asciiArt = figlet.textSync('CLI BROX', {
  font: 'Standard',
  horizontalLayout: 'default',
  verticalLayout: 'default'
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
  content: '{#f21b2d-bg}ESC:{/#f21b2d-bg}'+'{bold}{#262626-bg} Sair {/#262626-bg}{/bold}'+'{#f21b2d-bg}|{/#f21b2d-bg}'+'{#f21b2d-bg}ALT+F1:{/#f21b2d-bg}'+'{bold}{#262626-bg} Ajuda {/#262626-bg}{/bold}',
  style:{
    fg: '#D9D9D9',
  }
});

const titulo = blessed.text({
  parent: box,
  content: asciiArt,
  top: '8%',
  left: '2%',
  shrink: true,
  style: {
    bg: 'black'
  }
});

const logs = blessed.log({
  parent: box,
  top: '30%', 
  left: '2%',
  width: '50%', 
  height: '50%',
  border: 'line',
  label: 'Logs',
  keys:true,
  interactive:true,
  scrollable:true,

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

const processamento = blessed.progressbar({
  parent: box,
  top: '10%',
  right: 2,
  width: '44%',
  height: 3,
  border: { type: "line" },
  label: 'Processamento',
  orientation: 'horizontal',
  filled: 50,
  ch: '█',
  value:  0,
  style: {
    bar: {
      bg: '#F21B2D'
    },
    border: {
      fg: '#F21B2D'
    },
  }
});

const navegacao = blessed.list({
  parent: box,
  items:['Novo Projeto','Servidores'],
  top: '24%',
  right:2,
  width:'44%',
  height:6,
  keys:true,
  scrollable:true,
  interactive:true,
  label:'Navegação',
  border:{type:'line'},
  style:{
    item:{fg:'#D9D9D9'},
    selected:{bg:'#F21B2D',}
  }
});

const informação = blessed.textarea({
  parent:box,
  bottom:1,
  right:2,
  width:'44%',
  height:13,
  keys:true,
  inputOnFocus:false,
  scrollable:true,
  interactive:true,
  value:'Cria um projeto usando um templete',
  label:'Informações',
  border:{type:'line'},
  fg:'#D9D9D9'
});



/*funções */
function resetarInput() {
  input.setValue('');
  screen.render();
  input.focus();
}


/*eventos*/
box.key(["escape", "C-c", 'f1'], function (ch, key) {
  return process.exit(0);
});

input.key(["escape", "C-c", 'f1'], function (ch, key) {
  return process.exit(0);
});
input.key("enter", () => {
  const comando = input.getValue();
  const marcaLog = '@\>';
  logs.log(`${marcaLog} ${comando}`);
  resetarInput();
});

/*Adiciona o elemento principal à tela */
screen.append(box);

/*Renderiza a tela e foca no input */
resetarInput()