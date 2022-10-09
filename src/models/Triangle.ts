import { NumberFilter, SimpleNumberFilter } from "./NumberFilter";

export interface SimpleTriangle {
    height: number;
    filters: SimpleNumberFilter[];
}
export class Triangle {
    readonly nums: number[][] = [];
    readonly colored: boolean[][] = [];

    get height(): number {
        return this.nums.length;
    }

    filters: NumberFilter[] = [];

    constructor(filters: NumberFilter[]) {
        this.filters = filters;
    }

    toSimpleObject(): SimpleTriangle {
        return {
            height: this.height,
            filters: this.filters.map(f => f.toSimpleObject())
        };
    }

    compute(height: number) {
        let i = this.height;

        while(i < height) {
            this.nums.push([]);
            this.colored.push([]);

            for(let j = 0, k = i; j <= k; j++, k--) {
                if(j) this.nums[i][j] = (j < k) 
                    ? (this.nums[i - 1][j - 1] + this.nums[i - 1][j])
                    : (this.nums[i - 1][j - 1] + this.nums[i - 1][j - 1]);
                else this.nums[i][j] = 1;

                this.colored[i][j] = this.filter(this.nums[i][j]);
            }

            i++;
        }
    }

    updateColor() {
        for(let i = 0; i < this.nums.length; i++) {
            for(let j = 0, k = i; j <= k; j++, k--) {
                this.colored[i][j] = this.filter(this.nums[i][j]);
            }
        }
    }

    filter(x: number): boolean {
        for(let f of this.filters) {
            if(!f.active) continue;
            if(!f.validate(x)) return false;
        }

        return this.filters.some(filter => filter.active);
    }
}