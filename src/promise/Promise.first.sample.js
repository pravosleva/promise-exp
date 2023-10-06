// NOTE: Polyfill
if (!Promise.first)
  // Promise.first = function(prs) {
  //   return new Promise((resolve, reject) => {
  //     const errs = []
  //     prs.forEach((pr, i) => {
  //       Promise.resolve(pr)
  //         .then(resolve)
  //         .catch((err) => {
  //           errs.push(err)
  //           if (i === prs.length - 1) reject(errs)
  //         })
  //     })
  //   })
  // }
  // https://github.com/huruji/p-first
  Promise.first = function(e){return Promise.all(e.map(function(e){return e.then(function(e){return Promise.reject(e)},function(e){return Promise.resolve(e)})})).then(function(e){return Promise.reject(e)},function(e){return Promise.resolve(e)})};

const SlowlyDone = new Promise((resolve, _reject) => {
  setTimeout(resolve, 10000, "Done slowly");
}); // resolves after 10000ms

const QuicklyDone = new Promise((resolve, _reject) => {
  setTimeout(resolve, 200, "Done quickly");
}); // resolves after 100ms

const Rejection = new Promise((_resolve, reject) => {
  setTimeout(reject, 100, "Rejected"); // always rejected
});

Promise.first([
  SlowlyDone,
  QuicklyDone,
  Rejection,
])
  .then((value) => {
    console.log(value);
    // QuicklyDone fulfils first
  })
  .catch((err) => {
    console.log(err);
    // Arrary of rejections (if no one resolved)
  });

// expected output: Done quickly
