# github-spamstop

Prevent PR and Issue spam on GitHub based on customizable rules
sdfgsd
## Usage

Add a workflow to your GitHub repository that contains this information:

```yml
name: Stop spam

on:
  # Triggers the workflow on pull request open event but only for the "main" branch
  pull_request:
    types: [opened]
    branches: ["main"]
jobs:
  github_spamstop_job:
    runs-on: ubuntu-latest
    name: A job to detect spam PR
    steps:
      - name: Detect Spam PR
        uses: animesh-chouhan/github-spamstop@main
```

Check out [GitHub's documentation](https://help.github.com/en/articles/configuring-a-workflow) to read more about adding GitHub Action workflows to your GitHub repositories.
