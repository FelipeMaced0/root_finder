export type functionElement = {id:number, name: string, value:string}
export const POLINOMS:Array<functionElement> = [{id:1, name: 'x^(2)-2', value:'x**2-2'}, {id:2, name: 'x^(3)-2x+1',value:'x**3-2*x+1'}, {id:3, name: 'x^(4)-3x-1',value:'x**4-3*x-1'}];
export const TRIGONOMETRICS:Array<functionElement> = [{id:1, name: 'sin(x)', value: 'Math.sin(x)'}, {id:2, name: 'cos(x)', value:'Math.cos(x)'}, {id:3, name: 'sin(x)*cos(x)', value:'Math.sin(x)*Math.cos(x)'}];
export const EXPONENTIALS:Array<functionElement> = [{id: 1, name: '2^(x+2)-3^(x)', value: '2**(x+2)-3**(x)'}]
export const ALLFUNCTIONS:Array<functionElement> = [...POLINOMS, ...TRIGONOMETRICS, ...EXPONENTIALS];