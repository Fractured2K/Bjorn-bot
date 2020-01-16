# **Bjorn Bot** 🤖

[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.png?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.png?v=103)](https://opensource.org/licenses/mit-license.php) [![star this repo](https://githubbadges.com/star.svg?user=fractured2k&repo=bjorn-bot&style=default)](https://github.com/fractured2k/bjorn-bot)
[![fork this repo](https://githubbadges.com/fork.svg?user=fractured2k&repo=bjorn-bot&style=default)](https://github.com/fractured2k/bjorn-bot/fork)

# Getting started 👋

Work in progress

#### Quick Links

- [Commands](#commands-%EF%B8%8F)
- [Configuring a Development Environment](#dev-)
- [Deploying Bjorn](#deploying-bjorn-)

# Commands 🖥️

General commands

- 📖 **help** - Returns a succinct list of possible commands
- 🎱 **8ball** - Ask the magic 8-ball a question and get a response
- 🐸 **meme** - Returns a meme scraped off the internet (WIP)
- 🏓 **ping** - Returns pong

Music commands

- ▶️ **play** - Plays music from a number of supported URLs or text! (`!play https://www.youtube.com/watch?v=wuJIqmha2Hk`) or (`!play mr blue sky`)
- ⏸️ **pause** - Pauses/Resumes current song
- ⏭️ **skip** - Skips current song
- 🛑 **stop** - Stops song currently playing and clears queue
- **more to come soon 😄**

# Dev 💻

_Want to develop new features Here's how to get set up to do so!_

Work in progress

# Deploying Bjorn 🚀

_Want to host Bjorn yourself? Here's a quick walk through on deployingn with heroku._

1.  [First make sure fork the repo.](https://github.com/fractured2k/bjorn-bot/fork)

2.  [Create a new app on heroku](https://dashboard.heroku.com/apps)

    ![Create new app on heroku image](https://i.gyazo.com/2332daadc36184b14139c5df465e4f9b.png)

3.  Enter in an app name, select your region and click `create app`

    ![Enter app name/region image](https://i.gyazo.com/c0a8f1655fbcb716af18e267625154b3.png)

4.  Next head over to the deploy tab and connect the forked repo to your heroku app. (If you want, enable automatic deploys.)

    After doing so, scroll down click `Deploy Branch` to deploy the bot.

    ![Repo connection image](https://i.gyazo.com/4d449d0a16e94e15eae6bc9c76e41218.png)

5.  Now we need to set up our environment variables.

    To do so head over to the `settings` tab.

    If you look down a tad you should see a section `Config Vars` section, click `Reveal Config Vars` and fill the required env vars. There should be 3.

    ```
    DISCORD_CLIENT_SECRET
    BOT_STATUS
    COMMAND_PREFIX
    ```

    If you don't have a client secret you'll need to head over to the [Discord Developer Portal](https://discordapp.com/developers/applications/) and create a `New Application`. After doing so you'll be able to create a bot and get access to your bots client secret. For a walk through visit the first steps of the [dev env set up](#dev-💻).

    ![Setting up env vars image](https://i.gyazo.com/afee745881454eeb0f6c5ef660028d05.png)

6.  Last but not least head over to `Resources` tab and enable the worker dyno (don't forget disable the web dyno)

    ![Select worker dyno image](https://i.gyazo.com/20ca5933277cb616f9aff5543a8e8ad5.png)

    **DONE** 🥳
