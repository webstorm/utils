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
