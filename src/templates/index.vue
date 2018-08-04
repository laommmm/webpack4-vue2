<style scoped>

</style>

<template>
    <div class="view">
        <h1 v-tap="{methods:changeMessage}">{{message}}</h1>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                message:'Click me to the test page!'
            }
        },
        mounted() {
            
        },
        methods:{
            changeMessage(){
                this.$router.push({
                    name:'test'
                })
            }
        }
    }
</script>