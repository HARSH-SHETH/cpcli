#!/usr/bin/env node
const argv = require('minimist')(process.argv.slice(2));
const pkg = require('./package.json');
const https = require('https');

https.get('https://codeforces.com/api/contest.list?gym=false', function(res){
  if(err){
    console.log("harsh");
    process.exit(1);
  }
  console.log("status code: ", res.statusCode);
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    data = JSON.parse(data);
    let results = data.result;
    results.forEach(function(contest){
      if(contest.phase == "BEFORE"){
        console.log(contest.name);
      }
    });

  });
});
