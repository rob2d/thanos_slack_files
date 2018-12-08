const { IncomingWebhook, WebClient } = require('@slack/client');
const PromiseUtils = require('./PromiseUtils');
const envFile = require('dotenv').config(); // funnel process.env vars
const token = process.env.SLACK_TOKEN;
const channel = process.env.SLACK_CHANNEL;
const admin = process.env.SLACK_ADMIN;
const DELETION_INTERVAL = process.env.DELETION_INTERVAL || 10 * 1000; // interval between file deletion

const web = new WebClient(token);

/**
 * formats a slack file for logging

 * @returns {String}
 */
function formatFileText(f) {
    if(f) { return `*${f.name}* (${Math.round(f.size/1000)}kb)`; }
    else return '*!*file_error'
}

/**
 * delete an array of slack files
 * (with some enthusiastic logging)
 */
function runThanos (files) {            

    // sort files in descending order, 
    // then grab half for thanos-ing

    let filesToThanos = files.sort((f1, f2) => (f2.size-f1.size))
                        .splice(0, files.length/2);

    web.chat.postMessage({ channel, text : '...TIME TO THANOS (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ ' })
        .then( res => deleteFileSequence(filesToThanos) )
        .catch(console.error);
}

function deleteFileSequence(files) {
    return new Promise((resolve, reject)=> {
        PromiseUtils.runInSeries(files.map( f => ()=> deleteFile(f) ))
            .then(()=> {
                web.chat.postMessage({ channel, text : 'Mission complete! ✌' });
                resolve();
            }).catch( error => {
                console.error(error);
                web.chat.postMessage({ channel, text : 'Mission failure 😥' });
            });
    });
}

/**
 * waits for specified deletion interval,
 * then delete file and post message to chat
 */
function deleteFile(file) {
    return new Promise((resolve, reject)=> {
        setTimeout(()=> {
            web.files.delete({ file: file.id })
                .then(()=> {
                    web.chat.postMessage({ channel, text : `${formatFileText(file)} was thanos'd` })
                        .then(resolve).catch(reject)
                }).catch( reject );
        }, DELETION_INTERVAL);
    });
}

web.files.list()
    .then(({ files }) => runThanos(files))
    .catch(console.error);