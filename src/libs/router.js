import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// let pages = {};
// // 路径解析
// function analysis(resolve) {
//     resolve.keys().forEach(key => {
//         let _key = key.substring(2, key.length - 4);
//         let _finalKey = [];
//         _finalKey = _key.split("/");
//         _key = _finalKey[_finalKey.length-1];
//         pages[_key] = (r) => {
//             require.ensure([], () => {
//                 r(require(`../templates/${key.substring(2)}`)), _key
//             })
//         }
//     });
// }
//
// analysis(require.context('../templates/', true, /\.vue$/));
//
// for (let key in pages) {
//     let obj = {};
//     obj.path = '/' + key;
//     obj.name = key;
//     obj = {
//         path: `/${key}`,
//         name: key,
//         component: pages[key]
//     };
//     routes.push(obj);
// }
let routes = [{
    path: '/',
    redirect: '/login'
}];

// 路径解析,自动获取router下所有js的数组拼接
function analysis(resolve) {
    resolve.keys().forEach(key => {
        routes = routes.concat(resolve(key).default);
    });
}

analysis(require.context('@/router/', true, /\.js$/));

export default new Router({
    routes: routes
})