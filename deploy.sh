#!/usr/bin/env sh

# 发生错误时终止
set -e

rm -rf dist
# 构建
npm run build

pwd

ls dist -al

rm -rf '/www/wwwroot/f.xm-team.com.bak'
mv -f '/www/wwwroot/f.xm-team.com' '/www/wwwroot/f.xm-team.com.bak'
mv dist '/www/wwwroot/f.xm-team.com'