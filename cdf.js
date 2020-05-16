import pdf from './pdf.js'
/**
 * Normal Distribution CDF Approximation
 * http://en.wikipedia.org/wiki/Normal_distribution#Numerical_approximations_for_the_normal_CDF
 * Zelen & Severo (1964) algorithm 26.2.17, Φ(x) for x > 0 with the absolute error < 7.5e-8
 * @param {number} z
 * @return {number} probability
 */
export default function(z) {
	if (z > 6) return 1 //gives 1-1e-10, well below target 1e-8 accuracy
	else if (z < -6) return 0 //gives 1e-10, well below target 1e-8 accuracy
	var t = 1 / (1 + Math.abs(z)*0.2316419),
			t2 = t*t,
			y = t * (0.31938153 + t*-0.356563782 + t2*1.781477937 + t2*t*-1.821255978 + t2*t2*1.330274429)
	//for z<0, return 1 - normCDF(-z)
	return z < 0 ? pdf(-z)*y : 1-pdf(z)*y
}
