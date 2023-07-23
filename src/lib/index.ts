export const getLocaleString = (dateString: string): string => {
	// 正しいフォーマットかチェック
	if (!/^\d{17}$/.test(dateString)) {
		throw new Error('Invalid Date String');
	}

	const year = parseInt(dateString.substring(0, 4));
	const month = parseInt(dateString.substring(4, 6)) - 1;
	const day = parseInt(dateString.substring(6, 8));
	const hour = parseInt(dateString.substring(8, 10));
	const minute = parseInt(dateString.substring(10, 12));
	const second = parseInt(dateString.substring(12, 14));
	const millisecond = parseInt(dateString.substring(14));

	const date = new Date(Date.UTC(year, month, day, hour, minute, second, millisecond));
	return date.toLocaleString();
};
