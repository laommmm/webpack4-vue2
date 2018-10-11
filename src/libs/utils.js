// vue公共函数

export default {
    install(Vue, options) {
        // 公共返回方法
        Vue.prototype.goBack = () => {
            history.back();
        };
        // 转json方法
        Vue.prototype.parseJSON = (data) => {
            let res;
            try {
                res = JSON.parse(data);
            } catch (e) {
                console.error('JSON parse error.');
                res = data;
            }
            return res;
        };
    }
}