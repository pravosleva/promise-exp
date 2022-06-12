const SlowlyDone = () => new Promise((resolve, _reject) => {
  setTimeout(resolve, 500, "Done slowly");
});
const QuicklyDone = () => new Promise((resolve, _reject) => {
  setTimeout(resolve, 200, "Done quickly");
});
const Rejection = () => new Promise((_resolve, reject) => {
  setTimeout(reject, 100, "Rejected");
});
const RejectionPermanent = () => Promise.reject('Rejected Permanent');
const SlowlyRejection = () => new Promise((_resolve, reject) => {
  setTimeout(reject, 600, "Rejected slowly");
});

Promise.all([
  SlowlyDone(),
  QuicklyDone(),
  // Rejection(),
  // RejectionPermanent(),
  // SlowlyRejection(),
])
  .then((values) => {
    console.log(values);
    // Array of fulfills (if no one rejected! else catch below)
  })
  .catch((err) => {
    console.log(err);
    // First rejection only
  });

// expected output 1 & 2: [ 'Done slowly', 'Done quickly' ]
// expected output 1 & ... & 3: 'Rejected'
