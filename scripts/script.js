class Notes {

    constructor(tema, nome, note){
        this.tema = tema,
        this.name = nome,
        this.note = note
    }

    getNote(){
        return `Tema: ${this.tema}<br>Nome: ${this.name}<br>Anotação: ${this.note}`;
    }
}

let noteList = [];
let notes;

window.onload = () => {
    let storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    noteList = storedNotes.map(item => new Notes(item.tema, item.name, item.note));
    let row = document.getElementById("nomeTema");

    noteList.forEach(note => {
        let h2 = document.createElement("h2");
        h2.classList.add("rowTitle");
        row.appendChild(h2);

        h2.innerHTML = note.tema;
    })
}

function createNote(){
    let tema = document.getElementById("tema").value;
    let vinc = document.getElementsByName("temaAdd")[0].value;
    let nameNote = document.getElementById("nameNote").value;
    let note = document.getElementById("note").value;

    notes = new Notes(tema, nameNote, note);
    noteList.push(notes);

    alert("Anotação salva com sucesso");
    localStorage.setItem("notes", JSON.stringify(noteList));
};

function lastNote(){
    let list = JSON.parse(localStorage.getItem("notes")) || [];
    let lastNote = new Notes(list[list.length - 1].tema, list[list.length - 1].name, list[list.length - 1].note);
    let lastNotes = document.getElementById("lastNotes");
    lastNotes.innerHTML = lastNote.getNote();
}