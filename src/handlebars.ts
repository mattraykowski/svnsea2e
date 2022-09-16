function concat(...values: any[]) {
    return values.slice(0, values.length - 1).join("");
}

function toLowerCase(str: string) {
    return str.toLowerCase();
}

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function forFn(from: string, to: string, incr: number, block: any) {
    let accum = '';
    const fromNum: number = parseInt(from);
    const toNum: number = parseInt(to);

    const count = fromNum + toNum;
    for (let i = fromNum; i < count; i += incr) {
        block.data.index = i;
        block.data.first = i === 0;
        block.data.last = i === toNum;
        block.data.mod = Math.trunc(i / 5);
        block.data.remain = i % 5;
        // @ts-ignore
        accum += block.fn(this);
    }
    return accum;
}

function iff(a: string, operator: string, b: string, opts: any) {
    let bool = false;
    switch (operator) {
        case '==':
            bool = a == b;
            break;
        case '!=':
            bool = a != b;
            break;
        case '>=':
            bool = a >= b;
            break;
        case '<=':
            bool = a <= b;
            break;
        case '>':
            bool = a > b;
            break;
        case '<':
            bool = a < b;
            break;
        default:
            throw 'Unknown operator ' + operator;
    }

    if (bool) {
        // @ts-ignore
        return opts.fn(this);
    } else {
        // @ts-ignore
        return opts.inverse(this);
    }
}

export function registerHandlebarsHelpers() {
    // If you need to add Handlebars helpers, here are a few useful examples:
    Handlebars.registerHelper('concat', concat);
    Handlebars.registerHelper('toLowerCase', toLowerCase);
    Handlebars.registerHelper('capitalize', capitalize);
    Handlebars.registerHelper('for', forFn);
    Handlebars.registerHelper('iff', iff);
}