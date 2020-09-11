const log = {
	debug: (action, data) => {
		console.log('\x1b[34m%s\x1b[0m', `${new Date()} - ${action} - ${JSON.stringify(data)}`);
	},
	info: (action, data) => {
		console.log('\x1b[32m%s\x1b[0m', `${new Date()} - ${action} - ${JSON.stringify(data)}`);
	},
	error: (action, data) => {
		console.log('\x1b[31m%s\x1b[0m', `${new Date()} - ${action} - ${JSON.stringify(data)}`);
	}
};

module.exports = log;
