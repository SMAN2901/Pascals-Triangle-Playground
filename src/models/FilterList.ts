import { isEven, isOdd, multipleOf, multipleOfAny, divisorOf, divisorOfAny, equals } from "../math/basic";
import { NumberFilter } from "./NumberFilter";

let [inputRequired, active, checked] = [true, true, true];

const oddFilter = new NumberFilter("Odd", isOdd, !inputRequired, active, !checked);
const evenFilter = new NumberFilter("Even", isEven);
const equalsFilter = new NumberFilter("Equal to", equals, inputRequired, !active, !checked);
const multipleOfFilter = new NumberFilter("Multiple of", multipleOf, inputRequired, !active, !checked);
const multipleOfAnyFilter = new NumberFilter("Multiple of Any", multipleOfAny, inputRequired, !active, !checked);
const divisorOfFilter = new NumberFilter("Divisor of", divisorOf, inputRequired, !active, !checked);
const divisorOfAnyFilter = new NumberFilter("Divisor of Any", divisorOfAny, inputRequired, !active, !checked);

export const FILTER_LIST = [
    oddFilter,
    evenFilter,
    equalsFilter,
    multipleOfFilter,
    multipleOfAnyFilter,
    divisorOfFilter,
    divisorOfAnyFilter
];