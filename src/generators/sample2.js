function pause(delay = 100) {
  return new Promise(resolve => setTimeout(resolve, delay))
}

async function* retrier({ attempts = Infinity, delay = 100 }) {
  for (let i = 0; i < attempts; i++) {
    yield i
    await pause(delay)
  }
}

const tryHttp = ({ index, url }) => {
  console.log(`-> ${url}`)
  if (index < 3) return Promise.reject({ ok: false, message: 'Fck u' })
  return Promise.resolve({ ok: true })
}

class HttpClient {
  constructor ({ baseApiUrl }) {
    this.baseURL = baseApiUrl
    // NOTE: axios.create? https://axios-http.com/docs/instance
    this.yourHttpClient = async ({ url, onEarchIterator, validator }) => {
      for await (const i of retrier({ attempts: 10, delay: 500 })) {
        const result = await tryHttp({ index: i, url: `${this.baseURL}${url}` })
          .then((res) => res)
          .catch((err) => err)
        onEarchIterator(result)
        if (validator.result(result)) break
      }
    }
  }

  method1({ url }) {
    this.yourHttpClient({
      url,
      onEarchIterator: (res) => {
        // NOTE: We have event on each iterate
        console.log('- this is your event after request', res)
      },
      validator: {
        // NOTE: We have access to each response
        result: (res) => res.ok === true,
      },
    })
  }
}

const httpClient = new HttpClient({ baseApiUrl: 'https://example.com' })

httpClient.method1({ url: '/do-it' })
