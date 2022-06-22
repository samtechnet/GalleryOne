#! /usr/bin/bash
echo "Script on git beggings here"
git status
echo "Next line on script"
git add .
echo "I'm adding all file here"
git commit -m "cors"
echo "last line of script"
git branch -m heroku-deploy
git push -u origin second-deployment
echo "                         Done"