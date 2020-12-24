const https = require('https');
const anonymous_api = {};

function call_api(url, callback){
  const req = https.get(url, function(res){
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      data = JSON.parse(data);
      callback(null, data);
    });
  });
  req.on('error', (err) => { callback(err); });
  req.end();
}

// GET UPCOMING CONTEST LISTS
anonymous_api.getContest = function(url){
  call_api(url, function(err, data){
    if(err){
      console.log(err);
      process.exit(1);
    }
    let results = data.result;
    results.forEach(function(contest){
      if(contest.phase == "BEFORE"){
        console.log(contest.name);
      }
    });
  });
}

module.exports = anonymous_api;
