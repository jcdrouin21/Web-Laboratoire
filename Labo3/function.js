function notification() {
    document.getElementById("erreur").addEventListener('click', () => {
        document.getElementById("results").innerHTML += "<div class='notif Erreur'><h1> Erreur </h1><h3>" +
            document.getElementById('input').value + "</h3>"
        remove();
    })

    document.getElementById("succes").addEventListener('click', () => {
        document.getElementById("results").innerHTML += "<div class='notif Succès'><h1> Succès </h1><h3>" +
            document.getElementById('input').value + "</h3>"
        remove();
    })

    document.getElementById("info").addEventListener('click', () => {
        document.getElementById("results").innerHTML += "<div class='notif Info'><h1> Info </h1><h3>" +
            document.getElementById('input').value + "</h3>"
        remove();
    })
}

function remove(){
    setTimeout(() => {
        document.getElementById("results").childNodes[0].remove()
    },3000);
}

export { notification, remove };