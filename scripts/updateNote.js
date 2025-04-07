import { db } from "../firebase/config.js";
import { updateDoc, query, where, doc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

window.onload = async () => {
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
    let getStored = localStorage.getItem("tempNote");
    let noteUptDb = collection(db, "anotacao");
    let noteUptQuery = query(noteUptDb, where("Nome", "==", getStored));

    let noteUptDoc = await getDocs(noteUptQuery);

    let tema = document.getElementById("tema");
    let nameNoteForm = document.getElementById("nameNote");
    let note = document.getElementById("note");

    noteUptDoc.forEach(async (notes) => {
        alert("estou aqui");
        try{
            let id = doc(db, "anotacao", notes.id);
            alert("estou aaaaqui");
            await updateDoc(id, {
                Nome: nameNoteForm.value,
                Anotacao: note.value,
                Tema: tema.value
            })
        }catch(e){
            console.log(e);
        }
    })
}

window.update = update;