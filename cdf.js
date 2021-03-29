import pdf from './pdf.js'
/**
 * Normal Distribution CDF Approximation
 * http://en.wikipedia.org/wiki/Normal_distribution#Numerical_approximations_for_the_normal_CDF
 * Zelen & Severo (1964) algorithm 26.2.17, Φ(x) for x > 0 with the absolute error < 7.5e-8
 * @param {number} z
 * @return {number} probability
 */
const b0 = 0.2316419,
			b1 = 0.319381530,
			b2 = -0.356563782,
			b3 = 1.781477937,
			b4 = -1.821255978,
			b5 = 1.330274429
export default function(z) {
	if (z > 6) return 1 //gives 1-1e-10, well below target 1e-8 accuracy
	else if (z < -6) return 0 //gives 1e-10, well below target 1e-8 accuracy
	const t = 1 / (1 + b0*Math.abs(z)),
				t2 = t*t,
				y = t * (b1 + b2*t + (b3 + b4*t + b5*t2)*t2)
	return z < 0 ? pdf(-z)*y : 1-pdf(z)*y
}
