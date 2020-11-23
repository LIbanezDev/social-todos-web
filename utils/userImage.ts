export const getUserImageURL = (image: string): string => {
	if (image.substr(0, 8) === 'https://') {
		return image;
	}
	return 'https://storage.googleapis.com/social_todos/' + image;
};
