<!-- markdownlint-disable MD004 MD007 MD010 MD041 MD022 MD024 MD032 MD036 -->
# articles and references

[voutier 2010](https://arxiv.org/pdf/1002.0567.pdf)

[2004 Acklam](http://web.archive.org/web/20151030215612/http://home.online.no/~pjacklam/notes/invnorm/)

[2015 review of icdf approximations](https://chasethedevil.github.io/post/monte-carlo-inverse-cumulative-normal-distribution/) with bad links

[benchmark](http://www.doc.ic.ac.uk/~wl/papers/07/csur07dt.pdf)
ziggurat2000 > MontyPython1998 > PPND71988(wichura) > Polar1969

[William shaw 2007](https://web.archive.org/web/20150907210723/http://www.mth.kcl.ac.uk/~shaww/web_page/papers/NormalQuantile1.pdf)

[William shaw 2007](https://web.archive.org/web/20070305193144/http://home.online.no/~pjacklam/notes/invnorm/impl/shaw/Acklam.pdf)
(n,d) numerator and denominator degree
(3,4) Beasley-Springer-Moro (BSM)
	==> modified, fastest
(-24.820209533706798850 y3 + 40.864622120467790785 y2 - 18.515898959450185753 y + 2.5066282682076065359)
/ (3.0154847661978822127 y4 - 20.641301545177201274 y3 + 22.831834928541562628 y2 - 8.4339736056039657294 y + 1)
	=> relative error < 2.6E-9 in central BSM region
(7,7) Wichura "AS241" (1988)
	=> modified, most accurate
	=> machine precision
(5,5) Acklam algorithms

polynomial only: 1, 7/6, 127/90, 4369/2520, 34807/16200, 20036983/7484400, 2280356863/681080400
	(7) relative < 1E-9 in a region extending to about u = 0.64to 0.7
==> cdf(r=x-1/2) = r + 7/6r2 + 127/90r3 ...

[2016 THOMAS LUU](https://discovery.ucl.ac.uk/id/eprint/1482128/1/Luu_thesis.pdf) FAST AND ACCURATE PARALLEL COMPUTATION OF QUANTILE FUNCTIONS FOR RANDOM NUMBER GENERATION
* Modern simulation methods such
as quasi-Monte Carlo and copula methods call for direct inversion of CDFs
breakpoints
b = 0.08 for Moro [55],
• b = 0.075 for Wichura (Algorithm AS 241) [83],
• b = 0.02425 for Acklam [2].

[Mike Giles GPU approach](https://people.maths.ox.ac.uk/gilesm/codes/erfinv/gems.pdf)
