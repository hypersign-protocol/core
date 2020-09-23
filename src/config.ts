import env from 'dotenv'
import sqlite from 'sqlite3';
import path from 'path';
import fs from 'fs'
import hsdk from 'lds-sdk'
const log = require('simple-node-logger');


env.config();

const log_dir = path.resolve(__dirname,'../log')
const db_dir = path.resolve(__dirname,'../db')

if(!fs.existsSync(log_dir)) fs.mkdirSync(log_dir)
if(!fs.existsSync(db_dir)) fs.mkdirSync(db_dir)

// LOGGING
const log_path = path.resolve(__dirname, process.env.LOG_FILEPATH || 'ssi-infra.log')
const logger = log.createSimpleLogger({
    logFilePath: log_path,
    timestampFormat: process.env.LOG_TIMESTAMP_FORMAT || 'YYYY-MM-DD HH:mm:ss.SSS'
})
logger.setLevel(process.env.LOG_LEVEL || 'info')

const port = process.env.PORT || 5000
const host = process.env.HOST || "localhost"


// DATABASE
// Ref: https://www.sqlitetutorial.net/sqlite-nodejs/
const db_file_path = process.env.DATABASE_FILEPATH || 'ssi.db'; 
const db_path = path.resolve(__dirname, db_file_path)
const db =  new sqlite.Database(db_path, (err) => {
    if(err){
        logger.error(`SQLite db error:  ${err.message}`)
    }else{
        logger.info(`Connected to ssi-infa database. DB path = ${db_path}`)
    }
});

// DID Related
const did = {
    sheme : process.env.DID_SCHEME || 'did',
    method : process.env.DID_METHOD_NAME || 'hypersign',
}

const jwtSecret = process.env.JWT_SECRET || 'secretKey'
const jwtExpiryInMilli = 240000
const recaptchaSecret = process.env.RECAPTCHA_SECRET 

const explorer = {
    port : process.env.EXPLORER_PORT || 5001,
    host : process.env.EXPLORER_HOST || "localhost"
}

const hostname = `http://${host}:${port}`
const options = { nodeUrl: hostname,  didScheme:  "did:hs"}
const hypersignSDK = {
    did: hsdk.did(options)
}

export  {
    port,
    host,
    logger,
    db,
    did,
    jwtSecret,
    jwtExpiryInMilli,
    recaptchaSecret,
    explorer,
    hypersignSDK
}