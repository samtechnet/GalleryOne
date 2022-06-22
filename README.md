code should be push to the Dev branch or 
simply run : "npm run gitty" command  after you have edited the commit message in gitfile.sh file
we will merge code in Dev branch to master branch after reveiw 

pls push code at intervals, when you work on something push and ensure commit message correspond with whatever was done for easy tracking 


To generate random strings : node  require('crypto').randomBytes(64).toString('hex')

to create table :  node_modules/db-migrate/bin/db-migrate create products --sql-file
heroku run bash --app gallery-one
heroku releases:output --app gallery-one
heroku config:set PGSSLMODE=no-verify --app gallery-one