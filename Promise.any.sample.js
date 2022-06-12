// NOTE: The method Promise.any was supported in node.js 15.0.0, if your node.js version is old, so you could update it and try again.
// ...or use polyfill:
if (!Promise.any)
  Promise.any=o=>new Promise(((i,l)=>{var n,t,v,d,e;let u=!1,c=[],h=0,f=[];function a(o){u||(u=!0,i(o))}function r(o){f.push(o),f.length>=h&&l(f)}for(let i of o)h++,c.push(i);for(let o of c)void 0!==(null===(n=o)||void 0===n?void 0:n.then)||void 0!==(null===(t=o)||void 0===t?void 0:t.catch)?(null===(d=null===(v=o)||void 0===v?void 0:v.then((o=>a(o))))||void 0===d||d.catch((o=>{})),null===(e=o)||void 0===e||e.catch((o=>r(o)))):a(o)}));

let c = 0

const log = () => {
  console.log(c++)
}

const SlowlyDone = new Promise((resolve, _reject) => {
  setTimeout(resolve, 500, "Done slowly");
}); // resolves after 500ms

const QuicklyDone = new Promise((resolve, _reject) => {
  setTimeout(resolve, 200, "Done quickly");
}); // resolves after 100ms

const Rejection = new Promise((_resolve, reject) => {
  setTimeout(reject, 100, "Rejected"); // always rejected
});

Promise.any([
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