<!-- markdownlint-disable MD004 MD007 MD010 MD041 MD022 MD024 MD032 MD036 -->
# norm-dist

*small standalone normal distribution pdf, cdf icdf (quantile) and truncated average*

• [Example](#Example) • [Features](#Features) • [Limitations](#Limitations) • [Why](#Why) • [API](#API) • [License](#license)

# Example

```javascript
import {icdf, cdf} from 'norm-dist'
import pdf from 'norm-dist/pdf.js' //same as normDist.pdf
var quartile = icdf(0.25)
    probability = pdf(quartile),
    cummulative = cdf(quartile) // => 0.25
    interQuartileAverage = cdf(-quartile, quartile) // => 0
```

# Why

This are usually incorporated into large monolitic libraries.
Many times, only this is needed.

# API

* `.pdf(number) => number` z to probability
* `.cdf(number) => number` z to cummulative probability
* `.icdf(number) => number` probability to z, `0 <= p <= 1`
* `.intE(z0, z1) => number` average of a truncated interval

All 4 functions are also available directly in standalone files(`require('normDist').intE === require('normDist/intE')`)

# License

Released under the [MIT License](http://www.opensource.org/licenses/MIT)
