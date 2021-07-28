---
title: How to use async functions in Array.map in javascript
date: 2021-07-22
summary: A simple but conscise explanation about how to handle async functions inside Array.map method.
tags:
  - javascript
  - nodejs
  - tutorials
image:
  source: https://emanuelosva-blog-images.s3.amazonaws.com/asyn-map-array.png
  description: (Async in array.map)
author:
  name: Many Osorio
  image: /assets/author-image.png
---

Nowadays the iterator methods of the arrays in javascript like `map` or `forEach` aren't able to evaluate asynchronous logic inside the callback that it receives as param.

```js
// Not work.

const myNewArray = myArra.map(async (item) => {
  const syncValue = syncFunc(item)
  const asyncValue = await asyncFunc(item)
  return { syncValue, asyncValue }
})
```

Syntactically the code above is correct, but if you execute it you will have something like:

```js
[
  { syncValue: Object, asyncValue: Promise<pending> },
  { syncValue: Object, asyncValue: Promise<pending> },
  { syncValue: Object, asyncValue: Promise<pending> },
  ...
]
```

What has happend?

We need to remember that both, nodejs and v8 engine (the motor that executes js in the browser) are `single thread`, so only one thread executes the logic in sequence (each instruction is resolved one by one).

If we have 3 functions:

```js
// Process in sequence

// 1.
processOne()

// 2.
const myNewArray = myArra.map(async (item) => {
  const syncValue = syncFunc(item)
  // Each call of `asynFunc` is now
  // in the event loop, but there is no time
  // to wait until some value will fulfilled
  const asyncValue = await asyncFunc(item)
  return { syncValue, asyncValue }
})

// 3.
processThree()
```

The code above calls first the `processOne` function, then executes the `Array.map` but inmediatly the `processThree` function is executed. As we can see, there is no time to wait until each promises in the `Array.map` is resolved, that is the reason we have as result an array fill of `Promise<pending>` (No resolved promises)

To achive our goal, we need an instruction that says:

> Before any other process, wait until all promises in the array are resolved

And that instruction is: [**Promise.all**](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

`Promise.all` return a promise that finish when all promises in the iterable argumet has been resolved successfully, otherwise the function is reject.

With `Promise.all` we can *"convert"* all pending promises inside an iterable (eg: an array of promises) into a single promise that is resolved when everyone in the array is resolved:

```js
const myNewArray = await Promise.all(
  myArra.map(async (item) => {
    const syncValue = syncFunc(item)
    const asyncValue = await asyncFunc(item)
    return { syncValue, asyncValue }
  })
)

// OR

const myNewArrayOfPromises = myArra.map(async (item) => {
  const syncValue = syncFunc(item)
  const asyncValue = await asyncFunc(item)
  return { syncValue, asyncValue }
})

const myNewArray = await Promise.all(myNewArrayOfPromises)
```

Now, `myNewArray` looks like:

```js
[
  { syncValue: Object, asyncValue: { ...someProps } },
  { syncValue: Object, asyncValue: { ...someProps } },
  { syncValue: Object, asyncValue: { ...someProps } },
  ...
]
```

With `Promise.all` we can handle asyn fuctions inside `Array.map` and any process after it will wait until the Promise has resolved.

**Some other usefull resources:**

- [Promise.allSettled](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)
- [Promise.race](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)
- [Promise Pool](https://betterprogramming.pub/improve-your-node-js-performance-with-promise-pools-65615bee2adb)


## Conclusion

The asynchronism is one of the most powerfull concepts in js programming, it allow us to execute long tasks without blocking the main process. But we need to be carefull with async process, cause no wait untill a promse will fullfilled can carry us in many kind of bugs.
But if we understand how the asynchronism works, we going to be able to use it in almost any way we need.
