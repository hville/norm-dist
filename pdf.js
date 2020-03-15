/**
 * normal distribution pdf
 * @param {number} z
 * @return {number} probability
 */
module.exports = function pdf(z) {
	return Math.exp(-0.5 * (Math.log(2 * Math.PI) + z*z))
}
