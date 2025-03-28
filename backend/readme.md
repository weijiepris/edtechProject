# how to access database with node

# open directory to backend root

on terminal enter `node`
after that, import this config `const { db } = await import('./dist/config/db.js');`
once config is loaded run initialise the db `await db.initialize()`
import the models onto the terminal `const { models } = await import ("./src/config/db.mjs")`
