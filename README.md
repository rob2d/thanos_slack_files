# thanos-slack-files #
![Image of Infinite Cleaning Gauntlet](./infinite-cleaning-gauntlet)
simple app to easily remove the largest files and free up storage for your free-tier slack team/workspace.

## Getting Started ##
To use this app, you will need the following:

- [NodeJS 10.x/NPM 6.x](http://www.nodejs.org)
- a Slack App with `admin` scope/privileges set along with it's OAuth token.

Once you have these, be sure to:
1) Open your terminal
2) `cd` to the directory where you intend to install and type
```
npm install -g thanos-slack-files
```

3.Create a file named `.env` in your cloned repo's directory, and add the following contents (without including the `[]` characters or anything in between!):

```
SLACK_CHANNEL=[your-slack-channel-string]
SLACK_TOKEN=[your-app-oauth-token]
```

## Usage ##

Be sure to configure the relevant parameters in a `.env` file, go to your cloned repo directory, and then simply run:

```
thanos
```

You will then get a notice in your slack channel telling you that your app is Thanos'ing, along with what file is being deleted every 10 seconds. 

Note that it is handled this way as Slack's API does not allow multiple deletions with one request while also rate-limiting to prevent thrashing of their servers.

## Contributing ##

PR requests welcome. Please be reasonable with issue reports, and use stack exchange if it is simple for a technical question vs an actual issue. This repo has been created and tested exclusively on Windows 10 so far, so I'm hoping to get some feedback from people on other OS/distros.

## Note ##

This is open source/done on my free time. As such, there are likely to be things that can be improved that I may not necessarily get to. Your support is greatly appreciated throughout this process.

Thanks!