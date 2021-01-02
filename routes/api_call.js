const https = require('https');
const chalk = require('chalk');

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
    if(results !== undefined){
      console.log(chalk.yellow.underline(`\t** List Of Upcoming Contest **\n`));
      results.forEach(function(contest, i){
        if(contest.phase == "BEFORE"){
          // console.log(chalk.green.underline(contest.name));
          const date = new Date(Number(contest.startTimeSeconds) * 1000);
          const duration = Number(contest.durationSeconds) / 3600;  // CONVERT INTO HOURS;
          console.log(`[${chalk.blue(i+1)}] ${chalk.green(contest.name)}\n`);
          console.log(`    ${chalk.green("-> Contest Type:")} ${chalk.magenta(contest.type)}\n    ${chalk.green("-> Contest Duration:")} ${chalk.magenta(duration, "hours")} \n    ${chalk.green('-> Begins at:')} ${chalk.magenta(date)}\n`);
        }
      });
    }else{
      console.log(chalk.red("OOPS !!! No Contest Found"));
    }
  });
}

module.exports = anonymous_api;
