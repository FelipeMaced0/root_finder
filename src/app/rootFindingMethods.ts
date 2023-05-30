
export const allMethods:Array<Object> = [
    {id:1, name: "Bissection",value: bissection}, 
    {id:2, name: "False Position", value: falsePosition},
    {id:3, name: "Newton Raphson", value: newtonRaphson},
    {id:4, name: 'Secant', value: secant}];

function func(exp:string ,x:number){
    return eval(exp);
}

/*TODO Fix this shit*/
function derivate(f:Function, fun_exp:string, x: number, h:number=0.00001){
  
    return (f(fun_exp,(x+h)) - f(fun_exp, (x-h))) / (2 * h)
}

function calculateError(currentEstimate:number, previousEstimate:number){
    return Math.abs(currentEstimate-previousEstimate)/Math.abs(currentEstimate);
}

export type estimativeResult = { 
    k: number, 
    interval:[{x:number, y:0}, {x:number, y:0}], 
    root:[{x: number, y:0}],
    f_x: number,
    estimative_error:number,
    true_error:number
};

type FunctionInput = {
    begin:number,
    end:number,
    epsilon: number,
    max_iter: number,
    fun_exp: string,
}

export function *bissection(input: FunctionInput){
    let {begin=-1, end=1, epsilon=0.00001, max_iter=2000, fun_exp} = input;
   
    let k=1;
    let mid_point: number = (begin+end)/2;
    let f_mid_point:number=0;
    let f_begin:number;
    let prod:number;
    let previous_mid_point: number = 0;
    let current_error: number = 0;
    
    while(k < max_iter){
        mid_point = (begin+end)/2;
        f_mid_point = func(fun_exp, mid_point);
        f_begin = func(fun_exp, begin);
        prod = f_begin*f_mid_point;
        //current_error = Math.abs(mid_point-previous_mid_point)/Math.abs(mid_point);
        current_error = calculateError(mid_point, previous_mid_point);
        previous_mid_point = mid_point;
        yield {k: k, interval:[{x:begin, y:0},{x:end, y:0}], root:[{x: mid_point, y:0}], f_x: f_mid_point, estimative_error: current_error};
        
        if(prod > 0){
            begin = mid_point;
        }
        if(prod < 0){
            end = mid_point;
        } 
        if(current_error<epsilon){
            break;
        }
        k++;
    }
}

export function *falsePosition(input: FunctionInput){
    let {begin=-1, end=1, epsilon=0.00001, max_iter=2000, fun_exp} = input;
    
    let k=1;
    let previous_root_estimative: number = 0;
    let current_error: number = 0;

    while(k < max_iter){
        /* c = (a * f(b) - b * f(a)) / (f(b) - f(a)) */
        let root_estimative =  (begin*func(fun_exp,end) - end*func(fun_exp,begin))/(func(fun_exp,end) - func(fun_exp,begin));
        /*{ k: number, interval:[{x:number, y:0}, {x:number, y:0}], root:[{x: number, y:0}], f_x: number} */
        current_error = calculateError(root_estimative, previous_root_estimative);
        previous_root_estimative = root_estimative;

        yield {k: k, interval:[{x:begin, y:0}, {x:end, y:0}], root:[{x:root_estimative, y:0}], f_x: func(root_estimative), estimative_error: current_error};
        
        //Cha
        //current_error = Math.abs(root_estimative-previous_root_estimative)/Math.abs(root_estimative);
    
        if(current_error < epsilon) break;

        if(func(fun_exp,begin)*func(fun_exp,root_estimative)<0){
            end = root_estimative;
        }else{
            begin = root_estimative;
        }
        k++;
    }
}

export function *secant(input: FunctionInput){
    let {begin=-1, end=1, epsilon=0.00001, max_iter=2000, fun_exp} = input;
    
    let k: number = 1;
    let current_error: number = 0;
    let previous_root_estimative: number = 0;

    while(k<max_iter){
        let root_estimative = end - (func(fun_exp,end) * (end - begin)) / (func(fun_exp,end) - func(fun_exp,begin));
        current_error = calculateError(root_estimative, previous_root_estimative);
        previous_root_estimative = root_estimative;

        yield {k: k, interval:[{x:begin, y:0}, {x:end, y:0}], root:[{x:root_estimative, y:0}], f_x: func(fun_exp,root_estimative), estimative_error: current_error};
        

        begin = end;
        end = root_estimative;     
        if(current_error<epsilon) break;
        k++;
    }
}

export function *newtonRaphson(input: FunctionInput){
    let {begin=-1, end=5, epsilon=0.00001, max_iter=2000, fun_exp} = input;
    let k: number = 1;
    let current_error: number = 0;
    let previous_root_estimative: number = 0;
    let root_estimative=0;

    while(k<max_iter){
        root_estimative = begin-(func(fun_exp, begin)/derivate(func, fun_exp, begin));
        current_error = calculateError(root_estimative, previous_root_estimative);
        previous_root_estimative = root_estimative;

        yield {k: k, interval:[], root:[{x:root_estimative, y:0}], f_x: func(fun_exp, root_estimative), estimative_error: current_error};
        if(current_error < epsilon) break;
        
        begin = root_estimative;
        k++;
    }
}