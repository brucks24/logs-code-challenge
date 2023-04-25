## LogicGate Logging Exercise

### Instructions to run

Make sure you have git and nodejs installed
follow the installation instructions here https://git-scm.com/
and here https://nodejs.org/en

Run the commands `node -v` and `git --version`

Navigate into the directory you put the project. Your working directory should be `/PATH/logs-code-solution`
Run the command `node main.js`

After running please view the new files in your directory `userAgents.json` which shows the most popular user agents
`badRequests.json` which shows all the log records that were flagged as malicious
`ipaddresses.json` which shows which ipaddresses were sending the most malicous requests

After viewing those files please look at the file `Analysis.txt` for my brief overview of what patterns I noticed

### Overview

This repository represents a single day's live traffic to our demo environments. These are publicly facing servers that receive all sorts of traffic both legitimate and malicious. Your task is to efficiently parse these logs and answer the following questions:

### Objectives

1\. What is the most popular browser? Internet Explorer? Firefox? Chrome?

Parsing through the attached log file, generate a report that ranks the top browsers and their versions in descending order. This report can be the stdout of your script, or you can write to a file.

2\. What malicious traffic are we seeing?

In your analysis, note the differences you see between legitimate and not-so-legitimate traffic. Is there a theme? Any commonalities or abnormalities? (Note: Our app is a Spring Boot Java application hosted on AWS. We aren't running any other applications in the region.)

For this portion your script should correctly identify the malicious lines in the attached log, and print them to stdout (or a file, if you wish).

### Implementation

Your solution should be in the form of a script written in a language of your choosing. The script should be clear, concise, and written in such a way as to be easily modifiable and testable. We must be able to run your script, so include instructions on how to run it, and describe any external dependencies it needs.

### Packaging

Your solution should be emailed to the person that sent it to you along with any instructions on how to run your solution.

### Sources

user-agents

https://github.com/N0taN3rd/userAgentLists
