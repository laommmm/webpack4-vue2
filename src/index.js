import Vue from 'vue';
// 公共CSS
import '@/style/style';

// 公共组件引入
import '@/components/components';

// 路由router
import router from '@/router/index';

// ajax
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios,axios);

// v-tap 解决IOS点击事件300ms延迟问题
import vTap from 'v-tap';
Vue.use(vTap);


import Index from '@/index.vue';

const app = new Vue({
    router,
    render: h=>h(Index)
}).$mount("#app");