import { isEven, isOdd, multipleOf, multipleOfAny, divisorOf, divisorOfAny } from "../math/basic";
import { NumberFilter } from "./NumberFilter";

let [inputRequired, active, checked] = [true, true, true];

let oddFilter: NumberFilter = new NumberFilter("Odd", isOdd, !inputRequired, active, !checked);
let evenFilter: NumberFilter = new NumberFilter("Even", isEven);
let multipleOfFilter: NumberFilter = new NumberFilter("Multiple of", multipleOf, inputRequired, !active, !checked);
let multipleOfAnyFilter: NumberFilter = new NumberFilter("Multiple of Any", multipleOfAny, inputRequired, !active, !checked);
let divisorOfFilter: NumberFilter = new NumberFilter("Divisor of", divisorOf, inputRequired, !active, !checked);
let divisorOfAnyFilter: NumberFilter = new NumberFilter("Divisor of Any", divisorOfAny, inputRequired, !active, !checked);

export const FILTER_LIST = [
    oddFilter,
    evenFilter,
    multipleOfFilter,
    multipleOfAnyFilter,
    divisorOfFilter,
    divisorOfAnyFilter
];