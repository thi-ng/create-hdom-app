#!/usr/bin/env node

const chalk = require("chalk");
const execSync = require("child_process").execSync;

const buildProfile = (id, opts) => {
    console.log(chalk.yellow(`building profile: ${id} ${opts ? `with opts: ${opts}` : ""}`));
    console.log(execSync(`./index.js ${opts} ${id}`).toString());
    console.log(execSync(`(cd ${id} && yarn install && yarn build)`).toString());
    console.log(execSync(`ls -la ${id}/public/bundle.js`).toString());
}

const profiles = {
    "test-default": "",
    "test-nr": "--no-router",
    "test-ne": "--no-events",
    "test-nre": "--no-events --no-router",
};

for (let id in profiles) {
    const p = profiles[id];
    buildProfile(id, p);
    buildProfile(`${id}-min`, `${p} --minimal`);
}

console.log("done");