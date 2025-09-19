/*Variaveis globais */
const menuPrincipal = ["Novo Projeto", "Servidores", "<-Encerrar"];
const menuNovoProjeto = ['Desktop','Mobile','Web','BackEnd',"<-Voltar"];

//passe 1 comece adicionar por aqui
const Servidores = ['Adicionar','jovem-flex','rede-secreta','<-Voltar']

/*funções de navegação */
function tiposMenu(posicao) {
    switch (posicao) {
        case 0:
            return menuNovoProjeto;
        case 1:
            return Servidores;
        default:
            break;
    }
}



function informacoesMenu() {
    return 'O comando {bold}MENU{/bold} tem a seguinte sintaxe:\n          [comando] [argumento] \ncomandos: menu; \nargumentos: ativar ou a;'
}

/*exportação de todo */
module.exports= {
    menuPrincipal,
    tiposMenu,
    informacoesMenu,

};