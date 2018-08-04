let env = {
    'dev':'192.168.1.142:3128',
    'prd':''
}

let host;

if(process.env.NODE_ENV === 'production'){
    host = env.prd;
}else{
    host = env.dev;
}


let url = {
    book:host + ''
}

export default url