if(!localStorage.getItem("ciente") || localStorage.getItem("ciente") == false){
    let ciente = confirm("Está página não possui banco de daods para guardar as informações, guardamos tudo no localStorage do seu própio computador. Tome cuidado se for apagar os seus dados do navegador para não apagar os seus dados salvos aqui");
    if(ciente){
        localStorage.setItem("ciente", true);
    }else{
        localStorage.setItem("ciente", false);
    }
}