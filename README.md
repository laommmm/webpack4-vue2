# 心血来潮搭建Vue2 + webpack4 单页面应用

### 为了更好的开发体验，为了节约更多的开发时间，为了偷懒

#### 没错，就是为了偷懒，功能如下：

* 自动化路由管理：傻瓜式引入方式，自动读取templates及子目录的vue文件，构建路由，路由名称与文件名一致

* 自动化组件引入:傻瓜式引入组件，自动读取components及子目录下所有vue文件，注册到Vue.component。命名规则：规则与react组件规则一致，组件名第一个字母为大写字母

* mock数据：npm run start-mock可以读取自己模拟的json数据，再也不用担心数据格式问题，直接丢给后台让他按这个来改~

* promise：封装promise+axios，不需要写回调了

```

#### config.json

webpack的常用替换配置参数:

* entry:入口
* output:出口
* dropConsole:打包是否去掉console
* sourceMap:是否使用sourceMap
* host:dev-server域名配置
* port:dev-server端口配置
* open:是否在run start 之后打开浏览器
* imageLimit:图片压缩限制(单位:字节)
* proxy:跨域代理配置，context匹配的跨域前缀，target:目标地址
