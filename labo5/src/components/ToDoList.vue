<template>
    <div>
        <div>
            <h2 id="greetingTitle"> The Ultimate Task Manager </h2>
        </div>
        <div>
            <label for="inputTask"/><textarea rows="10" cols="12" id="inputTask" placeholder="Entrez Vos Tâches..."/>
        </div>
        <div id="buttons">
            <button v-on:click="addTask" type="submit">Ajouter</button>
            <button v-on:click="modifyTask" type="submit" :disabled="isDisabled" >Modifier</button>
            <button v-on:click="deleteTask" type="submit" :disabled="isDisabled">Supprimer</button>
        </div>
        <ul id="tasksList"></ul>

    </div>
</template>


<script>
    export default {
        data() {
          return {
              userId: null,
              selectedTaskId: null,
              isDisabled: null
          }
        },
        mounted() {
            this.createUser();
            this.isDisabled = true;
        },
        methods: {
            createUser() {
                let requestOptions = {
                    method: 'POST',
                    redirect: 'follow'
                };

                fetch('https://glo3102lab4.herokuapp.com/users ', requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        this.userId = JSON.parse(result).id;
                    })
                    .catch(error => console.log('error', error));
            },
            addTask() {
                let task = document.getElementById("inputTask").value;
                this.isDisabled = true;
                let myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                let raw = JSON.stringify({"name": task});

                let requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch("https://glo3102lab4.herokuapp.com/" + this.userId + "/tasks", requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .then(() => this.getTasks() )
                    .catch(error => console.log('error', error));
            },
            getTasks() {
                let requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                };

                fetch("https://glo3102lab4.herokuapp.com/" + this.userId + "/tasks", requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        document.getElementById("tasksList").innerHTML = '';
                        let results = JSON.parse(result).tasks;
                        for (let i = 0; i < results.length; i++) {
                            console.log(JSON.stringify(results[i].id));
                            document.getElementById("tasksList").innerHTML += "<div class='taskName' onclick='selectTask(" + JSON.stringify(results[i].id) + ", " + JSON.stringify(results[i].name) + ")' name='" + results[i].id + "'>" + results[i].name + "</div>"

                        }

                    })
                    .catch(error => console.log('error', error));



            },
            modifyTask() {
                let task = document.getElementById("inputTask").value;

                let myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                let raw = JSON.stringify({"name":task});

                let requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch("https://glo3102lab4.herokuapp.com/" + this.userId + "/tasks/" + this.selectedTaskId, requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .then( () => this.getTasks())
                    .catch(error => console.log('error', error));
            },
            deleteTask() {
                this.isDisabled = true;
                let requestOptions = {
                    method: 'DELETE',
                    redirect: 'follow'
                };

                fetch("https://glo3102lab4.herokuapp.com/" + this.userId + "/tasks/" + this.selectedTaskId, requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .then(() => this.getTasks())
                    .catch(error => console.log('error', error));
            },
            selectTask(taskId, taskName) {
                this.selectedTaskId = taskId;
                document.getElementById("inputTask").value = taskName;
                this.isDisabled = false;
            },
            conso(){
                console.log("sa marche");
            }
        }
    }

</script>

<style>
    #greetingTitle {
        text-align: center;
        margin: auto;
        width:100%;
    }
    #inputTask{
        width:100%;
        height: 30%;
        margin:auto;
        min-width: 100%;
    }
    #buttons {
        text-align: left;
        margin: auto;
    }
    #tasksList {
        height: 100%;
    }

    .taskName{
        text-align: center;
        font-size: x-large;
        border: 1px solid grey;
        margin: 2%;
        width: 90%;
        display: block;
    }

    .taskName:hover{
        border-color: dodgerblue;
        cursor: pointer;
    }
</style>