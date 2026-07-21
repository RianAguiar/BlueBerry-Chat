function Debouncer(fn, delay){
    let timeout

  return function (...args) {
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
export default Debouncer