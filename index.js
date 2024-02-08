// https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action
const core = require('@actions/core')
const github = require('@actions/github')

const myToken = core.getInput('myToken')
const octokit = github.getOctokit(myToken)
console.log(myToken)
console.log(octokit)

async function createComment(owner, repo, pullNumber, message) {
    try {
        octokit.issues.createComment({
            owner: owner,
            repo: repo,
            issue_number: pullNumber,
            body: message
        })
    } catch (err) {
        return console.log(err)
    }
}

async function closeIssue(owner, repo, pullNumber) {
    try {
        octokit.pulls.update({
            owner: owner,
            repo: repo,
            pull_number: pullNumber,
            state: 'closed'
        })
    } catch (err) {
        return console.log(err)
    }
}

async function run() {
    try {
        console.log("Detecting spam")
        // Get the JSON webhook payload for the event that triggered the workflow
        // const payload = JSON.stringify(github.context.payload, undefined, 2)
        // console.log(`The event payload: ${payload}`);
        const repository = github.context.payload.repository
        const owner = repository.owner.login
        const repo = repository.name
        const pullRequest = github.context.payload.pull_request
        const prNumber = pullRequest.number
        let prTitle = pullRequest.title
        let prBody = pullRequest.body

        let spamFlag = false

        // Rules on PR title
        if (prTitle == "Update README.md") {
            spamFlag = true
        }

        // Rules on PR body
        if (prBody.includes("REPLACE_ME")) {
            spamFlag = true
        }

        if (spamFlag) {
            await createComment(owner, repo, prNumber, "Marked as spam. Closing pull request.")
            await closeIssue(owner, repo, prNumber)
            console.log("Spam found. Closing PR.")
        }

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();