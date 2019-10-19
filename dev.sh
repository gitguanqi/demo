#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 部署到github
git add -A
git commit -m 'deploy'
git push origin master