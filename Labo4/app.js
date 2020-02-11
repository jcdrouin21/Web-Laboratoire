const request = new XMLHttpRequest();
const url='https://glo3102lab4.herokuapp.com/';

function createUser() {
    request.open("POST", url + "Vincent", true);
    request.send();
    console.log(request.responseText);

}

