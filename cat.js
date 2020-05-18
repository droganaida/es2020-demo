
function sayHi(user) {
    setTimeout(() => {
        console.log(`Meow to ${user}!`);
    }, 1000);
}

function feedCat(food) {
    console.log(`Yummy ${food}!`);
}

export {sayHi, feedCat};