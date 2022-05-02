export type formatDateType = 'date' | 'time' | 'datetime';

export function formatDate(date?: Date, type?: formatDateType): string {
	if (date === undefined) return '';
	if (type === undefined) type = 'date';

	const parts = [] as string[];

	if (type.includes('date')) {
		parts.push(Intl.DateTimeFormat([], {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		}).format(date));
	}

	if (type.includes('time')) {
		let time = Intl.DateTimeFormat([], {
			hour: '2-digit',
			hour12: false,
			minute: '2-digit',
			second: '2-digit',
			timeZoneName: 'short'
		}).format(date);

		if (time.startsWith('24'))
			time = '00' + time.substr(2);

		parts.push(time);
	}

	return parts.join(' ');
}

export function formatDateTime(date?: Date): string {
	return formatDate(date, 'datetime');
}

export function formatTime(date?: Date): string {
	return formatDate(date, 'time');
}
