function throttle(f, ms) {
    let isThrottled = false;
    let savedArgs;
    let savedThis;

    return function wrapper() {

        if(isThrottled) {
            savedThis = this;
            savedArgs = arguments;
            return;
        }


        f.apply(this, arguments);

        isThrottled = true;

        setTimeout(function() {
            isThrottled = false;
            if(savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms)
    }
}


const partial = (fn, ...args) => (...moreArgs) => fn.apply(null, args.concat(moreArgs))
const compose = (...functions) => (data) => functions.reduceRight((acc, fn) => fn(acc), data)
const inc = x => x + 1
const identity = x => x
const map = f => x => Array.prototype.map.call(x, f)
const filter = f => x => Array.prototype.filter.call(x, f)
const sort = f => x => Array.prototype.sort.call(x, f)
const join = seperator => list => Array.prototype.join.call(list, seperator)
const set = prop => obj => value => (obj[prop] = value, obj)
const setR = prop => value => obj => (obj[prop] = value, obj)
const pick = key => obj => obj[key];

function debounce(f, ms) {
    let isCoolDown = false;
    return function() {
        if(isCoolDown) return;
        f.apply(this, arguments)
        isCoolDown = true;
        setTimeout(() => isCoolDown = false, ms)
    }
}

// promisify(f, true) to get array of results
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function callback(err, ...results) { // our custom callback for f
        if (err) {
          return reject(err);
        } else {
          // resolve with all callback results if manyArgs is specified
          resolve(manyArgs ? results : results[0]);
        }
      }

      args.push(callback);

      f.call(this, ...args);
    });
  };
};


module.exports = {
    partial,
    compose,
    inc,
    identity,
    map,
    filter,
    sort,
    join,
    set,
    setR,
    pick,
    throttle,
    debounce,
    promisify
}
