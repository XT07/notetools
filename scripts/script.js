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

function createNote(){
    let storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    noteList = storedNotes.map(item => new Notes(item.tema, item.name, item.note));

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