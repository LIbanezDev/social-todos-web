export const toParams = (query: string): object => {
	const q = query.replace(/^\??\//, '');

	return q.split('&').reduce((values, param) => {
		const [key, value] = param.split('=');

		values[key] = value;

		return values;
	}, {});
};

export const toQuery = (params: object, delimiter = '&'): string => {
	const keys = Object.keys(params);

	return keys.reduce((str, key, index) => {
		let query = `${str}${key}=${params[key]}`;

		if (index < keys.length - 1) {
			query += delimiter;
		}

		return query;
	}, '');
};
