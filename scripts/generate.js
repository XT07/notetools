import { db } from "../firebase/config.js";
import { collection, addDoc, getDocs, where, query } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

async function createNote(){
    let tema = document.getElementById("tema").value;
    let nameNote = document.getElementById("nameNote").value;
    let note = document.getElementById("note").value;

    try {
        const temaVerif = collection(db, "temas");
        const temaQuery = query(temaVerif, where("Nome", "==", tema.toUpperCase()));
        const temaVerified = await getDocs(temaQuery);

        let tempTema =  tema.toUpperCase();

        if(temaVerified.empty){
            const docTema = await addDoc(collection(db, "temas"), {
                Nome: tempTema
            });
        }

        const docNote = await addDoc(collection(db, "anotacao"), {
            Tema: tempTema,
            Nome: nameNote,
            Anotacao: note
        });

        window.location.href = "index.html";
    }catch(e){
        console.log(`Não foi possivel adicionar os dados na tabela erro | ${e}`);
    };
};

window.createNote = createNote;