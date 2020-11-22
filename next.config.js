const giphysDomains = [];
for (let i = 0; i < 10; i++) {
	giphysDomains.push(`media${i}.giphy.com`);
}
const customDomains = ['', 'storage.googleapis.com', 'lh3.googleusercontent.com', 'avatars1.githubusercontent.com'];

module.exports = {
	images: {
		domains: [...customDomains, ...giphysDomains],
	},
};
