function irLogin(event){
    event.preventDefault();
    window.location.href = "login.html";
}

function irCadastro(event){
    event.preventDefault();
    window.location.href = "cadastro.html";
}

window.irCadastro = irCadastro;
window.irLogin = irLogin;
window.login = login;
window.cadastrar = cadastrar;