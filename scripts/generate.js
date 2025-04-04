import { Notes } from "./NotesClass.js";

let noteList = [];
let notes;

function createNote(){
    let tema = document.getElementById("tema").value;
    let nameNote = document.getElementById("nameNote").value;
    let note = document.getElementById("note").value;

    notes = new Notes(tema, nameNote, note);
    noteList.push(notes);

    alert("Anotação salva com sucesso");
    localStorage.setItem("notes", JSON.stringify(noteList));
};