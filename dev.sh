#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 部署到github
git add .
git commit -m 'dev'
git push origin master
git push origin master
git push coding master
git push coding master