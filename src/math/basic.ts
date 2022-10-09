import { NumberValidator } from './../models/NumberFilter';

const isEven: NumberValidator = (x: bigint): boolean => {
    return (x & BigInt(1)) ? false : true;
}

const isOdd: NumberValidator = (x: bigint): boolean => {
    return (x & BigInt(1)) ? true : false;
}

const equals: NumberValidator = (x: bigint, a?: bigint[]): boolean => {
    return (a && a.length === 1 && x === a[0]) ? true : false;
}

const multipleOf: NumberValidator = (x: bigint, a?: bigint[]): boolean => {
    if(!a) return true;

    for(let y of a) {
        if(y === BigInt(0)) return false;
        let z = x / y;
        if(y * z !== x) return false;
    }

    return true;
}

const multipleOfAny: NumberValidator = (x: bigint, a?: bigint[]): boolean => {
    if(!a) return true;

    for(let y of a) {
        if(y === BigInt(0)) continue;
        let z = x / y;
        if(y * z === x) return true;
    }

    return false;
}

const divisorOf: NumberValidator = (x: bigint, a?: bigint[]): boolean => {
    if(!a) return true;

    for(let y of a) {
        let z = y / x;
        if(x * z !== y) return false;
    }

    return true;
}

const divisorOfAny: NumberValidator = (x: bigint, a?: bigint[]): boolean => {
    if(!a) return true;

    for(let y of a) {
        let z = y / x;
        if(x * z === y) return true;
    }

    return false;
}

export { 
    isEven, 
    isOdd, 
    equals,
    multipleOf, 
    multipleOfAny, 
    divisorOf,
    divisorOfAny
};