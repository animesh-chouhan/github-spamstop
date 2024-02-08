# github-spamstop

Prevent PR and Issue spam on GitHub based on customizable rules

## Motivation

[Don't Contribute to Open Source](https://www.youtube.com/watch?v=5nY_cy8zcO4)
[Open source README drama](https://www.youtube.com/watch?v=7Thqw58L8gw)
[This Tweet](https://twitter.com/t3dotgg/status/1754954663710126305)

## Usage

Follow this [GitHub guide](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action) to create your own custom actions.

Edit `index.js` in the root folder and then follow this [guide](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action#commit-tag-and-push-your-action-to-github) to compile your code.

Add a workflow to your GitHub repository that contains this information:

```yml
name: Stop spam
on:
  # Triggers the workflow on pull request open event but only for the "main" branch
  pull_request:
    types: [opened]
    branches: ["main"]
permissions:
  issues: write
  pull-requests: write
jobs:
  github_spamstop_job:
    runs-on: ubuntu-latest
    name: A job to detect spam PR
    steps:
      - name: Detect Spam PR
        # Add your repo and version here
        uses: animesh-chouhan/github-spamstop@main
        with:
          myToken: ${{ secrets.GITHUB_TOKEN }}
```

Check out [GitHub's documentation](https://help.github.com/en/articles/configuring-a-workflow) to read more about adding GitHub Action workflows to your GitHub repositories.

## References

<https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action>
<https://docs.github.com/en/actions>
<https://www.npmjs.com/package/@actions/github>
<https://docs.github.com/en/actions/using-workflows>
<https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request>
<https://github.com/github/docs/blob/main/.github/workflows/check-for-spammy-issues.yml>
<https://github.com/actions/javascript-action>
<https://github.com/actions/toolkit/tree/main/packages/github>
