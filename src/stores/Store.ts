import { defineStore } from 'pinia';

export const counterStore = defineStore('counter', {
    state: () => ({ count: 10, name: 'Eduardo' }),
    getters: {
        checkNumber: (state) => {
            if (state.count > 0 && state.count % 2 === 0) return 'positive even number';
            else if (state.count > 0 && state.count % 2 !== 0) return 'positive odd number';
            else if (state.count < 0 && state.count % 2 === 0) return 'negative even number';
            else if (state.count < 0 && state.count % 2 !== 0) return 'negative odd number';
            else return 'this is zero';
        },
    },
    actions: {
        increment(param: number) {
            this.count += param;
        },
        decrement(param: number) {
            this.count -= param;
        },
    },
});
