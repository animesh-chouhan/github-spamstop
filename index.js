// https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action
const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        console.log("Detecting spam");
        // Get the JSON webhook payload for the event that triggered the workflow
        const payload = JSON.stringify(github.context.payload, undefined, 2)
        console.log(`The event payload: ${payload}`);
      } catch (error) {
        core.setFailed(error.message);
      }
}

run();