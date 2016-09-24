module.exports = {
	icdf: icdf,
	cdf: cdf,
	pdf: pdf,
	intE: intE,
}

/**
 * Lower tail quantile for standard normal distribution function
 * Probit function, inverse CDF, z(p)
 * Algorithm by Peter John Acklam
 * http://home.online.no/~pjacklam/notes/invnorm/impl/misra/normsinv.html
 * @param {number} p - probability ]0..1[
 * @return {number} value
 */
function icdf(p) {
	var a = [-3.969683028665376e+01, 2.209460984245205e+02,
				-2.759285104469687e+02, 1.383577518672690e+02,
				-3.066479806614716e+01, 2.506628277459239e+00],
			b = [-5.447609879822406e+01, 1.615858368580409e+02,
				-1.556989798598866e+02, 6.680131188771972e+01,
				-1.328068155288572e+01],
			c = [-7.784894002430293e-03, -3.223964580411365e-01,
					-2.400758277161838e+00, -2.549732539343734e+00,
					4.374664141464968e+00,	2.938163982698783e+00],
			d = [7.784695709041462e-03, 3.224671290700398e-01,
					2.445134137142996e+00, 3.754408661907416e+00],
			pLow	= 0.02425,
			pTop = 1 - pLow
	if ( p < pLow ) return lowCurveFit(Math.sqrt(-2 * Math.log(p)), c, d)
	if ( p > pTop ) return topCurveFit(Math.sqrt(-2 * Math.log(1 - p)), c, d)
	return midCurveFit(p - 0.5, a, b)
}
function lowCurveFit(q, c, d) {
	return (((((c[0]*q + c[1])*q + c[2])*q + c[3])*q + c[4])*q + c[5]) /
		((((d[0]*q + d[1])*q + d[2])*q + d[3])*q + 1)
}
function topCurveFit(q, c, d) {
	return -(((((c[0]*q + c[1])*q + c[2])*q + c[3])*q + c[4])*q + c[5]) /
		((((d[0]*q + d[1])*q + d[2])*q + d[3])*q + 1)
}
function midCurveFit(q, a, b) {
	var r = q*q
	return (((((a[0]*r + a[1])*r + a[2])*r + a[3])*r + a[4])*r + a[5]) * q /
		(((((b[0]*r + b[1])*r + b[2])*r + b[3])*r + b[4])*r + 1)
}

/**
 * normal distribution pdf
 * @param {number} z value
 * @return {number} probability
 */
function pdf(z) {
	return Math.exp(-0.5 * (Math.log(2 * Math.PI) + z*z))
}

/**
 * Normal Distribution CDF Approximation
 * http://en.wikipedia.org/wiki/Normal_distribution#Numerical_approximations_for_the_normal_CDF
 * Zelen & Severo (1964) algorithm 26.2.17, Φ(x) for x > 0 with the absolute error < 7.5e-8
 * @param {number} z - z-value
 * @return {number} probability
 */
function cdf(z) {
	if (z > 6) return 1 //gives 1-1e-10, well below target 1e-8 accuracy
	else if (z < -6) return 0 //gives 1e-10, well below target 1e-8 accuracy
	var b = [0.2316419, 0.31938153, -0.356563782,
				1.781477937, -1.821255978, 1.330274429],
			t = 1 / (1 + Math.abs(z)*b[0]),
			t2 = t*t,
			y = t * (b[1] + t*b[2] + t2*b[3] + t2*t*b[4] + t2*t2*b[5])
	//for z<0, return 1 - normCDF(-z)
	return z < 0 ? pdf(-z)*y : 1-pdf(z)*y
}

//expected value of prob range
//http://en.wikipedia.org/wiki/Truncated_normal_distribution
function intE(a,b) {
	return a === 0 && b === 1 ? 0
		: a === 0 ? -pdf(icdf(b)) / b
		: b === 1 ? pdf(icdf(a)) / (1 - a)
		: a === b ? icdf(a)
		: (pdf(icdf(a)) - pdf(icdf(b))) / (b - a)
}
