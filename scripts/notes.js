import { db } from "../firebase/config.js";
import { collection, query, where, getDocs, deleteDoc, } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

window.onload = () => {
    if(localStorage.getItem("logado") == "false" || !localStorage.getItem("logado")){
        window.location.href = "login.html";
    }
    
    getData();
}

async function getData(){
    try{
        const idDocs = collection(db, "users");
        const idQuery = query(idDocs, where("Email", "==", localStorage.getItem("email")));
        const idDocsGeted = await getDocs(idQuery);
        let idGeted = idDocsGeted.docs[0];
        let id = idGeted.id;
        const dataNotes = collection(db, "anotacao");
        const specifyNote = query(dataNotes, where("Tema", "==", localStorage.getItem("temp")),
        where("idUser", "==", id));
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
            let noteNameDomDelet = document.createElement("input");
            nameNote.classList.add("nameNotes");
            anotation.classList.add("nameNotes");
            divForm.classList.add("divForm");
            btn.classList.add("btnEdit");
            btnDel.classList.add("btnDel");
            div.setAttribute("id", "divTema");
            noteNameDom.setAttribute("type", "hidden");
            noteNameDomDelet.setAttribute("type", "hidden");
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
            formDelet.appendChild(noteNameDomDelet);
            noteNameDom.value = data.Nome;
            noteNameDomDelet.value = data.Nome;
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
    localStorage.setItem("tempNote", nameNote);

    window.location.href = "update.html";
}

async function delNote(event, form){
    let confirmation = confirm("ATENÇÃO ! Você está prestes a deletar uma anotação, tem certeza que quer continuar ?");
    event.preventDefault();
    let nameNote = form.querySelector("input").value;
    if(confirmation){
        try{
            const idDocs = collection(db, "users");
            const idQuery = query(idDocs, where("Email", "==", localStorage.getItem("email")));
            const idDocsGeted = await getDocs(idQuery);
            let idGeted = idDocsGeted.docs[0];
            let id = idGeted.id;
            let note = collection(db, "anotacao");
            let noteQuery = query(note, where("Nome", "==", nameNote),
            where("idUser", "==", id));
            let noteDoc = await getDocs(noteQuery);
            
            noteDoc.forEach(async (doc) => {
                await deleteDoc(doc.ref);
            });

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }catch(e){
            console.log(e);
        }
    }
}

function logout(){
    localStorage.setItem("logado", false);
    localStorage.setItem("email", "");

    window.location.href = "login.html";
}

window.editNote = editNote;
window.delNote = delNote;
window.logout = logout;