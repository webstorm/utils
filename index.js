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
    throttle,
    debounce,
    promisify
}
