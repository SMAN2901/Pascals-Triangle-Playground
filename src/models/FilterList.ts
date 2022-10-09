import { isEven, isOdd, multipleOf, multipleOfAny, divisorOf, divisorOfAny, equals, powerOf } from "../math/basic";
import { isFib } from "../math/fibonacci";
import { isPrime } from "../math/prime";
import { NumberFilter } from "./NumberFilter";

let [inputRequired, active, checked] = [true, true, true];

const oddFilter = new NumberFilter("Odd", isOdd, !inputRequired, active, !checked);
const evenFilter = new NumberFilter("Even", isEven);
const equalsFilter = new NumberFilter("Equal to", equals, inputRequired, !active, !checked);
const multipleOfFilter = new NumberFilter("Multiple of", multipleOf, inputRequired, !active, !checked);
const multipleOfAnyFilter = new NumberFilter("Multiple of Any", multipleOfAny, inputRequired, !active, !checked);
const divisorOfFilter = new NumberFilter("Divisor of", divisorOf, inputRequired, !active, !checked);
const divisorOfAnyFilter = new NumberFilter("Divisor of Any", divisorOfAny, inputRequired, !active, !checked);
const powerOfFilter = new NumberFilter("Power of", powerOf, inputRequired, !active, !checked);

const primeFilter = new NumberFilter("Prime", isPrime, !inputRequired, !active, !checked);
const fibonacciFilter = new NumberFilter("Fibonacci", isFib, !inputRequired, !active, !checked);

export const FILTER_LIST = [
    oddFilter,
    evenFilter,
    equalsFilter,
    multipleOfFilter,
    multipleOfAnyFilter,
    divisorOfFilter,
    divisorOfAnyFilter,
    powerOfFilter,
    primeFilter,
    fibonacciFilter
];