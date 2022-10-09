import { FILTER_LIST } from '../models/FilterList';
import { Triangle, SimpleTriangle } from './../models/Triangle';

export const getTriangleFromStorage = (): Triangle => {
    let t = new Triangle(FILTER_LIST);
    let data = localStorage.getItem("triangle");

    if(data) {
        let tData: SimpleTriangle = JSON.parse(data);

        for(let filter of t.filters) {
            let filterData = tData.filters.find(f => f.name === filter.name);

            if(filterData) {
                filter.active = filterData.active;
                filter.checked = filterData.checked;
                filter.inputValue = filterData.inputValue;
                filter.inputChanged = true;
            }
        }

        t.compute(tData.height);
    }
    
    return t;
}

export const saveTriangleToStorage = (t: Triangle) => {
    let tData = t.toSimpleObject();
    localStorage.setItem("triangle", JSON.stringify(tData));
}