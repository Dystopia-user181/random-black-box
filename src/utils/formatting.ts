export function format(
	value : number,
	places = 2,
	placesUnder1000 = 3,
	small = true
) {
	if (value === Infinity) return "Infinity";
	if (value === 0)
		return (0).toFixed(placesUnder1000);
	if (Math.log10(value) < -2 && small) {
		const e = Math.floor(Math.log10(value) + Number.EPSILON);
		return `${Math.min(value / Math.pow(10, e), 10 - Math.pow(0.1, places)).toFixed(places)}e${e}`;
	}
	if (value < 1000 && Number(value.toFixed(placesUnder1000)) < 1000)
		return value.toFixed(placesUnder1000);
	const e = Math.floor(Math.log10(value) + Number.EPSILON);
	return `${Math.min(value / Math.pow(10, e), 10 - Math.pow(0.1, places)).toFixed(places)}e${e}`;
}

export function formatX(value : number, places = 2, placesUnder1000 = 3) {
	return `×${format(value, places, placesUnder1000)}`;
}

export function formatPow(value : number, places = 2, placesUnder1000 = 3) {
	return `^${format(value, places, placesUnder1000)}`;
}

export function formatPercents(value : number, places = 2) {
	return `${format(value * 100, 2, places)}%`;
}

export function formatInt(x : number) {
	return format(x, 2, 0, false);
}

export function formatOrder(value: number) {
	let suffix = "th";
	const x = Math.round(value);
	if (x % 100 < 10 || x % 100 >= 20) {
		switch (x % 10) {
			case 1:
				suffix = "st";
				break;
			case 2:
				suffix = "nd";
				break;
			case 3:
				suffix = "rd";
				break;
		}
	}
	return `${x}${suffix}`;
}