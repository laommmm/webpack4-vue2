<style>

</style>

<template>
    <div class="view">
        <h2 v-tap="{methods:tapTest,num:1}">{{testMessage}}</h2>
        <Toast></Toast>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                testMessage:'这只是一个测试页',
                count:0
            }
        },
        methods:{
            tapTest(params){
                this.count += params.num;
                this.testMessage = `我被点击了${this.count}次`;
            }
        }
    }
</script>