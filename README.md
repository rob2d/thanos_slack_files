![Image of Infinite Cleaning Gauntlet](./infinite-cleaning-gauntlet.png)

# thanos-slack-files #

simple app to easily remove the largest files and free up storage for your free-tier slack team/workspace.

# Requirements #

To use this app, you will need the following:

- [NodeJS 10.x/NPM 6.x](http://www.nodejs.org)
- a [Slack App](https://api.slack.com/apps) with [`admin` scope/privileges](https://api.slack.com/scopes/admin) set along with it's OAuth token.

# Usage #

There are two ways to use this app, depending on your security needs and other factors: 

- [Locally as a Node.js executable](#as-a-local-app) or
- [As a Slack Slash Command server](#as-a-slack-slash-command)

## As a Local App ##

Once requirements have been installed:
1) Open your terminal
2) `cd` to the directory where you intend to install and type
```
npm install -g thanos-slack-files
```

Be sure to configure the relevant parameters in a `.env` file, go to your cloned repo directory, and then simply run:

```
thanos
```

You will then get a notice in your slack channel telling you that your app is Thanos'ing, along with what file is being deleted.

## As a Slack Slash Command

Once requirements have been installed:
1) On the machine/server you'd like to host on, open your terminal
2) `cd` to the directory where you intend to install and enter the following
```
git init . && git remote add origin https://github.com/rob2d/thanos_slack_files.git && git pull origin master && npm i && npm i -g pm2
```
3) launch the server by running 
```
npm run start
```

You should now be running a cluster of the server via [PM2](http://pm2.keymetrics.io/). 

4. Now in your slack panel, add a Slack Command under you app to `<yourserverurl:3002>/api/thanos` which should be listening for a 

## Configuration ## 

Create a file named `.env` in your cloned repo's directory (or install directory for executable), and add the following contents (without including the `[]` characters or anything in between!):

```
SLACK_CHANNEL=[your-slack-channel-string]
SLACK_TOKEN=[your-app-oauth-token]
SLACK_USERS=[{optional}if specified, comma separated strings for allowed usernames that can run /thanos]
DELETION_INTERVAL=[{optional}seconds-btwn-deleting-files]
PORT=[{optional}port_number_on_server(default 3002)]
```

## Contributing ##

PR requests welcome. Please be reasonable with issue reports, and use stack exchange if it is simple for a technical question vs an actual issue. This repo has been created and tested exclusively on Windows 10 so far, so I'm hoping to get some feedback from people on other OS/distros.

## Note ##

This is open source/done on my free time. As such, there are likely to be things that can be improved that I may not necessarily get to. Your support is greatly appreciated throughout this process.

Thanks!