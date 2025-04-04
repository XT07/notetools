import { Notes } from "./NotesClass.js";

window.onload = () => {
    let noteList = [];
    let storedNotes = JSON.parse(localStorage.getItem("notes"));
    noteList = storedNotes.map(notes => new Notes(notes.tema, notes.name, notes.note));
    let tema = document.getElementById("tema");
    tema.innerHTML = "Tema: " + localStorage.getItem("temp") + "<br>";
    for(let i = 1; i <= noteList.length; i++){
        if(noteList[i -1].tema == localStorage.getItem("temp")){
            let div = document.createElement("div");
            let nameNote = document.createElement("h2");
            let anotation = document.createElement("h2");
            let note = document.createElement("p");
            let notesLast = document.getElementById("notesLast");
            nameNote.classList.add("nameNotes");
            anotation.classList.add("nameNotes");
            div.setAttribute("id", "divTema");
            notesLast.appendChild(div);
            div.appendChild(nameNote);
            div.appendChild(anotation);
            div.appendChild(note);
            nameNote.innerHTML = `Nome da anotação: ${noteList[i -1].name}`;
            anotation.innerHTML = `<br>Anotação:`;
            note.innerHTML = `<pre>${noteList[i -1].note}</pre>`;
        }
    }
}