function pause(delay = 100) {
  return new Promise(resolve => setTimeout(resolve, delay))
}

// -- NOTE: function* is the way to declare a Generator
// function* count() {
//   let count = 0
//   // yield allows you to "generate" a value
//   while(true) yield i++
// }
// --

async function* retrier({ attempts = Infinity, delay = 100 }) {
  for (let i = 0; i < attempts; i++) {
    yield i
    await pause(delay)
  }
}

const tryHttp = ({ arg }) => {
  if (arg < 3) return Promise.reject({ ok: false, message: 'Fck u' })
  return Promise.resolve({ ok: true })
}

const yourHttpClient = async ({ onEarchIterator, validator }) => {
  for await (const i of retrier({ attempts: 10, delay: 500 })) {
    const result = await tryHttp({ arg: i })
      .then((res) => res)
      .catch((err) => err)
    onEarchIterator(result)
    if (validator.result(result)) break
  }
}

yourHttpClient({
  onEarchIterator: (res) => {
    // NOTE: We have event on each iterate
    console.log('- this is your event after request', res)
  },
  validator: {
    // NOTE: We have access to each response
    result: (res) => res.ok === true,
  },
})
