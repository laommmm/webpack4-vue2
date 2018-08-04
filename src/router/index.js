import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

let routes = [{
  path: '/',
  redirect: '/index'
}];
let pages = {};
// 路径解析
function analysis(resolve) {
  resolve.keys().forEach(key => {
    let _key = key.substring(2, key.length - 4);
    let _finalKey = [];
    _finalKey = _key.split("/");
    _key = _finalKey[_finalKey.length-1];
    pages[_key] = resolve(key);
  });
}

analysis(require.context('../templates/', true, /\.vue$/));

for (let key in pages) {
  let obj = {};
  obj.path = '/' + key;
  obj.name = key;
  obj.component = pages[key].default;
  routes.push(obj);
}
/* 
  动态路由配置
  自动读取templates下面的所有vue配置路由
  路由规则: path和name和文件名一样
*/
export default new Router({
  routes: routes
})