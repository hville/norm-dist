/**
 * normal distribution pdf
 * @param {number} z
 * @return {number} probability
 */
export default function(z) {
	return Math.exp(-(Math.log(2 * Math.PI) + z*z) * 0.5)
}
