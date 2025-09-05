/*Dependências externas */
const {input} = require('@inquirer/prompts');
const fs = require('fs-extra');

/*variaveis globais*/
const arquivoTemp = 'C:/Users/AGROJESANT/Documents/Desenvolvimento/CLI-BROX/src/resource/mensagens.json';
let dados = {
  nome:'',
  hora:''
}

async function nomePasta() {
    const nome = await input({
      message: 'Digite o nome do projeto:',
      validate: value => value.trim() !== '' || 'Nome é obrigatório!'
    });
    dados = {
      nome:nome,
      hora: new Date().toLocaleTimeString()
    }
    await fs.writeJSON(arquivoTemp,dados,{spaces:2});
}

nomePasta();
