export class Notes {

    constructor(tema, nome, note){
        this.tema = tema,
        this.name = nome,
        this.note = note
    }

    getNote(){
        return `Tema: ${this.tema}<br>Nome: ${this.name}<br>Anotação: ${this.note}`;
    }
}