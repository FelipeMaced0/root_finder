
function func(f:string, x:number){
    return eval(f);
}

export default function calculateFunction(funcString: string){    
    let data:Array<Array<Number>>=[[],[]];

    if(funcString===""){return[]};
    for(let x=-10;x<11;x=x+0.1){
        data[0].push(x);
        data[1].push(func(funcString, x));
    }
    
    return data;
}