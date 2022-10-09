import { NumberValidator } from './../models/NumberFilter';

const isFactorial: NumberValidator = (x: bigint): boolean => {
    let p = BigInt(1);
    let i = p;

    while(p <= x) {
        if(p === x) return true;
        p *= i++;
    }

    return false;
}

export { isFactorial };