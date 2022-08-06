const len_forms = document.getElementsByClassName('qtds').length;
const precos = [7.50, 6.00, 100.00, 10.0, 41.0, 13.0];
const estoque = [10, 25, 200, 10, 5, 12];
const nomes = ['Leite', 'Feijão', 'Bolo', 'Corote', '51', 'Vinho'];

const nomes_clientes = []
const emails = []
const senhas = []
const idades = []
const pontos_hype = []

function fazerTotal() {
    let total = 0;
    for (let i = 0; i < len_forms; i++)
        total += document.getElementsByClassName('qtds')[i].value * precos[i];
    document.getElementById('total').innerHTML = total;
    return total;
}

function quantidade0() {
    for (let i = 0; i < len_forms; i++)
        document.getElementsByClassName('qtds')[i].value = "0";
}

function setPrecos() {
    for (let i = 0; i < len_forms; i++)
        document.getElementsByClassName('precos')[i].innerHTML = precos[i];
}
function arrumaIntervalo() {
    for (let i = 0; i < len_forms; i++) {
        var valor = document.getElementsByClassName('qtds');
        if (valor[i].value > estoque[i] || isNaN(parseInt(valor[i].value)))
            valor[i].value = "0";
    }
    var valor = document.getElementById('idade-cadastro')
    if (isNaN(parseInt(valor.value)) && valor.value != '')
        valor.value = "0"
}

function fazerPedido() {
    if (fazerTotal() == 0)
        return;
    var frase = "Registro da compra\n";
    for (let i = 0; i < len_forms; i++) {
        if (document.getElementsByClassName('qtds')[i].value == 0)
            continue;
        frase += nomes[i] + ": " + document.getElementsByClassName('qtds')[i].value + ". Subtotal: R$" +
            precos[i] * document.getElementsByClassName('qtds')[i].value + "\n";
    }
    var login = document.getElementById("login").value
    var desconto = pontos_hype[emails.indexOf(login)]
    pontos_hype[emails.indexOf(login)] = fazerTotal() / 100
    frase += "Total do pedido: R$" + fazerTotal() + "\nDesconto hype R$: " + desconto + "\nNovo Total: R$" + (fazerTotal() - desconto)
     + "\nVocê ganhou " + pontos_hype[emails.indexOf(login)] + " pontos hype";
    alert(frase);
    for (let i = 0; i < len_forms; i++)
        estoque[i] -= document.getElementsByClassName('qtds')[i].value;
    quantidade0();
    autalizaHype()
}

function fazerLogin() {
    var login = document.getElementById("login").value
    var senha = document.getElementById("senha").value
    if (emails.includes(login) && senha == senhas[emails.indexOf(login)]) {
        document.getElementsByClassName("produtos")[0].style.display = "flex"
        document.getElementsByClassName("produtos")[0].scrollIntoView()
        document.getElementById("nome-tela-compras").innerHTML = nomes_clientes[emails.indexOf(login)]
        document.getElementById("hype").innerHTML = pontos_hype[emails.indexOf(login)]
        document.getElementById("login-tela").style.display = 'none'
        if (idades[emails.indexOf(login)] < 18)
            document.getElementById('bebida').style.display = 'none'
        else
        document.getElementById('bebida').style.display = 'flex'
    }
    else
        alert("Usuário ou senha incorretos. Tente novamente.")
}

function fazerCadastro() {
    document.getElementById("cadastro-div").style.display = "block"
    document.getElementById("h3").style.marginBottom = "0"
    document.getElementById("cadastro-div").scrollIntoView()
    document.getElementById('login-tela').style.display = 'none'
}

function concluirCadastro() {
    var nome = document.getElementById("nome-cadastro").value
    var email = document.getElementById("email-cadastro").value
    var senha = document.getElementById("senha-cadastro").value
    var idade = document.getElementById('idade-cadastro').value
    if (emails.includes(email)) {
        document.getElementById("cadastro-div").style.display = 'none'
        document.getElementById("login-tela").style.display = 'block'
        document.getElementById("login-tela").scrollIntoView()
        alert("Email já utilizado. Tente novamente")
    } else if (nome == "" || senha == "" || email == "")
        alert("Você não pode deixar campos vazios. Tente novamente")
    else {
        nomes_clientes.push(nome)
        emails.push(email)
        senhas.push(senha)
        idades.push(idade)
        pontos_hype.push(0)
        document.getElementById("cadastro-div").style.display = 'none'
        document.getElementById("login-tela").style.display = 'block'
        document.getElementById("login-tela").scrollIntoView()
        alert("Cadastro feito com sucesso")
    }
    setValores()

}

function sairDaConta() {
    document.getElementsByClassName("produtos")[0].style.display = 'none'
    document.getElementsByClassName("hero")[0].scrollIntoView()
    document.getElementById("login-tela").style.display = "block"
    setValores()
}

function setValores() {
    for (let i = 0; i < 5; i++)
        document.getElementsByClassName('texto')[i].value = ""
}

function autalizaHype() {
    var login = document.getElementById("login").value
    document.getElementById("hype").innerHTML = pontos_hype[emails.indexOf(login)]
}
setValores();
quantidade0();
setPrecos();
setInterval(fazerTotal, 10);
setInterval(arrumaIntervalo, 1);
