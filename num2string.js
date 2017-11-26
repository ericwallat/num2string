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
		if(negative) {
			dollar.push("Negative");
		}
		const dollar = convert(trips, dollars);
		printMoney(dollar, cents);
	}
}

/**
 * Recursively breaks down a string from 0-999 into its corresponding words
 * @param {string} num 
 * @return {string}
 */
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

/**
 * Returns true if the input string contains "-", false otherwise.
 * @param {string} num String of the input 
 * @return {boolean} 
 */
function isNegative(num) {
	if(num.includes("-")) {
		return true;
	}
	else {
		return false;
	}
}

/**
 * Determines the cents value from the dollar string.
 * @param {string} number 
 * @return {string} cents
 */
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

/**
 * Adds the cents and dollars to end and joins array of words together
 * and adds spaces between words. Prints to console.
 * @param {array} dollar String array of the words 
 * @param {string} cents String representation of the cents value
 */
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

/**
 * Checks if number is within the Max Integer value
 * @param {string} number
 * @return {Boolean}
 */
function isValid(number) {
	if(parseInt(number) > Number.MAX_SAFE_INTEGER) {
	console.log("Please enter a value less than 9,007,199,254,740,991");
	return false;
	}
	return true;
}

/**
 * Calculates the end index of the current triplet
 * @param {string} dollars
 * @param {Number} j
 * @return {Number}
 */
function calcEnd(dollars, j) {
	if(dollars.length % 3 === 0) {
		endIdx = 3 + 3*j;
	}
	else {
		endIdx = (dollars.length % 3) + 3*j
	}
	return endIdx;
}

/**
 * Iterates through the inputted number to create string representations
 * @param {Number} trips
 * @param {string} dollars
 * @return {Array}
 */
function convert(trips,dollars) {
	let startIdx = 0, endIdx = 0, j = 0;
	let i = trips;
	let dollar = [];
	for(i; i > 0; i--) {
		
		endIdx = calcEnd(dollars, j);
		j++;
		dollar.push(makeWords(parseInt(dollars.substring(startIdx,endIdx))));
				
		if(i>1) {
			dollar.push(placeNames[i])
		}
		startIdx = endIdx;
	}
	return dollar;
}

main("$234482.23")