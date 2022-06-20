#! /usr/bin/bash
echo "Script on git beggings here"
git status
echo "Next line on script"
git add .
echo "I'm adding all file here"
git commit -m "Done: first deployment"
echo "last line of script"
git branch -m Dev
git push -u origin Dev
echo "                         Done"