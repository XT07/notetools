import { db } from "../firebase/config.js";
import { collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

function irLogin(event){
    event.preventDefault();
    window.location.href = "login.html";
}

function irCadastro(event){
    event.preventDefault();
    window.location.href = "cadastro.html";
}

async function login(event, form){

}

async function cadastrar(event, form){
    let login = document.getElementById("user").value;
    let loginReplaced = login.replace(/[-."']/g, "");
    let email = document.getElementById("email").value;
    let termos = document.getElementById("termos").checked;
    let attTermos = document.getElementById("attTermos").checked;
    let alerta = document.getElementById("alerta");

    if(termos){
        event.preventDefault();
        if(login.trim() === "" || email.trim() === ""){
            alert("Coloque um user/CPF e um email válido");
        }else{
            try{
                if(attTermos){
                    let addUser = await addDoc(collection(db, "users"), {
                        Login: loginReplaced,
                        Email: email,
                        Att: attTermos,
                        termos: true
                    });
                }else{
                    let addUser = await addDoc(collection(db, "users"), {
                        Login: loginReplaced,
                        Email: email,
                        Att: attTermos,
                        termos: true
                    });
                }
            }catch(e){
                console.log(e);
            }

            window.location.href = "login.html";
        }
    }else{
        event.preventDefault();
        alert("ATENÇÃO! para usar a nossa plataformas e criar uma conta, você precisa aceitar os termos de uso");
        alerta.innerHTML = "ATENÇÃO! para usar a nossa plataformas e criar uma conta, você precisa aceitar os termos de uso<br>";
    }

}

window.irCadastro = irCadastro;
window.irLogin = irLogin;
window.login = login;
window.cadastrar = cadastrar;