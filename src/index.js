// 公共CSS
import '@/style/style';
import Vue from 'vue';

// 公共组件引入
import '@/components/components';

// 路由router
import router from '@/router/index';

// ajax
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);

// v-tap 解决IOS点击事件300ms延迟问题
import vTap from 'v-tap';
Vue.use(vTap);

// 注册Vue公共方法
import utils from '@/common/utils';
Vue.use(utils);

// 引入libs下全部组件
import '@/common/importCommonLibs';

import Index from '@/index.vue';

const app = new Vue({
    router,
    render: h => h(Index)
}).$mount("#app");