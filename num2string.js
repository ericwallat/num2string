const tensNames = ["", 
                "ten", 
                "twenty", 
                "thirty", 
                "forty", 
                "fifty",
                "sixty",
                "seventy",
                "eighty",
                "ninety"];

const numNames = ["",
                "one",
                "two",
                "three",
                "four",
                "five",
                "six",
                "seven",
                "eight",
                "nine",
                "ten",
                "eleven",
                "twelve",
                "thirteen",
                "fourteen",
                "fifteen",
                "sixteen",
                "seventeen",
                "eighteen",
                "nineteen"];

const placeNames =   ["",
                    "",
                    "thousand",
                    "million",
                    "billion",
                    "trillion",
					"quadrillion",
					"quintillion"];

function main(n) {

	const negative = isNegative(n);
	const number = n.replace(/[^0-9\.]/g, '');

	if(isValid(number)) {

		const dollars = Math.floor(parseFloat(number)).toString();
		let cents = getCents(number);

		const trips = Math.ceil(dollars.length / 3);
		let dollar = [];

		if(negative) {
			dollar.push("Negative");
		}

		let startIdx = 0;
		let endIdx = 0;
		let j = 0;
		let i = trips;

		for(i; i > 0; i--) {
	
			if(dollars.length % 3 === 0) {
				endIdx = 3 + 3*j;
			}
			else {
				endIdx = (dollars.length % 3) + 3*j
			}
			
			j++;
			dollar.push(makeWords(parseInt(dollars.substring(startIdx,endIdx))));
			
			if(i>1) {
				dollar.push(placeNames[i])
			}
			startIdx = endIdx;
		}
		printMoney(dollar, cents);
	}
}

function makeWords(num) {
   if(num<20) {
       return numNames[num];
   }
   else if (num<100) {
       var tens = Math.floor(num/10);
       return (tensNames[tens] + "-" + makeWords(num-tens*10));
   }
   else {
       var hund = Math.floor(num/100);
       return (makeWords(hund) + " hundred " + makeWords(num-hund*100));
   }
}

function isNegative(num) {
	if(num.includes("-")) {
		return true;
	}
	else {
		return false;
	}
}

function getCents(number) {
	let cents;
	if(number.indexOf(".") === -1) {
		cents = 0;
	}
	else {
		cents = number.substring(number.indexOf(".")+1);
		if(cents.length === 1) {
			cents = cents + "0";
		}
	}
	return cents;
}

function printMoney(dollar, cents) {
	if(parseInt(cents)>0) {
		dollar.push("and " + cents + "/100");
	}
	//handles case of 1 dollar
	if(dollar.length === 1 && dollar[0] === "one") {
		dollar.push("dollar");
	}
	else {
		dollar.push("dollars");
	}
	console.log(dollar.join(" "));
}

function isValid(number) {
	if(parseInt(number) > Number.MAX_SAFE_INTEGER) {
	console.log("Please enter a value less than 9,007,199,254,740,991");
	return false;
	}
	return true;
}

main("$1.01")