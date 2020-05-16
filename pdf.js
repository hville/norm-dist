/**
 * normal distribution pdf
 * @param {number} z
 * @return {number} probability
 */
export default function(z) {
	return Math.exp(-0.5 * (Math.log(2 * Math.PI) + z*z))
}
