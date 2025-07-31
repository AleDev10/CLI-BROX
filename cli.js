#!/usr/bin/env node

const blessed = require("blessed");
const contrib = require("blessed-contrib");
const giz = require("chalk");
const { fonts } = require("figlet");
const figlet = require("figlet");
const pkg = require("./package.json");
const parser = require("yargs-parser");

/*variaveis globais*/
const argumento = process.argv.slice(2);
let itensMenu = ["Novo Projeto", "Servidores", "<-Voltar"];

/*verificação do comando principal */
if (argumento.includes("-v") || argumento.includes("--version")) {
  console.log(`brox v${pkg.version}`);
} else {
  /*configurações gerais*/
  const tela = blessed.screen({
    smartCSR: true,
    title: "CLI BROX",
  });

  const acllArte = figlet.textSync("CLI BROX", {
    font: "Standard",
    horizontalLayout: "default",
    verticalLayout: "default",
  });

  /*elementos*/
  const caixaPrincipal = blessed.box({
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

  const linha = blessed.line({
    parent: caixaPrincipal,
    orientation: "horizontal",
    top: 1,
    left: "center",
    width: "95%",
  });

  const caixaDosAtalhos = blessed.box({
    parent: caixaPrincipal,
    top: 0,
    left: "center",
    width: "70%",
    height: 1,
    style: {
      bg: "#f21b2d",
    },
  });

  const atalhos = blessed.text({
    parent: caixaDosAtalhos,
    top: "center",
    left: "center",
    width: "shrink",
    height: 1,
    tags: true,
    content:
      "{#f21b2d-bg}ESC:{/#f21b2d-bg}" +
      "{bold}{#262626-bg} Sair {/#262626-bg}{/bold}" +
      "{#f21b2d-bg}|{/#f21b2d-bg}" +
      "{#f21b2d-bg}Tab:{/#f21b2d-bg}" +
      "{bold}{#262626-bg} Mudar foco {/#262626-bg}{/bold}" +
      "{#f21b2d-bg}|{/#f21b2d-bg}" +
      "{#f21b2d-bg}ALT+F1:{/#f21b2d-bg}" +
      "{bold}{#262626-bg} Ajuda {/#262626-bg}{/bold}",
    style: {
      fg: "#D9D9D9",
    },
  });

  const titulo = blessed.text({
    parent: caixaPrincipal,
    content: acllArte,
    top: "8%",
    left: "2%",
    shrink: true,
    style: {
      bg: "black",
    },
  });

  const saida = blessed.log({
    parent: caixaPrincipal,
    top: "30%",
    left: "2%",
    width: "50%",
    height: "50%",
    border: "line",
    label: "Saida",
    keys: true,
    interactive: true,
    scrollable: true,
    focusable: true,
    style: {
      focus: { border: { fg: "#F21B2D" } },
    },
  });

  const caixaDaEntrada = blessed.box({
    parent: caixaPrincipal,
    bottom: 1,
    left: "2%",
    width: "50%",
    height: 3,
    label: "Entrada",
    border: { type: "line" },
    style: {
      border: { fg: "#F21B2D" },
    },
  });

  const textoDaEntrada = blessed.text({
    parent: caixaDaEntrada,
    top: 0,
    left: "1%",
    width: "shrink",
    height: 1,
    border: false,
    content: giz.hex("#D9D9D9").bold(" BROX@> "),
    style: {
      bg: "#F21B2D",
    },
  });

  const entrada = blessed.textbox({
    parent: caixaDaEntrada,
    top: 0,
    left: "15%",
    width: "70%",
    height: 1,
    border: false,
    inputOnFocus: true,
    keys: true,
    interactive: true,
    style: {
      fg: "#D9D9D9",
    },
  });

  const processamento = blessed.progressbar({
    parent: caixaPrincipal,
    top: "10%",
    right: 2,
    width: "44%",
    height: 3,
    border: { type: "line" },
    label: "Processamento",
    orientation: "horizontal",
    filled: 50,
    ch: "█",
    value: 0,
    style: {
      bar: {
        bg: "#F21B2D",
      },
      border: {
        fg: "#F21B2D",
      },
    },
  });

  const navegacao = blessed.list({
    parent: caixaPrincipal,
    items: itensMenu,
    top: "24%",
    right: 2,
    width: "44%",
    height: 6,
    keys: true,
    scrollable: true,
    interactive: true,
    label: "Navegação",
    border: { type: "line" },
    style: {
      item: { fg: "#D9D9D9" },
      selected: { bg: "#F21B2D" },
      focus: { border: { fg: "#F21B2D" } },
    },
  });

  const informação = blessed.textarea({
    parent: caixaPrincipal,
    bottom: 1,
    right: 2,
    width: "44%",
    height: 13,
    keys: true,
    inputOnFocus: false,
    scrollable: true,
    interactive: true,
    value: "Cria um projeto usando um templete",
    label: "Informações",
    border: { type: "line" },
    style: {
      fg: "#D9D9D9",
      focus: { border: { fg: "#F21B2D" } },
    },
  });

  /*funções */
  function rodarProjeto() {
    entrada.setValue("");
    tela.render();
    entrada.focus();
  }

  function validacaoDoInput() {
    const valorComando = entrada.getValue().toLowerCase().trim();
    const comando = parser(valorComando.split(" "));
    analisarComando(comando);
    rodarProjeto();
  }

  function analisarComando(comando) {
    const comandoChave = comando._[0];
    const argumentoComando = comando._[1] || "";
    const comandoCompleto = `${comandoChave} ${argumentoComando}`;

    if (comandoChave === "") {
      saida.log("@>");
      return "";
    } else if (argumentoComando !== "") {
      switch (comandoCompleto) {
        case "menu ativo":
          saida.log("@>" + "Menu foi ativado");
          return "";
        default:
          saida.log(
            "@>" + "ERRO: Comando " + comandoCompleto + " desconhecido"
          );
          return "";
      }
    } else {
      switch (comandoChave) {
        case "menu":
          saida.log("@>" + "Menu ?");
          return "";
        case "cls":
          saida.setContent("");
          return "";
        default:
          saida.log(
            "@>" + "ERRO: Comando " + comandoCompleto + " desconhecido"
          );
          return "";
      }
    }
  }

  /*eventos*/
  saida.key(["escape", "C-c", "f1"], function (ch, key) {
    return process.exit(0);
  });
  saida.key("tab", function (ch, key) {
    informação.focus();
  });

  entrada.key(["escape", "C-c", "f1"], function (ch, key) {
    return process.exit(0);
  });
  entrada.key("enter", () => {
    validacaoDoInput();
  });
  entrada.key("tab", () => {
    entrada.options.inputOnFocus = false;
    caixaDaEntrada.options.style.border.fg = "#d9d9d9";
    entrada.setValue("");
    saida.focus();
  });

  navegacao.key(["escape", "C-c", "f1"], function (ch, key) {
    return process.exit(0);
  });

  informação.key(["escape", "C-c", "f1"], function (ch, key) {
    return process.exit(0);
  });
  informação.key("tab", function (ch, key) {
    entrada.options.inputOnFocus = true;
    caixaDaEntrada.options.style.border.fg = "#F21B2D";
    entrada.focus();
  });

  /*Adiciona o elemento principal à tela */
  tela.append(caixaPrincipal);

  rodarProjeto();
}
