/*Dependências externas */
const {input,select} = require('@inquirer/prompts');
const fs = require('fs-extra');
const database = require('better-sqlite3');

//configurações do db
const db = new database('C:/Users/AGROJESANT/Documents/Desenvolvimento/CLI-BROX/src/db/cli-brox.db');

/*variaveis globais*/
let dados = {
  nome:'',
  caminho:'',
  tipo:'Dinamico',
  funcao:''
}

function enviarDados(dados) {
  let enviar = db.prepare(`insert into pastas (nome,caminho,tipo,funcao) values (?,?,?,?);`);
  enviar.run(dados.nome,dados.caminho,dados.tipo,dados.funcao);
}

async function novoServidor() {
    const nome = await input({
      message: 'Digite o nome do servidor:',
      validate: value => value.trim() !== '' || 'Nome é obrigatório!'
    });
    const caminho = await input({
      message: 'Digite o caminho:',
      validate: value => value.trim() !== '' || 'caminho é obrigatório!'
    });
    const funcao = await select({
        message:'escolhe a função do servidor:',
        choices:[
            {name:'web',value:'web'},
            {name:'api',value:'api'},
        ],
        pageSize:4,
        default:0
    });
    dados = {
     nome:nome,
     caminho:caminho,
     tipo:'Dinamico',
     funcao:funcao
    }

    enviarDados(dados);
}

novoServidor();
