
function func(f:string, x:number){
    return eval(f);
}

export default function calculateFunction(funcString: string){    
    let data:Array<Array<Number>>=[];

    if(funcString===""){
        return data;
    };

    for(let x=-200; x<200; x = x+0.1){
        data.push([x, func(funcString, x)]);
    }
    
    return data;
}