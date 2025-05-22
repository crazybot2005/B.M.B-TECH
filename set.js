const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUQ5aVNKemc5YmQ0SFFHVUFqNkc0a2RwbDB3VVRIMmYzYkVGWGxLREltVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaFBPdk5qTHdmK1BIcGpwdGVFa2MvYXJhR3lpV3FJSXNSeFB2RlpveVVGMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvREdKRXJqNjRCYjd4bUtKT1FONTJCR0J6Ym4xT3VCYjNzbGc2VlBzaVY0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnclZBTG5hRGdUcWZEd0lTZEFmWjJqR3BOK2JpQ3hRL1p5WTcwNzBxeDFFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllEMGJLV2lyNHJmWUhScVpPRjl3aElmdFJhc3RTaEgxQ1lIeXFyQWZRMFk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImJQUk1lbFE5OGQ4dzRQdHdkQ1orZ3hXNlU4QmJGS2Z2WmdqZ3RwNDBhRFU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiME9HQ1A0NU5SdDMxZ2FJL1lIR2h1SUNmTzJWUVhLVzNHUmhNMlV0cTMxcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMWJXVHl5ekFETWNjeFZINU1wNHY4WHBkRlhxeXhGTHBUQzBqb2tLRnhXOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBaUklvbC84MzFrTGx1dHpCYlEwYTI1dFdQZGdlaCs0c0I0T2VTUE9UOTdEY0NqR2FaRGlodTdqOXdrUDJQU2pOcFQxVExBd0YzcEtNbnQyMC9HMUFRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTU2LCJhZHZTZWNyZXRLZXkiOiJYaHQwNU9FYW52MzRUV2hpazQzZ2hWYW9EbFVOcTlHMDNJOGxHMlZDT2tJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkxOTg4MzU2NTU2M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI2QUVCQjUzODlDMTE1MjRGQjg0QzU2N0YzNEMxMTU2NiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ3ODgzNjg4fSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MTk4ODM1NjU1NjNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMjk1NkZDMDBFRjM2MTNCMDlDNjQ0M0JFMEY3RjdBRDMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0Nzg4MzY4OX0seyJrZXkiOnsicmVtb3RlSmlkIjoiOTE5ODgzNTY1NTYzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjdFMzA4QThEOUEzRkRDQ0I0RUE4QUY4RDExNkNDMDg2In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDc4ODM3MDF9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IlY4M0xIWjhGIiwibWUiOnsiaWQiOiI5MTk4ODM1NjU1NjM6NTBAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIyNDk4MTcyNTkzMTUyNDE6NTBAbGlkIiwibmFtZSI6IvCdmY/wnZmn8J2ZnvCdmajwnZmd8J2ZliDinaTigI3wn6m5In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPSzQ2YUFERUpldHVzRUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ1V1ZSTlhrbWJ0R3VvOGo1KzJaaDdMMHZ3Y0FyYklNSXM0cm14TWtST25BPSIsImFjY291bnRTaWduYXR1cmUiOiJMaTZXSlc5cjNDNTZERnNGNFBEMHkwVVgwQjZoZG82NFMxZGNnWHlMTC9MakhteTYyWkxIdmNrV1dNcWhpZmlaZWZGT1YwOGxTdU9HM3RVNG1wNVhDdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoid0hTanZ6Y1NWbkczVkRBUXJxSThWKzZUTWoxa3Bvc09ZWk1TaWd4QmlWMGtJREN2SlBQbXVseEdKRkd3VW5SSE1qcjArSTdoZEx4TWpSYjh3bjMvQXc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MTk4ODM1NjU1NjM6NTBAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYmxsVVRWNUptN1JycVBJK2Z0bVlleTlMOEhBSzJ5RENMT0s1c1RKRVRwdyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FJSUJRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ3ODgzNjg1LCJsYXN0UHJvcEhhc2giOiI0WlJQNlMiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUNvNyJ9',
    PREFIXE: process.env.PREFIX || "*",
    OWNER_NAME: process.env.OWNER_NAME || "B.M.B-TECH",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 𝙱.𝙼.𝙱-𝚇𝙼𝙳 ke",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/hvi870.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

