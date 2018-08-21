// vue公共函数
export default {
    install(Vue, options) {
        Vue.prototype.goBack = () => {
            history.back();
        }
        Vue.prototype.parseJSON = (data) => {
            let res;
            try {
                res = JSON.parse(data);
            } catch (e) {
                console.error('JSON parse error.');
                res = data;
            }
            return res;
        }
    }
}