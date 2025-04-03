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

    noteList.reverse().forEach(note => {
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
    })

    let filter = document.getElementById("filter");
    noteList.reverse().forEach(note => {
        let option = document.createElement("option");
        filter.appendChild(option);
        option.value = note.tema;
        option.innerHTML = note.tema;
    })
    
}

function createNote(){
    let tema = document.getElementById("tema").value;
    let vinc = document.getElementsByName("temaAdd").checked;
    let nameNote = document.getElementById("nameNote").value;
    let note = document.getElementById("note").value;

    notes = new Notes(tema, nameNote, note);
    noteList.push(notes);

    alert("Anotação salva com sucesso");
    localStorage.setItem("notes", JSON.stringify(noteList));
};

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
