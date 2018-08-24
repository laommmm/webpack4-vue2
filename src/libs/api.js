
let env = {
    'dev':'',
    'prd':'',
    'mock':'/mock/'
}

let host;

if(process.env.NODE_ENV === 'production'){
    host = env.prd;
}else if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'com'){
    host = env.dev;
}else{
    host = env.mock;
}

let url = {
    book:host + 'test.json'
}

export default url