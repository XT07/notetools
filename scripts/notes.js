window.onload = () => {
    let noteList = [];
    let storedNotes = JSON.parse(localStorage.getItem("notes"));
    noteList = storedNotes.map(notes => new Notes(notes.tema, notes.name, notes.note));
    let tema = document.getElementById("tema");
    let nameNote = document.getElementById("nameNote");
    let note = document.getElementById("note");
    tema.innerHTML = "Tema: " + localStorage.getItem("temp") + "<br>";
    for(let i = 1; i <= noteList.length; i++){
        if(noteList[i -1].tema == localStorage.getItem("temp")){
            nameNote.innerHTML = `Nome da anotação: ${noteList[i -1].name}`;
            note.innerHTML = `Anotação:<br><pre>${noteList[i -1].note}</pre>`;
        }
    }
}