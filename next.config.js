
const domains = [];
for (let i = 0; i < 10; i++) {
	domains.push(`media${i}.giphy.com`)
}
module.exports = {
	images: {
		domains,
	},
}
