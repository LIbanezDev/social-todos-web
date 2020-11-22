const giphysDomains = [];
for (let i = 0; i < 10; i++) {
	giphysDomains.push(`media${i}.giphy.com`);
}
const customDomains = [''];

module.exports = {
	images: {
		domains: [...customDomains, ...giphysDomains],
	},
};
