


function func(x:number){
    return eval('x**2-2');
}

function derivate(f:Function, x: number, h:number=0.00001){

    return (eval(f(x+h)) - eval(f(x-h))) / (2 * h)
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

export function *bissection(){
    let interval = {
        being: Number,
        end: Number
    }
    let begin: number = 0;
    let end: number = 2;
    let k=1;
    let mid_point: number = (begin+end)/2;
    let f_mid_point:number=0;
    let f_begin:number;
    let prod:number;
    let epsilon = 0.00001;
    let previous_mid_point: number = 0;
    let current_error: number = 0;
    let max_iteration = 2000;
    
    while(k < max_iteration){
        mid_point = (begin+end)/2;
        f_mid_point = func(mid_point);
        f_begin = func(begin);
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

export function *falsePosition(){
    let begin: number = 1;
    let end: number = 4;
    let k=1;
    let epsilon = 0.00001;
    let previous_root_estimative: number = 0;
    let current_error: number = 0;
    let max_iteration = 2000;

    while(k < max_iteration){
        /* c = (a * f(b) - b * f(a)) / (f(b) - f(a)) */
        let root_estimative =  (begin*func(end) - end*func(begin))/(func(end) - func(begin));
        /*{ k: number, interval:[{x:number, y:0}, {x:number, y:0}], root:[{x: number, y:0}], f_x: number} */
        current_error = calculateError(root_estimative, previous_root_estimative);
        previous_root_estimative = root_estimative;

        yield {k: k, interval:[{x:begin, y:0}, {x:end, y:0}], root:[{x:root_estimative, y:0}], f_x: func(root_estimative), estimative_error: current_error};
        
        //Cha
        //current_error = Math.abs(root_estimative-previous_root_estimative)/Math.abs(root_estimative);
    
        if(current_error < epsilon) break;

        if(func(begin)*func(root_estimative)<0){
            end = root_estimative;
        }else{
            begin = root_estimative;
        }
        k++;
    }
}

export function *secant(){
    let begin: number = 1;
    let end: number = 4;
    let k: number = 1;
    let epsilon: number = 0.00001;
    let previous_mid_point: number = 0;
    let current_error: number = 0;
    let max_iteration: number = 2000;
    let previous_root_estimative: number = 0;

    while(k<max_iteration){
        let root_estimative = end - (func(end) * (end - begin)) / (func(end) - func(begin));
        current_error = calculateError(root_estimative, previous_root_estimative);
        previous_root_estimative = root_estimative;

        yield {k: k, interval:[{x:begin, y:0}, {x:end, y:0}], root:[{x:root_estimative, y:0}], f_x: func(root_estimative), estimative_error: current_error};
        

        begin = end;
        end = root_estimative;     
        if(current_error<epsilon) break;
        k++;
    }
}

export function *newtonRaphson(){
    let x0: number = -4;
    let k: number = 1;
    let epsilon: number = 0.0000001;
    let current_error: number = 0;
    let max_iteration: number = 2000;
    let previous_root_estimative: number = 0;
    let root_estimative=0;

    while(k<max_iteration){
        root_estimative = x0-(func(x0)/derivate(func, x0));
        console.log(derivate(func, x0));
        current_error = calculateError(root_estimative, previous_root_estimative);
        previous_root_estimative = root_estimative;

        yield {k: k, interval:[], root:[{x:root_estimative, y:0}], f_x: func(root_estimative), estimative_error: current_error};
        if(current_error < epsilon) break;
        
        x0 = root_estimative;
        k++;
    }
}