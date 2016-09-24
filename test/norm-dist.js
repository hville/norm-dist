var ct = require('cotest')
var N = require('../index')

ct('icdf p ==> x, must manage ]0..1[ values', function(){
	ct('===', N.icdf(0.5), 0, 'x(p-0.5) = 0')
	ct('<', Math.abs(N.icdf(0.0228)+2), 1e-3, 'error for x(p=0.0228) ~= -2.0')
	ct('<', Math.abs(N.icdf(0.95)-1.644853626951), 1e-7, 'error for x(p=0.95) ~= 1.644853626951')
	ct('<', Math.abs(N.icdf(0.98928)-2.3), 1e-3, 'error for x(p=0.98928) ~= 2.3')
})

ct('cdf x ==> p, must manage large value ranges', function(){
	ct('>', N.cdf(5), 0.99999, 'cdf must manage high values')
	ct('>', N.cdf(6), 0.999999, 'cdf must manage high values')
	ct('>', N.cdf(7), 0.9999999, 'cdf must manage high values')
	ct('<', N.cdf(-5), 0.00001, 'cdf must manage low values')
	ct('<', N.cdf(-6), 0.000001, 'cdf must manage low values')
	ct('<', N.cdf(-7), 0.000001, 'cdf must manage low values')
})

ct('cdf x ==> p, must be reasonably accurate', function(){
	ct('<', Math.abs(N.cdf(3)-0.5*(1+0.997300203937)), 0.0000001, 'near known value')
	ct('<', Math.abs(N.cdf(0)-0.5), 0.0000001, '0.5 prob must correspond to x~0')
})

ct('pdf x ==> d, must manage large value ranges', function(){
	ct('>', N.pdf(6), 0, 'pdf must manage high values')
	ct('>', N.pdf(3), 0, 'pdf must manage high values')
	ct('>', N.pdf(-3), 0, 'pdf must manage high values')
	ct('>', N.pdf(-6), 0, 'pdf must manage low values')
})

ct('pdf x ==> d, must be reasonably accurate', function(){
	ct('<', Math.abs(N.pdf(0) - 1/Math.sqrt(2*Math.PI)), 0.000001, '0.5 prob must correspond to 1/sqrt2pi')
	ct('<', Math.abs(N.pdf(-0.2) - N.pdf(0.2)), 0.0000001, 'centered: pdf(-0.2) ~ pdf(0.2)')
})

ct('intE p,p == Ex, must manage large value ranges', function(){
	ct('>', N.intE(0.99999,1), N.intE(0.99998,1), 'intE should behave for small max intervals')
	ct('<', N.intE(0.00001,1), N.intE(0.00002,1), 'intE should behave for small min intervals')
})

ct('intE p,p == Ex, must be reasonably accurate', function(){
	ct('<', Math.abs(N.intE(0,1)), 1e-7, 'average over whole p range must be ~0')
	ct('<', Math.abs(N.intE(0.49,0.51)), 1e-7, 'average over centered p range must be ~0')
	ct('===', N.intE(0.7,0.7),	N.icdf(0.7), '0 witdth interval average = median')

	ct('<', Math.abs(N.intE(0.889,0.891)/N.icdf(0.89) - 1), 0.000005, 'interval average ~ median')
	ct('<', Math.abs(N.intE(0.989,0.991)/N.icdf(0.99) - 1), 0.0003, 'interval average ~ median')
	ct('<', Math.abs(N.intE(0.99999998,1)/N.icdf(0.99999999) - 1), 0.01, 'interval average ~ median')
})
