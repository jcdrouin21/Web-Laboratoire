var userId;

function createUser() {
    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
    }
    fetch('https://glo3102lab4.herokuapp.com/users ', requestOptions)
        .then(response => response.text())
        .then(result => {
            userId = JSON.parse(result).id;
        })
        .then(error => console.log('error', error));
}

function addTask(){
    var task = document.getElementById("inputTask").value;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"name": task});

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://glo3102lab4.herokuapp.com/" + userId + "/tasks", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .then( () => getTasks() )
        .catch(error => console.log('error', error));

}

function getTasks(){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

     fetch("https://glo3102lab4.herokuapp.com/" + userId + "/tasks", requestOptions)
        .then(response => response.text())
        .then(result => {
            document.getElementById("tasksList").innerHTML = '';
            var results = JSON.parse(result).tasks;
            for (let i = 0; i < results.length; i++) {
                document.getElementById("tasksList").innerHTML += "<div class='taskName' name='" + results[i].id + "'>" + results[i].name + "</div>"
            }
        })
        .catch(error => console.log('error', error));


}

function modifyTask(){
    var taskId = document.getElementById("inputTask").name;
    var task = document.getElementById("inputTask").value;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"name":task});

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://glo3102lab4.herokuapp.com/" + userId + "/tasks/" + taskId, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

function deleteTask(){
    var taskId = document.getElementById("inputTask").name;
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };

    fetch("https://glo3102lab4.herokuapp.com/" + userId + "/tasks/" + taskId, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}