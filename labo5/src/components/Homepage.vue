<template>
    <div id="greetingTitle">
        <h2> The Ultimate Task Manager </h2>
    </div>
</template>

<script>
    export default {
        name: "Homepage"
    }
</script>

<style scoped>
    #greetingTitle {
        text-align: center;
        margin: auto;
        width:100%;
    }
    .center{
        text-align: center;
        margin: auto;
        width:100%;
    }
    #inputTask{
        width:100%;
        height: 30%;
        margin:auto;

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