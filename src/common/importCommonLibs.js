// 默认引入libs目录下全部组件,libs组件为全局公共组件(必加载)

function importAll(resolve) {
    resolve.keys().forEach(resolve);
}

importAll(require.context('../libs', true, /\.js$/));