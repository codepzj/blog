#!/bin/bash

# If a command fails then the deploy stops
set -e

printf "\033[0;32mDeploying updates to GitHub...\033[0m\n"

cd public
# 原始字体名称
origin='QianMoKai.ttf'

# 压缩后的字体名称，注意需要和 font-face中定义的字体名一致
optimized='QianMoKai.woff2'

# 输出 ripgrep 版本，确认是否安装成功
echo "检查 ripgrep 版本:"
rg --version

echo "开始根据使用情况缩减字符..."
subset_characters=$(rg -e '[\w\d]' -oN --no-filename | sort | uniq | tr -d '\n')
echo "将要缩减的字符为：$subset_characters"
pyftsubset "fonts/$origin" --text=$subset_characters --no-hinting

echo "缩减完成，开始转换到woff2格式"
fonttools ttLib.woff2 compress -o "fonts/$optimized" "fonts/${origin/\./\.subset\.}"

echo "删除中间文件..."
rm "fonts/${origin/\./\.subset\.}"

echo "压缩完成，继续部署..."