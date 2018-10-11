// 公共CSS
import '@/style/style';
import Vue from 'vue';

// 公共组件引入
import '@/components/components';

// 路由router
import router from '@/libs/router';

// v-tap 解决IOS点击事件300ms延迟问题
import vTap from 'v-tap';

Vue.use(vTap);

// 注册Vue公共方法
import utils from '@/libs/utils';

Vue.use(utils);

// // 引入vconsole
// import Vconsole from 'vconsole';
// const vConsole = new Vconsole();

// Vue路由跳转动画
import Navigation from 'vue-navigation';

Vue.use(Navigation, {router});

// 吐司
import Toast from 'mint-ui/lib/toast';

window['Toast'] = Toast;

import Index from '@/index.vue';
const app = new Vue({
    router,
    render: h => h(Index)
}).$mount("#app");