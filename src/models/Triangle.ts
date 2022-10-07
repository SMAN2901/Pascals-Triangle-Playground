import { NumberFilter } from "./NumberFilter";

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

    compute(height: number) {
        let i = this.height;

        while(i < height) {
            this.nums.push([]);
            this.colored.push([]);

            this.nums[i][0] = this.nums[i][i] = 1;
            this.colored[i][0] = this.colored[i][i] = this.filter(1);

            for(let j = 1; j < i; j++) {
                this.nums[i][j] = this.nums[i - 1][j - 1] + this.nums[i - 1][j];
                this.colored[i][j] = this.filter(this.nums[i][j]);
            }

            i++;
        }
    }

    updateColor() {
        for(let i = 0; i < this.nums.length; i++) {
            for(let j = 0; j < this.nums[i].length; j++) {
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