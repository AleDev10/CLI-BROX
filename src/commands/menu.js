/*Variaveis globais */
const menuPrincipal = ["Novo Projeto", "Servidores", "<-Voltar"];
const menuNovoProjeto = ['Desktop','Mobile','Web','Servidor',"<-Voltar"];
const Servidores = ['jovem-flex','<-Voltar']

/*funções de navegação */
function tiposMenu(posicao) {
    switch (posicao) {
        case 0:
            return menuNovoProjeto;
            break;
        case 1:
            return Servidores;
            break;
        default:
            return '';
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