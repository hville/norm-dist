import t from 'assert-op'
import F from './cdf.js'
import acklam from './icdf.js'
import voutier from './icdf-voutier.js'

function test(Q, p0, p1, n=100, epsilon=1e-5) {
	let rms = 0,
			err = 0,
			pos = 0,
			d = (p1-p0)/n
	for(let p=p0; p<=p1; p+=d) {
		const diff = p - F(Q(p))
		if (Math.abs(diff) > Math.abs(err)) {
			err = diff
			pos = p
		}
		rms += diff*diff
	}
	rms /= n
	return {rms, err, pos, tst:Math.abs(err)<epsilon}
}

console.log('voutier-low', test(voutier, Number.EPSILON, 0.025-Number.EPSILON, 400, 2.458E-5))
console.log('voutier-mid', test(voutier, 0.025, -.975, 400, 1.16E-4))
console.log('voutier-top', test(voutier, 0.975+Number.EPSILON, 1-Number.EPSILON, 400, 2.458E-5))
console.log('acklam', test(acklam, Number.EPSILON, 1-Number.EPSILON, 400, 1E-7))

function bench(Q,ps) {
	const t = Date.now()
	let s = 0
	for (const p of ps) s+=Q(p)
	return [Date.now()-t, s]
}

const ps=Array(8000000)
for (let i=0; i<ps.length; ++i) ps[i] = (i+1)/(ps.length+1)
bench(voutier, ps)
bench(acklam, ps)
console.log('acklam  ns:', bench(acklam, ps)[0]/8)
console.log('voutier ns:', bench(voutier, ps)[0]/8)

