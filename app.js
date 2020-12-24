#!/usr/bin/env node
const argv = require('minimist')(process.argv.slice(2));
const pkg = require('./package.json');
const https = require('https');
const anonymous_api = require('./routes/api_call.js');
const auth_api = require('./routes/auth_api_call.js');

anonymous_api.getContest('https://codeforces.com/api/contest.list?gym=false');
console.log(argv);

