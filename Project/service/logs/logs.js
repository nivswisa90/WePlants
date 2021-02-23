const fs = require("fs");
const moment = require("moment");
const path = './text';

module.exports = {
    writeBackLog: (log) => {
        var currentDate = moment().format('L');
        var currentTime = moment().format('LTS');
        var logText = currentDate + "::" + currentTime + "::  " + log + '\n';
        fs.appendFile(path, logText, function (err) {
            if (err)
                errorServerLogs(`Error writing to backlog: ${err}`);
        })
    }
};
