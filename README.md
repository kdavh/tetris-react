# Tetris in react

## To Run:

I always run my apps in isolated docker containers, so I would just do `make build && make run` from project root.
But if you have npm installed directly on your system, you should just be able to run `cd tetris && npm install && npm start` which starts a server on port 3000.  Then of course just visit localhost:3000 in your browser.

## Development notes:
- experimented using react bootstrap
  - `npm install -g create-react-app; create-react-app tetris`

- There are tests, `npm test` should do it if you're not running in docker. But the default config needs a fix when run in docker. `npm test` inside docker container (`make test` outside of container) does not work by default.  Fix by commenting out lines 25-27 of tetris/node_modules/react-scripts/scripts/test.js (removing default `--watch` argument). `--watch` triggers ENOSPC for some reason I haven't been able to figure out.
