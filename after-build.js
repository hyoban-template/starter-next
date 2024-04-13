import shell from "shelljs";

shell.rm("-f", "server.js");
shell.cp("-r", "./.next/standalone", "./dist");
shell.cp("-r", "./.next/static", "./dist/.next/static");
shell.rm("-rf", "./.next");
shell.rm("-rf", "./dist/node_modules");
shell.cp("-r", "./dist/.", "./");
shell.echo(`#!/usr/bin/env node\n${shell.cat("server.js")}`).to("server.js");
shell.rm("-rf", "./dist");
