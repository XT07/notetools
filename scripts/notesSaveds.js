import { db } from "../firebase/config.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

window.onload = () => {
    getSavedNotes();
    filter();

}

async function filter(){
    const notesSavedDD = collection(db, "temas");
    const notesGet = await getDocs(notesSavedDD);
    let filter = document.getElementById("filter");

    notesGet.forEach(notes => {
        const data = notes.data();

        let option = document.createElement("option");
        filter.appendChild(option);
        option.value = data.Nome;
        option.innerHTML = data.Nome;
    });
}

function getNote(event, form){
    event.preventDefault();
    let tema = form.querySelector("input").value;
    localStorage.setItem("temp", tema);
    window.location.href = "note.html";
}

async function getSavedNotes(){
    let row = document.getElementById("nomeTema");
    const notesSavedDD = collection(db, "temas");
    const notesGet = await getDocs(notesSavedDD);

    notesGet.forEach(notes => {
        const data = notes.data();

        let h2 = document.createElement("h2");
        let div = document.createElement("div");
        let btn = document.createElement("button");
        let form = document.createElement("form");
        let inputId = document.createElement("input");
        form.setAttribute("onsubmit", "getNote(event, this)");
        inputId.setAttribute("type", "hidden");
        inputId.value = data.Nome;
        div.classList.add("rowTitle");
        btn.classList.add("verTema");
        btn.innerHTML = "Ver anotações";
        row.appendChild(div);
        div.appendChild(h2);
        div.appendChild(form);
        form.appendChild(btn);
        form.appendChild(inputId);

        h2.innerHTML = data.Nome;
    })

}

window.getNote = getNote;