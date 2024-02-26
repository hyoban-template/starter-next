import shell from 'shelljs'

// rm -f server.js
// rm -rf ./dist
// cp -r ./.next/standalone ./dist
// cp -r ./.next/static ./dist/.next/static
// rm -rf ./.next
// rm -rf ./dist/node_modules
// cp -r ./dist/. ./
// echo '#!/usr/bin/env node\n'"$(cat server.js)" > server.js

shell.rm('-f', 'server.js')
shell.rm('-rf', './dist')
shell.cp('-r', './.next/standalone', './dist')
shell.cp('-r', './.next/static', './dist/.next/static')
shell.rm('-rf', './.next')
shell.rm('-rf', './dist/node_modules')
shell.cp('-r', './dist/.', './')
shell.echo(`#!/usr/bin/env node\n${shell.cat('server.js')}`).to('server.js')
