export const textDotsFormat = (text, maxLength) => {
	if (text) {
		const textLength = text.length;

		if (textLength > maxLength) {
			return text.substring(0, maxLength) + '...';
		}

		return text;
	}
};

export const textCapitalizeFormat = (text, isAll) => {
	if (text) {
		if (isAll) {
			return text
				.split(' ')
				.map(word => word.charAt(0).toUpperCase() + word.slice(1))
				.join(' ');
		} else {
			return text.charAt(0).toUpperCase() + text.slice(1);
		}
	}
};
