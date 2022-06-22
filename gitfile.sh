#! /usr/bin/bash
echo "Script on git beggings here"
git status
echo "Next line on script"
git add .
echo "I'm adding all file here"
git commit -m "cors config"
echo "last line of script"
git branch -m heroku-deploy
git push -u origin heroku-deploy
echo "                         Done"