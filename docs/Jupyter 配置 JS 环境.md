```bash
# Python3

# 国内镜像
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple

# 安装 jupyter 相关包
pip install jupyter notebook jupyterlab jupyterthemes

# 安装 jupyter js/ts kernel
pnpm i -g ijavascript tslab

# js/ts kernel 配置
ijsinstall
tslab install

# 启动：推荐使用 jupyterlab
jupyter lab
```

## 相关链接

- https://jupyter.org/
- https://github.com/dunovank/jupyter-themes
- https://n-riesco.github.io/ijavascript/
- https://jupyter-ijavascript-utils.onrender.com/
- https://github.com/yunabe/tslab
