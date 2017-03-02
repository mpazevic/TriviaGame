for (var i = 0; i < 101; i++) {
	if (i % 5 === 0 && i % 3 === 0) {
		console.log("FizzBuzz");
	} else {
		if (i % 3 === 0) {
			console.log("Fizz");
		}
		else if (i % 5 === 0) {
			console.log("Buzz");
		}
		else {
			console.log(i);
		}
	};
}

function PrimeCheck(x) {
	bracketOfTruth = [];
	if (x === 1) {
		return true;
	}
	else if (x === 2) {
		return true;
	}
	else {
		for (var i = 1; i <= x; i++) {
			if (x % i === 0) {
				bracketOfTruth.push(i);
			}
		}
	};

	if (bracketOfTruth.length === 2) {
		return true;
	}
	else {
		return false;
	};
};

function primeCheck(x) {
	for (var i = 2; i < x; i++) {
		if (x % i === 0) {
			return false;
		};
	}

	return true;

}