export function formatDate(date?: Date): string {
	if (date === undefined) return '';

	return Intl.DateTimeFormat([], {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	}).format(date);
}

export function formatTime(date?: Date): string {
	if (date === undefined) return '';

	return Intl.DateTimeFormat([], {
		hour: '2-digit',
		hour12: false,
		minute: '2-digit',
		second: '2-digit'
	}).format(date);
}
