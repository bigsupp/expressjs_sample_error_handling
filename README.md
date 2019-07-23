## Sample of Error Handling in Express.js

### Use `throw new Error()`

```
app.get('/sample', (req, res) => {
  // do something
  throw new Error('blah blah')
})
```

### Use `next()`

```
app.get('/sample', (req, res, next) => {
  // do something
  next(new Error('blah blah'))
})
```

### Use `next()` with promise

```
new Promise((resolve, reject) => {
    // do something
  })
  .then(data => {
    // handle resolved
  })
  .catch(next) // reject with Error object then pass to next()
```