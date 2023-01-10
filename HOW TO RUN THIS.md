# Installing:

`yarn` on root

# Running:

In a new terminal:
`mongod --dbpath=/Users/guilhermereis/data/db`

(create this folder if it doens't exist: `mkdir /Users/guilhermereis/data/db`)

Look for environment variables in Heroku to fill
backend/.env
and
backend/dev.env

(same variables for both)

cd backend && yarn dev

cd frontend && yarn dev

# If theres problems with React 18:

Use legacy peer deps:

npm install @material-ui/core @material-ui/icons --legacy-peer-deps
