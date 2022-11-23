//ease in function from https://github.com/component/ease/blob/master/index.js

const outQuad = (n) => {
	return n * (2 - n);
};

const inOutQuad = (n) => {
	n *= 2;
	if (n < 1) return 0.5 * n * n;
	return -0.5 * (--n * (n - 2) - 1);
};

const inOutQuint = (n) => {
	n *= 2;
	if (n < 1) return 0.5 * n * n * n * n * n;
	return 0.5 * ((n -= 2) * n * n * n * n + 2);
};

export { outQuad, inOutQuad, inOutQuint };
