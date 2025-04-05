import { db } from "../firebase/config.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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
            nameNote.classList.add("nameNotes");
            anotation.classList.add("nameNotes");
            divForm.classList.add("divForm");
            btn.classList.add("btnEdit");
            div.setAttribute("id", "divTema");
            divForm.setAttribute("onsubmit", "editNote(event, this)");
            notesLast.appendChild(div);
            div.appendChild(nameNote);
            div.appendChild(anotation);
            div.appendChild(note);
            div.appendChild(divForm);
            divForm.appendChild(btn);
            divForm.appendChild(btnDel);
            btn.innerHTML = "Editar";
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
    let tema = form.querySelector("input");
}