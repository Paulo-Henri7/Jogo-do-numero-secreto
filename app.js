let numeroSorteado = [];
let numeroMaximo = 10;
let numeroSecreto = gerarNumeroAleatorio();
let numTentativa = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;

    if ("speechSynthesis" in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = "pt-BR";
        utterance.rate = 1.2;
        window.speechSynthesis.speak(utterance);
    } else {
        console.log("Web Speech API não suporta esse navegador");
    }
}

console.log(numeroSecreto);
mensagemInicial();

function mensagemInicial() {
    exibirTextoNaTela("h1", "Jogo do número secreto");
    exibirTextoNaTela("p", `Escolha um número entre 1 e ${numeroMaximo}.`);
}

function verificarChute() {
    let chute = document.querySelector("input").value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela("h1", "Você acertou!");
        let palavraTentativa = numTentativa > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `Você descobriu o número secreto (${numeroSecreto}) com ${numTentativa} ${palavraTentativa}.`;
        exibirTextoNaTela("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");

    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela("p", `O número secreto é menor que ${chute}.`);

        } else {
            exibirTextoNaTela("p", `O número secreto é maior que ${chute}.`);
        }
        numTentativa++;
        limpaCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
    let quantidadeDeElementosLista = numeroSorteado.length;
    if (quantidadeDeElementosLista == numeroMaximo) {
        numeroSorteado = [];
    }

    if (numeroSorteado.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        numeroSorteado.push(numeroEscolhido);
        console.log(numeroSorteado)
        return numeroEscolhido;
    }
}

function limpaCampo() {
    chute = document.querySelector("input");
    chute.value = " ";
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limpaCampo();
    numTentativa = 1;
    mensagemInicial();
    desabilitarBotaNovoJogo();
    console.log(numeroSecreto);
}

function desabilitarBotaNovoJogo() {
    document.getElementById("reiniciar").setAttribute("disabled", true);
}