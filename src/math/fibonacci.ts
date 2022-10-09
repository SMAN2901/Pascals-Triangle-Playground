import { NumberValidator } from './../models/NumberFilter';

const isFib: NumberValidator = (x: bigint): boolean => {
    if(x < BigInt(4)) return  true;

    let [a, b] = [BigInt(0), BigInt(1)];

    while(a < x) {
        [a, b] = [b, a + b]
        if(x === a) return true;
    }

    return false;
}

export { isFib };