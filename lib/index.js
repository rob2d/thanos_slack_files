const { IncomingWebhook, WebClient } = require('@slack/client');
const PromiseUtils = require('./utils/PromiseUtils');
const envFile = require('dotenv').config(); // funnel process.env vars
const token = process.env.SLACK_TOKEN;
const channel = process.env.SLACK_CHANNEL;
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
    
    const text = '...TIME TO THANOS (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ ';

    web.chat.postMessage({ channel, text })
        .then( res => deleteFileSequence(filesToThanos) )
        .catch(console.error);
}

function deleteFileSequence(files) {
    return new Promise((resolve, reject)=> {
        PromiseUtils.runInSeries(files.map( f => ()=> deleteFile(f) ))
            .then(()=> {
                const text = 'Mission complete! ✌';
                web.chat.postMessage({ channel, text });
                resolve();
            }).catch( error => {
                console.error(error);
                const text = 'Mission failure 😥'
                web.chat.postMessage({ channel, text });
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