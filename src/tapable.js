// const obj = { a: 1 }

// const obj2 = { ...obj, b: 2 }

// console.log(obj2)

const { SyncHook, SyncBailHook, SyncWaterfallHook, SyncLoopHook, AsyncSeriesHook, AsyncSeriesBailHook, AsyncSeriesWaterfallHook, AsyncParallelHook } = require('tapable');

// NOTE: SyncHook

// const hook = new SyncHook(['arg1', 'arg2']);

// hook.tap('tap1', (arg1, arg2) => {
//   console.log('tap1:', arg1, arg2);
// });

// hook.tap('tap2', (arg1, arg2) => {
//   console.log('tap2:', arg1, arg2);
// });

// hook.call('zz', 'kk');

// NOTE: SyncBailHook

// const hook = new SyncBailHook(['arg1', 'arg2'])

// hook.tap('tap1', (arg1, arg2) => {
//   console.log('tap1:', arg1, arg2)
//   return true
// })

// hook.tap('tap2', (arg1, arg2) => {
//   console.log('tap2:', arg1, arg2)
// })

// hook.call('zz', 'kk');

// NOTE: SyncWaterfallHook

// const hook = new SyncWaterfallHook(['arg1', 'arg2'])

// hook.tap('tap1', (arg1, arg2) => {
//   console.log('tap1:', arg1, arg2)
//   return 'tap1'
// })

// hook.tap('tap2', (arg1, arg2) => {
//   console.log('tap2:', arg1, arg2)
// })

// hook.tap('tap3', (arg1, arg2) => {
//   console.log('tap3:', arg1, arg2)
// })


// hook.call('zz', 'kk');

// NOTE: SyncLoopHook

// let tap1 = 1
// let tap2 = 2

// const hook = new SyncLoopHook(['arg1', 'arg2'])

// hook.tap('tap1', (arg1, arg2) => {
//   console.log('tap1:', arg1, arg2)
//   if (tap1 !== 2) {
//     return tap1++;
//   }
// })

// hook.tap('tap2', (arg1, arg2) => {
//   console.log('tap2:', arg1, arg2)
//   if (tap2 !== 3) {
//     return tap2++;
//   }
// })

// hook.call('zz', 'kk');

// NOTE: AsyncSeriesHook

// console.time('timer');

// const hook = new AsyncSeriesHook(['arg1', 'arg2'])

// hook.tapPromise('tap1', (arg1, arg2) => {
//   console.log('tap1:', arg1, arg2)
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, 1000);
//   });

// })

// hook.tapAsync('tap2', (arg1, arg2, callback) => {
//   console.log('tap2:', arg1, arg2)
//   setTimeout(() => {
//     callback();
//   }, 1000);
// })

// hook.callAsync('zz', 'kk', () => {
//   console.log('?????????????????? done');
//   console.timeEnd('timer');
// });

// NOTE: AsyncSeriesBailHook
// console.time('timer');

// const hook = new AsyncSeriesBailHook(['arg1', 'arg2'])

// hook.tapAsync('tap1', (arg1, arg2, callback) => {
//   console.log('tap1:', arg1, arg2)
//   setTimeout(() => {
//     callback(1);
//   }, 1000);
// })

// hook.tapPromise('tap2', (arg1, arg2) => {
//   console.log('tap2:', arg1, arg2)
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, 1000);
//   });

// })

// hook.callAsync('zz', 'kk', () => {
//   console.log('?????????????????? done');
//   console.timeEnd('timer');
// });

// NOTE: AsyncSeriesWaterfallHook

// console.time('timer');

// const hook = new AsyncSeriesWaterfallHook(['arg1', 'arg2'])

// // hook.tapPromise('tap1', (arg1, arg2) => {
// //   console.log('tap1:', arg1, arg2)
// //   return new Promise((resolve) => {
// //     setTimeout(() => {
// //       resolve();
// //     }, 1000);
// //   });

// // })

// hook.tapAsync('tap1', (arg1, arg2, callback) => {
//   console.log('tap1:', arg1, arg2)
//   return setTimeout(() => {
//     callback();
//   }, 1000);
// })

// hook.tapPromise('tap2', (arg1, arg2) => {
//   console.log('tap2:', arg1, arg2)
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, 1000);
//   });

// })

// hook.callAsync('zz', 'kk', () => {
//   console.log('?????????????????? done');
//   console.timeEnd('timer');
// });

// NOTE: AsyncParallelHook

// console.time('timer');

// const hook = new AsyncParallelHook(['arg1', 'arg2'])

// hook.tapAsync('tap1', (arg1, arg2, callback) => {
//   console.log('tap1:', arg1, arg2)
//   return setTimeout(() => {
//     callback();
//   }, 1000);
// })

// hook.tapPromise('tap2', (arg1, arg2) => {
//   console.log('tap2:', arg1, arg2)
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, 1000);
//   });

// })

// hook.callAsync('zz', 'kk', () => {
//   console.timeEnd('timer');
// });

// NOTE: intercept
const hook = new SyncHook(['arg1', 'arg2']);

hook.intercept({
  // ???????????? hook ????????? tap() ???????????????????????????, ?????????????????????,
  // ???????????? tap ????????????, ???????????? tap ????????????;
  register: (tapInfo) => {
    console.log(`${tapInfo.name} ??????`);
    return tapInfo;
  },
  // ??????hook??????????????????call???????????????????????????
  call: (arg1, arg2) => {
    console.log('call start');
  },
  // ??????????????????????????????????????????????????????
  tap: (tap) => {
    console.log('tap====>', tap);
  },
  // loop??????????????? ??????????????????????????????????????????????????????
  loop: (...args) => {
    console.log('loop====>', args);
  },
});

hook.tap('tap1', (arg1, arg2) => {
  console.log('tap1:', arg1, arg2);
});

hook.tap('tap2', (arg1, arg2) => {
  console.log('tap2:', arg1, arg2);
});

hook.call('zz', 'kk');