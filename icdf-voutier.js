/**
 * A New Approximation to the Normal Distribution Quantile Function
 * Paul Voutier 2010
 * https://arxiv.org/pdf/1002.0567.pdf
 *
 * tail absolute error < 2.458 · 10−5
 * central absolute error < 1.16·10−4 @ p = 0.9692
 *
 * @param {number} [p] - probability ]0..1[
 * @return {number}
 */

const pL = 0.025,
			pH = 1 - pL,
			a0 = 0.151015505647689,
			a1 = -.5303572634357367,
			a2 = 1.365020122861334,
			b0 = 0.132089632343748,
			b1 = -.7607324991323768,
			c3 = -1.000182518730158122,
			c0 = 16.682320830719986527, //16.682320830719986527
			c1 = 4.120411523939115059, //4.120411523939115059
			c2 = 0.029814187308200211, //0.029814187308200211,
			d0 = 7.173787663925508066, //7.173787663925508066
			d1 = 8.759693508958633869 // 8.759693508958633869

export default function(p=Math.random()) {
	if (p<pL) {
		const r = Math.sqrt(-Math.log(p)*2)
		return ( c1*r + c0 ) / ( (r + d1)*r + d0 ) + c3*r + c2
	}
	if (p>pH) {
		const r = Math.sqrt(-Math.log1p(-p)*2)
		return -( ( c1*r + c0 ) / ( ( r + d1 )*r + d0 ) + c3*r + c2 )
	}
	const q = p-0.5,
				r = q*q
	return ( ( a1*r + a0 ) / ( ( r + b1 )*r + b0 ) + a2 )*q
}
