import { NumberValidator } from './../models/NumberFilter';

const isPrime: NumberValidator = (x: bigint): boolean => {
    if(x <= BigInt(3)) return x > BigInt(1);

    for(let i = BigInt(3); i * i <= x; i += BigInt(2)) {
        let y = x / i;
        if(y * i === x) return false;
    }
    
    return true;
}

export { isPrime };