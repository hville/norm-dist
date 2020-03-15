var pdf = require('./pdf'),
		icdf = require('./icdf')

/**
 * expected value of a probability range
 * http://en.wikipedia.org/wiki/Truncated_normal_distribution
 * @param {number} a - probability [0..1]
 * @param {number} b - probability [0..1]
 * @return {number}
 */
module.exports = function intE(a,b) {
	return a === 0 && b === 1 ? 0
		: a === 0 ? -pdf(icdf(b)) / b
			: b === 1 ? pdf(icdf(a)) / (1 - a)
				: a === b ? icdf(a)
					: (pdf(icdf(a)) - pdf(icdf(b))) / (b - a)
}
