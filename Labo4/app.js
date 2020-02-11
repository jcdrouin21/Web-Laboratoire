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


    var requestOptions = {
        method: 'POST',
        redirect: 'follow',
        method: 'cors',
        header: new Headers({'name': task})
    }
    fetch('https://glo3102lab4.herokuapp.com/' + userId + '/tasks', requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .then(error => console.log('error', error));
}
