// vue公共函数
export default {
    install(Vue,options){
        Vue.prototype.goBack = ()=>{
            history.back();
        }
    }
}