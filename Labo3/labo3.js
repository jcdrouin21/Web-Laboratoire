export function notifRequest(button) {
    alert("notif");
    document.getElementById("results").innerHTML += `<div class='notif ${button.name}'><h1>` + button.name + "</h1><h3>" +
        document.getElementById('input').value + "</h3>"
    setTimeout(() => {
        document.getElementById("results").childNodes[0].remove()
    },3000);
}




