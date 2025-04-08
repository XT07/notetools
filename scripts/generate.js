import { db } from "../firebase/config.js";
import { collection, addDoc, getDocs, where, query, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

window.onload = () => {
    if(localStorage.getItem("logado") == "false" || !localStorage.getItem("logado")){
        window.location.href = "login.html";
    }
}

async function createNote(){
    let tema = document.getElementById("tema").value;
    let nameNote = document.getElementById("nameNote").value;
    let note = document.getElementById("note").value;

    try {
        const getId = collection(db, "users");
        const getedId = query(getId, where("Email", "==", localStorage.getItem("email")));
        const docsId = await getDocs(getedId);
        let docIdGet = docsId.docs[0];
        let docId = docIdGet.id;
        const temaVerif = collection(db, "temas");
        const temaQuery = query(temaVerif, where("Nome", "==", tema.toUpperCase()),
        where("idUser", "==", docId));
        const temaVerified = await getDocs(temaQuery);

        let tempTema =  tema.toUpperCase();

        if(temaVerified.empty){
            const docTema = await addDoc(collection(db, "temas"), {
                Nome: tempTema,
                idUser: docId
            });
        }

        const docNote = await addDoc(collection(db, "anotacao"), {
            Tema: tempTema,
            Nome: nameNote,
            Anotacao: note,
            idUser: docId
        });

        window.location.href = "index.html";
    }catch(e){
        console.log(`Não foi possivel adicionar os dados na tabela erro | ${e}`);
    };
};

function logout(){
    localStorage.setItem("logado", false);
    localStorage.setItem("email", "");

    window.location.href = "login.html";
}

window.createNote = createNote;
window.logout = logout;