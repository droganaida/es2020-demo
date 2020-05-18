
// =============== 1. globalThis ================ //
// browser environment - window
// node.js environment - global
// service worker environment - self
console.log('=============== 1. globalThis test:');
console.log(globalThis);

// ============== 2. Private Class Variables ============ //
console.log('=============== 2. Private Class Variables test:');

class Cat {
    constructor(name) {
        this.name = name;
    }
    #sound = "Meow";
    sayMeow() { console.log('What does the cat say? -', this.#sound) }
}

const myCat = new Cat('Bono');
myCat.sayMeow(); // Meow

try {
    console.log('cat name -', myCat.name); // Bono
    //console.log('cat says -', myCat.#sound); // Private name #sound is not defined
} catch (e) {
    console.error(e);
}

// =============== 3. Promise.allSettled ================= //
const p1 = new Promise((res, rej) => setTimeout(res("I'm fine =)"), 500));
const p2 = new Promise((res, rej) => setTimeout(rej("Shit happens =("), 500));

Promise.allSettled([p1, p2])
    .then(data => {
        console.log('=============== 3. Promise.allSettled test:');
        console.log('promises fulfilled -', data);
    });

// =============== 4. The Nullish Coalescing Operator ================= //
console.log('=============== 4. The Nullish Coalescing Operator test:');

const test = {
    null: null,
    number: 0,
    string: '',
    boolean: false
};
const undefinedValue = test.dog || "Cat"; // "Cat"
console.log('undefined value -', undefinedValue);
const undefinedValueNC = test.dog ?? "Cat"; // "Cat"
console.log('undefined value (Nullish Coalescing) -', undefinedValueNC);

const nullValue = test.null || "Default"; // "Default"
console.log('null value -', nullValue);
const nullValueNC = test.null ?? "Default"; // "Default"
console.log('null value (Nullish Coalescing) -', nullValueNC);

const numberValue = test.number || 1; // 1
console.log('number value -', numberValue);
const numberValueNC = test.number ?? 1; // 0
console.log('number value (Nullish Coalescing) -', numberValueNC);

const stringValue = test.string || "Hello"; // "Hello"
console.log('string value -', stringValue);
const stringValueNC = test.string ?? "Hello"; // ""
console.log('string value (Nullish Coalescing) -', stringValueNC);

const booleanValue = test.boolean || true; // true
console.log('boolean value -', booleanValue);
const booleanValueNC = test.boolean ?? true; // false
console.log('boolean value (Nullish Coalescing) -', booleanValueNC);

// ================= 5. Optional Chaining Operator ====================== //
console.log('=============== 5. Optional Chaining Operator test:');

let user = {};
try {
    console.log('user name -', user.profile.name ?? "Anonymous"); // person.profile is undefined
} catch (e) {
    console.error(e);
}
console.log('user name -', user?.profile?.name ?? "Anonymous");
console.log('user age -', user?.profile?.age ?? 18);

// ================= 6. BigInt ====================== //
console.log('=============== 6. BigInt test:');

const max = Number.MAX_SAFE_INTEGER;
console.log('Number.MAX_SAFE_INTEGER -', max); // 9007199254740991 === 2^53

const bigNum = 100000000000000000000000000000n;
console.log('bigNum * 2n -', bigNum * 2n); // 200000000000000000000000000000n

// ================= 7. Numeric Separators ====================== //
console.log('=============== 7. Numeric Separators test:');

const budget = 200_000_000;
console.log('budget/2', budget/2); // 100000000

const strBudget = '200_000_000'; // be careful with strings!
console.log('parseInt(budget)', parseInt(strBudget)); // 200
console.log('parseFloat(budget)', parseFloat(strBudget)); // 200
console.log('Number(budget)', Number(strBudget)); // NaN

// ================ 8. String.protype.matchAll =============== //
console.log('=============== 8. String.protype.matchAll test:');

const regexp = /[-.\w]+@(?<hostname>[\w-]+\.+[\w-]+)/g;
const str = 'mail_one@gmail.com mail_two@gmail.com wrong_mail@ mail mail_tree@supermail.com';
const matches = str.matchAll(regexp);

let match = matches.next();
while (!match.done) {
    console.log('mail found -', match.value);
    match = matches.next();
}

let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g;
let dateStr = "2019-10-30 2020-01-01";
let results = dateStr.matchAll(dateRegexp);

for(let result of results) {
    let {year, month, day} = result.groups;
    console.log('date found -', result);
    console.log(`Date formatted: ${day}.${month}.${year}`);
}

// ================ 9. Dynamic import =============== //
console.log('=============== Import test:');

import {sayHi, feedCat} from './cat.js';
sayHi('Aida');
feedCat('chicken');

const myDynamicImport = import('./cat.js');
myDynamicImport
    .then(exportFromModule => {
        console.log('=============== 9. Dynamic import then test:');
        exportFromModule.sayHi('Aida from then');
        exportFromModule.feedCat('chicken from then');
    })
    .catch( e => {
        console.error('Error:', e);
    });

(async() => {
    try {
        let exportFromModule = await import('./cat.js');
        console.log('=============== 9. Dynamic import await test:');
        exportFromModule.sayHi('Aida from async/await');
        exportFromModule.feedCat('chicken from async/await');
    } catch (e) {
        console.error('Error:', e);
    }
})();


