import { test } from '@/js';

interface Example {
    test: '1' | 2;
}

const variable: Example = {
    test: '1'
};

export function ExampleFunction(variable: string) {
    return variable;
}

console.log('asd');

console.log(test);
