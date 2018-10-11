<template>
    <navigation>
        <transition :name="transitionName">
            <router-view class="child-view"></router-view>
        </transition>
    </navigation>
</template>
<script> export default {
    name: 'app',
    data() {
        return {
            transitionName: 'slide-left'
        }
    },
    created() {
        this.$navigation.on('forward', (to, from) => {
            this.transitionName = 'slide-left';
        });
        this.$navigation.once('back', (to, from) => {
            this.transitionName = 'slide-right';
        })
    }
}</script>
<style>
    .child-view {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        transition: all .5s cubic-bezier(.55, 0, .1, 1);
    }

    .slide-left-enter,
    .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate3d(100%, 0, 0);
        transform: translate3d(100%, 0, 0);
    }

    .slide-left-leave-active,
    .slide-right-enter {
        opacity: 0;
        -webkit-transform: translate3d(-100%, 0, 0);
        transform: translate3d(-100%, 0, 0);
    }
</style>
