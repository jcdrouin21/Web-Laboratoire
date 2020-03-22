<template>
    <div id="example-1">
        <router-link to="/ToDoList"><div class="taches" v-on:click="createUser"> <h2>+</h2> Nouvelle Session </div></router-link>
        <div class="taches" v-for="user in usersId" :key="user.id">
            {{ user.id }}
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'

    guy = new Vue({
        data: {
            usersId: []
        }
    })
    export default {
        name: "Task",
        methods: {
            createUser() {
                let requestOptions = {
                    method: 'POST',
                    redirect: 'follow'
                };

                fetch('https://glo3102lab4.herokuapp.com/users', requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        console.log(JSON.parse(result).id);
                        this.usersId.push(JSON.parse(result).id);
                    }).catch(error => console.log('error', error));
            }
        }
    }
    export { guy };
</script>

<style scoped>
    .taches{
        border: 1px black solid;
    }
</style>