const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');
const axios = require('axios').default;
axiosCookieJarSupport(axios);
import * as https from "https";

async function login(name,pass) {
	let cookieJar = new tough.CookieJar();

	let instance = await axios.create({
		jar:cookieJar,
		withCredentials: true,
		httpsAgent: new https.Agent({ rejectUnauthorized: false, requestCert: true, keepAlive: true})
	});
	
	let res = await instance.get('https://localhost/api/config');
	console.log(res.data.csrf_token);

	instance.defaults.headers['x-csrf-token'] = res.data.csrf_token;

	res = await instance.post('https://172.16.220.133/login',{username:name,password:pass});

	console.log(res.statusCode);
	console.log(res);
}