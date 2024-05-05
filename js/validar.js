// Criando os objetos dos elementos de texto do form
var nome = document.querySelector("#inputName");
var nomeHelp = document.querySelector("#inputNameHelp");
var ano = document.querySelector("#inputYear");
var anoHelp = document.querySelector("#inputYearHelp");
var email = document.querySelector("#inputEmail");
var emailHelp = document.querySelector("#inputEmailHelp");
var senha = document.querySelector("#inputPassword");
var senhaHelp = document.querySelector("#inputPasswordHelp");
var meter = document.querySelector("#passStrengthMeter");

// Declarando o evento listener para o campo de texto do form. 
nome.addEventListener('focusout', validarNome);
ano.addEventListener('focusout', validarAno);
email.addEventListener('focusout', validarEmail);
senha.addEventListener('focusout', validarSenha);

function validarNome(e){ 
    const regexNome = /^[A-Za-z]{7,}$/;
    if(e.target.value.trim().match(regexNome)==null){
        nomeHelp.textContent = "Formato de nome inválido"; 
        nomeHelp.style.color="red";
    }
    else{
        nomeHelp.textContent = "";
    }
}

function validarAno(e){
    const regexAno = /^(19[0-9]{2}|200[0-9]|202[0-2])$/;
    if(e.target.value.trim().match(regexAno)==null){
        anoHelp.textContent = "Ano de nascimento inválido";
        anoHelp.style.color="red";
    }
    else{
        anoHelp.textContent = "";
    }
}

function validarEmail(e){
    const regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.(br|com|net|org)$/;
    if(e.target.value.trim().match(regexEmail)==null){
        emailHelp.textContent = "Formato de email inválido";
        emailHelp.style.color="red";
    }
    else{
        emailHelp.textContent = "";
    }
}

function validarSenha(e){
    const regexSenha = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@#%&!+]).{6,20}$/;
    const senhaTrimada = e.target.value.trim();
    if(senhaTrimada.match(regexSenha)==null || senhaTrimada.includes(nome.value) || senhaTrimada.includes(ano.value)){
        senhaHelp.textContent = "Senha inválida";
        senhaHelp.style.color="red";
    }
    else{
        senhaHelp.textContent = avaliarForcaSenha(senhaTrimada);
    }
}

function avaliarForcaSenha(senha){
    const regexCaractereEspecial = /[@#%&!+]/;
    const regexNumero = /[0-9]/;
    const regexLetraMaiuscula = /[A-Z]/;

    const possuiCaractereEspecial = regexCaractereEspecial.test(senha);
    const possuiNumero = regexNumero.test(senha);
    const possuiLetraMaiuscula = regexLetraMaiuscula.test(senha);

    let forcaSenha = 0;

    if (senha.length >= 8 && (possuiCaractereEspecial && possuiNumero)) {
        forcaSenha++;
    }
    if (senha.length > 8 && (possuiCaractereEspecial && possuiNumero && possuiLetraMaiuscula)) {
        forcaSenha++;
    }
    if (senha.length > 12 && (senha.match(/[@#%&!+]/g) || []).length > 1 && (senha.match(/[0-9]/g) || []).length > 1 && (senha.match(/[A-Z]/g) || []).length > 1) {
        forcaSenha++;
    }

    const meter = document.querySelector("#passStrengthMeter");
    meter.value = forcaSenha * 10; // Ajuste conforme necessário

    if (forcaSenha === 1) {
        return "Senha fraca";
    }
    if (forcaSenha === 2) {
        return "Senha moderada";
    }
    if (forcaSenha === 3) {
        return "Senha forte";
    }
}


