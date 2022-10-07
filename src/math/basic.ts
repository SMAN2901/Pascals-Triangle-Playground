import { NumberValidator } from './../models/NumberFilter';

const isEven: NumberValidator = (x: number): boolean => {
    return (x & 1) ? false : true;
}

const isOdd: NumberValidator = (x: number): boolean => {
    return (x & 1) ? true : false;
}

const multipleOf: NumberValidator = (x: number, a?: number[]): boolean => {
    if(!a) return true;

    for(let y of a) {
        if(y === 0) return false;
        let z = Math.floor(x / y);
        if(y * z !== x) return false;
    }

    return true;
}

const multipleOfAny: NumberValidator = (x: number, a?: number[]): boolean => {
    if(!a) return true;

    for(let y of a) {
        if(y === 0) continue;
        let z = Math.floor(x / y);
        if(y * z === x) return true;
    }

    return false;
}

const divisorOf: NumberValidator = (x: number, a?: number[]): boolean => {
    if(!a) return true;

    for(let y of a) {
        let z = Math.floor(y / x);
        if(x * z !== y) return false;
    }

    return true;
}

const divisorOfAny: NumberValidator = (x: number, a?: number[]): boolean => {
    if(!a) return true;

    for(let y of a) {
        let z = Math.floor(y / x);
        if(x * z === y) return true;
    }

    return false;
}

export { 
    isEven, 
    isOdd, 
    multipleOf, 
    multipleOfAny, 
    divisorOf,
    divisorOfAny
};