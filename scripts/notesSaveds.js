import { db } from "../firebase/config.js";
import { collection, query, where, getDocs, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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
    let tempTema = tema.toUpperCase();
    localStorage.setItem("temp", tempTema);
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
        let inputIdTema = document.createElement("input");
        let inputIdTemaDel = document.createElement("input");
        let btnDel = document.createElement("button");
        let btnEdit = document.createElement("button");
        let formDel = document.createElement("form");
        let formEdit = document.createElement("form");
        form.setAttribute("onsubmit", "getNote(event, this)");
        inputId.setAttribute("type", "hidden");
        inputIdTema.setAttribute("type", "hidden");
        inputIdTemaDel.setAttribute("type", "hidden");
        formDel.setAttribute("onsubmit", "delTema(event, this)");
        formEdit.setAttribute("onsubmit", "editTema(event, this)");
        div.classList.add("rowTitle");
        btn.classList.add("verTema");
        btnDel.classList.add("btnDelTema");
        btnEdit.classList.add("btnEditTema");
        row.appendChild(div);
        div.appendChild(h2);
        div.appendChild(form);
        div.appendChild(formDel);
        div.appendChild(formEdit);
        formDel.appendChild(btnDel);
        formEdit.appendChild(btnEdit);
        formDel.appendChild(inputIdTemaDel);
        formEdit.appendChild(inputIdTema);
        form.appendChild(btn);
        form.appendChild(inputId);
        btnDel.innerHTML = "Deletar";
        btnEdit.innerHTML = "Editar";
        btn.innerHTML = "Ver anotações";
        inputId.value = data.Nome;
        inputIdTema.value = data.Nome;
        inputIdTemaDel.value = data.Nome;
        h2.innerHTML = data.Nome;
    })

}

async function delTema(event, form){
    let temaDocDb = aollection(db, "temas");
}

window.getNote = getNote;
window.delTema = delTema;
window.editTema = editTema;