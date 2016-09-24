# Not used (edge utility better placed elsewhere)

## convert a range to moments

```javascript
function ab2μσ(rng, confInt, tgtμσ) {
  if (!confInt) confInt = 0.9
  var unitRng = - 2 * icdf( (1-confInt) / 2 ) //the range for the unit norm dist
  tgtμσ[0] = (rng[1] + rng[0]) / 2
  tgtμσ[1] = (rng[1] - rng[0]) / unitRng
  return tgtμσ
}
```

## convert moments to a range

```javascript
function μσ2ab(μσ, confInt, tgtrng) {
  if (!confInt) confInt = 0.9
  var unitRng = - 2 * icdf( (1-confInt) / 2 ) //the range for the unit norm dist
  var halfrange = μσ[1] * unitRng /2
  tgtrng[0] = μσ[0] - halfrange
  tgtrng[1] = μσ[0] + halfrange
  return tgtrng
}
```
