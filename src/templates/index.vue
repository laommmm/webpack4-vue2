<style scoped lang="scss">
    .testImg{
        width: 750px;
        height: 1000px;
        background-image: url("../style/imgs/test.jpg");
        background-size: cover;
        background-repeat: no-repeat;
    }

    $red : #ff0000;

    h1{
        color: $red;
    }
</style>

<template>
    <div class="view">
        <h1 class="font-d2" v-tap="{methods:changeMessage}">{{message}}</h1>
        <h2 class="font-h1">{{msg}}</h2>
        <div class="testImg"></div>
    </div>
</template>

<script>
    import URL from '@/common/api';
    export default {
        data(){
            return {
                message:'Click me to the test page!',
                msg:'ajax request!'
            }
        },
        mounted() {
            this.getTestJson();
        },
        methods:{
            changeMessage(){
                this.$router.push({
                    name:'test'
                })
            },
            getTestJson(){
                this.$http({
                    method: 'get',
                    url: URL.book,
                    params: {},
                    responseType: 'json',
                    timeout: 5000
                }).then((res) => {
                    let response = res.data;
                    this.msg = response.data.msg;
                }, (err) => {
                    console.log(err);
                });
            }
        }
    }
</script>