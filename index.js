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


module.exports = {
    throttle,
    debounce
}
