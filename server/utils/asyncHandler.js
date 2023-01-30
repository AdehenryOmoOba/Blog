
function asyncHandler(fn, ...args) {

     async function child() {

        try {
            const result = await fn(...args)
            return result
        } catch (error) {
            return result
        }
    }
}