const express = require('express');
const morgan = require('morgan');
// const cors = require('cors');

const { PORT, CLIENT_ORIGIN} = require('./config');

const {dbConnect} = require('./db-knex');

const app = express();

app.use(
	morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
		skip: (req, res) => process.env.NODE_ENV === 'test'
	})
);

app.get( '/test', (req, res, next) => {
	return res.json({
		name: 'Hello!'
	});
});

// app.use(cors({origin: CLIENT_ORIGIN}));

function runServer(port = PORT) {
	const server = app
		.listen(port, () => {
			console.info(`App listening on port ${server.address().port}`);
		})
		.on('error', err => {
			console.error('Express failed to start');
			console.error(err);
		});
}

if (require.main === module) {
	dbConnect();
	runServer();
}

module.exports = {
	app
};