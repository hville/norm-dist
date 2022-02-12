import t from 'assert-op'
import {icdf, cdf, pdf, intE} from './index.js'

// cdf x ==> p, must manage large value ranges
t('>', cdf(5), 0.99999, 'cdf must manage high values')
t('>', cdf(6), 0.999999, 'cdf must manage high values')
t('>', cdf(7), 0.9999999, 'cdf must manage high values')
t('<', cdf(-5), 0.00001, 'cdf must manage low values')
t('<', cdf(-6), 0.000001, 'cdf must manage low values')
t('<', cdf(-7), 0.000001, 'cdf must manage low values')

// cdf x ==> p, must be reasonably accurate
t('<', Math.abs(cdf(3)-0.5*(1+0.997300203937)), 0.0000001, 'near known value')
t('<', Math.abs(cdf(0)-0.5), 0.0000001, '0.5 prob must correspond to x~0')

// pdf x ==> d, must manage large value ranges
t('>', pdf(6), 0, 'pdf must manage high values')
t('>', pdf(3), 0, 'pdf must manage high values')
t('>', pdf(-3), 0, 'pdf must manage high values')
t('>', pdf(-6), 0, 'pdf must manage low values')

// pdf x ==> d, must be reasonably accurate
t('<', Math.abs(pdf(0) - 1/Math.sqrt(2*Math.PI)), 0.000001, '0.5 prob must correspond to 1/sqrt2pi')
t('<', Math.abs(pdf(-0.2) - pdf(0.2)), 0.0000001, 'centered: pdf(-0.2) ~ pdf(0.2)')

// intE p,p == Ex, must manage large value ranges
t('>', intE(0.99999,1), intE(0.99998,1), 'intE should behave for small max intervals')
t('<', intE(0.00001,1), intE(0.00002,1), 'intE should behave for small min intervals')

// intE p,p == Ex, must be reasonably accurate
t('<', Math.abs(intE(0,1)), 1e-7, 'average over whole p range must be ~0')
t('<', Math.abs(intE(0.49,0.51)), 1e-7, 'average over centered p range must be ~0')
t('===', intE(0.7,0.7),	icdf(0.7), '0 witdth interval average = median')

t('<', Math.abs(intE(0.889,0.891)/icdf(0.89) - 1), 0.000005, 'interval average ~ median')
t('<', Math.abs(intE(0.989,0.991)/icdf(0.99) - 1), 0.0003, 'interval average ~ median')
t('<', Math.abs(intE(0.99999998,1)/icdf(0.99999999) - 1), 0.01, 'interval average ~ median')
