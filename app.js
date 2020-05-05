require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const request = require('request');

mongoose.connect(process.env.URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});

//configs
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// DATABASE SETUPS
let patientSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	mobile: Number,
	email: String,
	patientCondition: String
});

const patient = mongoose.model('patient', patientSchema);

// ROUTES
app.get('/', (req, res) => {
	request('https://api.covid19india.org/data.json', (error, response, body) => {
		if (!error && response.statusCode == 200) {
			const data = JSON.parse(body);
			const latestData = data.cases_time_series.length - 1;

			data.statewise.shift();
			res.render('index', { updates: data, length: latestData });
		} else {
			console.log('SOMETHING WENT WRONG IN THE API CODE !');
		}
	});
});

// app.get('/indialive', (req, res) => {
// 	request('https://api.covid19india.org/data.json', (error, response, body) => {
// 		if (!error && response.statusCode == 200) {
// 			const data = JSON.parse(body);
// 			data.statewise.shift();
// 			res.render('india', { updates: data.statewise });
// 		}
// 	});
// });

// app.get('/worldlive', (req, res) => {
// 	request('https://api.covid19api.com/summary', (error, response, body) => {
// 		if (!error && response.statusCode == 200) {
// 			const data = JSON.parse(body);

// 			res.render('world', { updates: data['Countries'] });
// 		}
// 	});
// });

app.post('/sickpeople', (req, res) => {
	patient.create(
		{
			firstName: req.body.patientFirstName,
			lastName: req.body.patientLastName,
			email: req.body.email,
			mobile: req.body.mobile,
			patientCondition: req.body.patientCondition
		},
		(err, patientData) => {
			err ? console.log(`SOMETHING WENT WRONG !`) : console.log(patientData);
		}
	);
	res.redirect('/');
});

app.get('*', (req, res) => {
	res.send('ERROR 404 PAGE NOT FOUND :(');
});

// SERVER CODE
app.listen(3000, () => {
	console.log('Server is Listening');
});
