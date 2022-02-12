/**
 * Lower tail quantile for standard normal distribution function
 * Probit function, inverse CDF, z(p)
 * Algorithm by Peter John Acklam
 * http://web.archive.org/web/20151030215612/http://home.online.no/~pjacklam/notes/invnorm/
 *
 * @param {number} [p] - probability ]0..1[
 * @return {number}
 */
const a0 = -3.969683028665376e+01,
			a1 = 2.209460984245205e+02,
			a2 = -2.759285104469687e+02,
			a3 = 1.383577518672690e+02,
			a4 = -3.066479806614716e+01,
			a5 = 2.506628277459239e+00,
			b0 = -5.447609879822406e+01,
			b1 = 1.615858368580409e+02,
			b2 = -1.556989798598866e+02,
			b3 = 6.680131188771972e+01,
			b4 = -1.328068155288572e+01,
			c0 = -7.784894002430293e-03,
			c1 = -3.223964580411365e-01,
			c2 = -2.400758277161838e+00,
			c3 = -2.549732539343734e+00,
			c4 = 4.374664141464968e+00,
			c5 = 2.938163982698783e+00,
			d0 = 7.784695709041462e-03,
			d1 = 3.224671290700398e-01,
			d2 = 2.445134137142996e+00,
			d3 = 3.754408661907416e+00

const pL	= 0.02425,
			pH = 1 - pL

export default function(p=Math.random()) {
	if ( p < pL ) {
		const q = Math.sqrt(-Math.log(p) * 2)
		return (((((c0*q + c1)*q + c2)*q + c3)*q + c4)*q + c5) / ((((d0*q + d1)*q + d2)*q + d3)*q + 1)
	}
	if ( p > pH ) {
		const q = Math.sqrt(-Math.log(1 - p) * 2)
		return -(((((c0*q + c1)*q + c2)*q + c3)*q + c4)*q + c5) / ((((d0*q + d1)*q + d2)*q + d3)*q + 1)
	}
	const q = p - 0.5,
				r = q*q
	return (((((a0*r + a1)*r + a2)*r + a3)*r + a4)*r + a5) * q / (((((b0*r + b1)*r + b2)*r + b3)*r + b4)*r + 1)
}
