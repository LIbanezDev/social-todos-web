export const getUserImageURL = (image: string | null): string => {
	if (!image) {
		return 'https://storage.googleapis.com/social_todos/no-image.png';
	}
	if (image.substr(0, 8) === 'https://') {
		return image;
	}
	return 'https://storage.googleapis.com/social_todos/' + image;
};
