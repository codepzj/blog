"""
使用前安装依赖
pip install fonttools ripgrep brotli
指定字体文件夹 BASEDIR
origin = 'xxx.ttf'  # 原始字体名称
optimized = 'xxx.woff2'  # 优化后的字体名称
将会扫描当前目录下所有文件的字体，ttf对字体取子集，转成woff2
当前案例为本地hexo，也可用于Linux和CI/CD环境使用，打包前端文件优化
"""
import subprocess
import os
from fontTools.ttLib import TTFont
from fontTools.subset import Subsetter, Options

# 设置全局变量 basedir
BASEDIR = 'source/fonts'

# 检查 ripgrep 是否安装
def check_ripgrep():
    try:
        result = subprocess.run(['rg', '--version'], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        print(f"检查 ripgrep 版本: {result.stdout.decode().strip()}")
    except subprocess.CalledProcessError:
        print("错误：ripgrep 未安装，无法继续。")
        exit(1)

# 获取需要缩减的字符
def get_subset_characters():
    print("开始根据使用情况缩减字符...")
    result = subprocess.run(['rg', '-e', r'[\w\d]', '-oN', '--no-filename'], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    # 获取所有匹配的字符，去掉换行符后转换为集合去重
    subset_characters = result.stdout.decode().strip().replace('\n', '')
    # 使用 set 去重
    unique_characters = ''.join(sorted(set(subset_characters)))
    print(f"将要缩减的字符为：{unique_characters}")
    return unique_characters

# 使用 fontTools 的 Subsetter 缩减字体
def subset_font(origin, subset_characters):
    print("正在缩减字体...")

    font_path = os.path.join(BASEDIR, origin)
    output_path = os.path.join(BASEDIR, origin.replace('.', '.subset.'))

    # 加载字体文件
    font = TTFont(font_path)

    # 创建 Subsetter 对象并设置需要保留的字符集
    options = Options()
    subsetter = Subsetter(options)
    subsetter.populate(text=subset_characters)

    # 执行子集化操作
    subsetter.subset(font)

    # 保存缩减后的字体
    font.save(output_path)
    print(f"字体缩减完成，保存为 {output_path}")

# 转换为 woff2 格式
def convert_to_woff2(origin, optimized):
    print("开始转换为 woff2 格式...")
    try:
        subprocess.run(['fonttools', 'ttLib.woff2', 'compress', '-o', os.path.join(BASEDIR, optimized), 
                        os.path.join(BASEDIR, origin.replace('.', '.subset.'))], check=True)
        print("字体转换为 woff2 格式完成。")
    except subprocess.CalledProcessError:
        print("错误：字体转换失败。")
        exit(1)

# 删除中间文件
def remove_intermediate_file(origin):
    print("删除中间文件...")
    # 中间文件路径
    intermediate_file = os.path.join(BASEDIR, origin.replace('.', '.subset.'))
    if os.path.exists(intermediate_file):
        os.remove(intermediate_file)
        print(f"已删除中间文件：{intermediate_file}")
    else:
        print(f"未找到中间文件：{intermediate_file}")

# 主函数
def main():
    print("\033[0;32mDeploying updates to GitHub...\033[0m")
    
    origin = 'QianMoKai.ttf'  # 原始字体名称
    optimized = 'QianMoKai.woff2'  # 优化后的字体名称

    # 执行步骤
    check_ripgrep()
    subset_characters = get_subset_characters()
    subset_font(origin, subset_characters)
    convert_to_woff2(origin, optimized)
    
    # 删除子集化后生成的中间文件
    remove_intermediate_file(origin)

    print("字体文件处理和压缩完成，开始部署...")

if __name__ == "__main__":
    main()
