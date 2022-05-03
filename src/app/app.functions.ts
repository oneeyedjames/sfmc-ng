export type formatDateType = 'date' | 'time' | 'datetime';

export function formatDate(date?: Date | string, type?: formatDateType): string {
	if (date === undefined) return '';
	if (type === undefined) type = 'date';

	if (typeof date === 'string')
		date = parseDate(date);

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

export function formatDateTime(date?: Date | string): string {
	return formatDate(date, 'datetime');
}

export function formatTime(date?: Date | string): string {
	return formatDate(date, 'time');
}

export function parseDate(date?: string): Date | undefined {
	if (date === undefined || date.length == 0) return undefined;

	const regex1 = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})(\.\d+)?$/;
	const regex2 = /^(\d\d?\/\d\d?\/\d{4})\s(\d\d?:\d\d?:\d\d?)\s([AP]M)$/;

	// Fix times to CST, without DST
	if (date.match(regex1)) date = `${date}-0600`;
	else if (date.match(regex2)) date = `${date} CST`;

	return new Date(date);
}
