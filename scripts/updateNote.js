import { db } from "../firebase/config.js";
import { updateDoc, query, where, doc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

window.onload = async () => {
    if(localStorage.getItem("logado") == "false" || !localStorage.getItem("logado")){
        window.location.href = "login.html";
    }
    
    let getStored = localStorage.getItem("tempNote");
    let noteUptDb = collection(db, "anotacao");
    let noteUptQuery = query(noteUptDb, where("Nome", "==", getStored));

    let noteUptDoc = await getDocs(noteUptQuery);

    let tema = document.getElementById("tema");
    let nameNoteForm = document.getElementById("nameNote");
    let note = document.getElementById("note");

    noteUptDoc.forEach(notes => {
        let data = notes.data();
        console.log(data);

        tema.value = data.Tema;
        nameNoteForm.value = getStored;
        note.value = data.Anotacao;
    })
}

async function update(){
    let idDocs = collection(db, "users");
    let idQuery = query(idDocs, where("Email", "==", localStorage.getItem("email")));
    let idDoc = await getDocs(idQuery);
    let idDocc = idDoc.docs[0];
    let id = idDocc.id;
    let getStored = localStorage.getItem("tempNote");
    let noteUptDb = collection(db, "anotacao");
    let noteUptQuery = query(noteUptDb, where("Nome", "==", getStored),
    where("idUser", "==", id));

    let noteUptDoc = await getDocs(noteUptQuery);

    let tema = document.getElementById("tema");
    let nameNoteForm = document.getElementById("nameNote");
    let note = document.getElementById("note");

    noteUptDoc.forEach(async (notes) => {
        try{
            let id = doc(db, "anotacao", notes.id);
            await updateDoc(id, {
                Nome: nameNoteForm.value,
                Anotacao: note.value,
                Tema: tema.value
            })
        }catch(e){
            console.log(e);
        }

        window.location.href = "note.html";
    })
}

function logout(){
    localStorage.setItem("logado", false);
    localStorage.setItem("email", "");

    window.location.href = "login.html";
}

window.update = update;
window.logout = logout;