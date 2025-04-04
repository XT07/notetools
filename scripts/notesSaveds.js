import { Notes } from "./NotesClass.js";

let noteList = [];

window.onload = () => {
    let storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    noteList = storedNotes.map(item => new Notes(item.tema, item.name, item.note));
    let row = document.getElementById("nomeTema");

    noteList.reverse().forEach(note => {
        let h2 = document.createElement("h2");
        let div = document.createElement("div");
        let btn = document.createElement("button");
        let form = document.createElement("form");
        let inputId = document.createElement("input");
        form.setAttribute("onsubmit", "getNote(event, this)");
        inputId.setAttribute("type", "hidden");
        inputId.value = note.tema;
        div.classList.add("rowTitle");
        btn.classList.add("verTema");
        btn.innerHTML = "Ver anotações";
        row.appendChild(div);
        div.appendChild(h2);
        div.appendChild(form);
        form.appendChild(btn);
        form.appendChild(inputId);

        h2.innerHTML = note.tema;
    })

    let filter = document.getElementById("filter");
    noteList.reverse().forEach(note => {
        let option = document.createElement("option");
        filter.appendChild(option);
        option.value = note.tema;
        option.innerHTML = note.tema;
    })
}

function getNote(event, form){
    event.preventDefault();
    let tema = form.querySelector("input").value;
    localStorage.setItem("temp", tema);
    window.location.href = "note.html";
}

function filterNotes() {
    let tema = document.getElementById("filter").value;
    let row = document.getElementById("nomeTema");

    row.innerHTML = "";

    let filteredNotes = noteList.filter(note => note.tema === tema);

    filteredNotes.reverse().forEach(note => {
        let h2 = document.createElement("h2");
        let div = document.createElement("div");
        let btn = document.createElement("button");
        div.classList.add("rowTitle");
        btn.classList.add("verTema");
        btn.innerHTML = "Ver anotações";
        row.appendChild(div);
        div.appendChild(h2);
        div.appendChild(btn);

        h2.innerHTML = note.tema;
    });
}

window.getNote = getNote;
window.filterNotes = filterNotes; 