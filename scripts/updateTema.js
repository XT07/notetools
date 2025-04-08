import { db } from "../firebase/config.js";
import { collection, query, where, getDocs, updateDoc, deleteDoc , doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

async function saveEditTema(event, form){
    const idDocs = collection(db, "users");
    const idQuery = query(idDocs, where("Email", "==", localStorage.getItem("email")));
    const idDocsGeted = await getDocs(idQuery);
    let idGeted = idDocsGeted.docs[0];
    let id = idGeted.id;
    let temaNew = document.getElementById("tema").value;
    let temaUpper = temaNew.toUpperCase();
    let tema = localStorage.getItem("temp");
    let temaOldUpper = tema.toUpperCase();
    let temaDocDb = collection(db, "temas");
    let temaQuery = query(temaDocDb, where("Nome", "==", temaOldUpper),
    where("idUser", "==", id));
    let notesDb = collection(db, "anotacao");
    let noteQuery = query(notesDb, where("Tema", "==", temaOldUpper),
    where("idUser", "==", id));
    let note = await getDocs(noteQuery);

    let temaDoc = await getDocs(temaQuery);

    try{
        temaDoc.forEach(async idGet => {
            let id = doc(db, "temas", idGet.id);
    
            await updateDoc(id, {
                Nome: temaUpper
            })
        })

        note.forEach(async noteId => {
            let id = doc(db, "anotacao", noteId.id);
    
            await updateDoc(id, {
                Tema: temaUpper
            })
        })
    }catch(e){
        console.log(e);
    }

    setTimeout(() => {
        window.location.href = "index.html";
    }, 1000);
}

window.saveEditTema = saveEditTema;