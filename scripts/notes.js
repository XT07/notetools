import { db } from "../firebase/config.js";
import { collection, query, where, getDocs, deleteDoc, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

window.onload = () => {
    getData();
}

async function getData(){
    try{
        const dataNotes = collection(db, "anotacao");
        const specifyNote = query(dataNotes, where("Tema", "==", localStorage.getItem("temp")));
        const specifyNoteSp = await getDocs(specifyNote);
    
        let tema = document.getElementById("tema");
        tema.innerHTML = "Tema: " + localStorage.getItem("temp") + "<br>";
    
        specifyNoteSp.forEach(noteGeted => {
            let data = noteGeted.data();

            let div = document.createElement("div");
            let nameNote = document.createElement("h2");
            let anotation = document.createElement("h2");
            let note = document.createElement("p");
            let notesLast = document.getElementById("notesLast");
            let divForm = document.createElement("div");
            let btn = document.createElement("button");
            let btnDel = document.createElement("button");
            let formEdit = document.createElement("form");
            let formDelet = document.createElement("form");
            let noteNameDom = document.createElement("input");
            nameNote.classList.add("nameNotes");
            anotation.classList.add("nameNotes");
            divForm.classList.add("divForm");
            btn.classList.add("btnEdit");
            btnDel.classList.add("btnDel");
            div.setAttribute("id", "divTema");
            noteNameDom.setAttribute("type", "hidden");
            formEdit.setAttribute("onsubmit", "editNote(event, this)");
            formDelet.setAttribute("onsubmit", "delNote(event, this)");
            notesLast.appendChild(div);
            div.appendChild(nameNote);
            div.appendChild(anotation);
            div.appendChild(note);
            div.appendChild(divForm);
            divForm.appendChild(formEdit);
            divForm.appendChild(formDelet);
            formEdit.appendChild(btn);
            formEdit.appendChild(noteNameDom);
            formDelet.appendChild(btnDel);
            formDelet.appendChild(noteNameDom);
            noteNameDom.value = data.Nome;
            btn.innerHTML = "Editar";
            btnDel.innerHTML = "Deletar";
            nameNote.innerHTML = `Nome da anotação: ${data.Nome}`;
            anotation.innerHTML = `<br>Anotação:`;
            note.innerHTML = `<pre>${data.Anotacao}</pre>`;
        })
    }catch(e){
        console.log(e);
    }

}

async function editNote(event, form){
    event.preventDefault();
    let nameNote = form.querySelector("input").value;
    let noteUptDb = collection(db, "anotacao");
    let noteUptQuery = query(noteUptDb, where("Nome", "==", nameNote));

    let noteUptDoc = await getDocs(noteUptQuery);

    noteUptDoc.forEach(async (note) => {
        let id = doc(db, "anotacao", note.id);

        await updateDoc(id, {
            
        })
    })
}

async function delNote(event, form){
    let confirmation = confirm("ATENÇÃO ! Você está prestes a deletar uma anotação, tem certeza que quer continuar ?");
    event.preventDefault();
    let nameNote = form.querySelector("input").value;
    if(confirmation){
        try{
            let note = collection(db, "anotacao");
            let noteQuery = query(note, where("Nome", "==", nameNote));
            let noteDoc = await getDocs(noteQuery);
            noteDoc.forEach(async (doc) => {
                await deleteDoc(doc.ref);
            });
        }catch(e){
            console.log(e);
        }
    }
}

window.editNote = editNote;
window.delNote = delNote;
