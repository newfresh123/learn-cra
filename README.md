## 手写CRA

主要目标：

* 掌握如何通过使用node.js中的核心模块，如：cross-spawn、fs-extra、commander创建项目
* react-scripts里面的五个命令 init build start eject等等
* cra-template里面的webpack配置学习

### create-react-app

实现这部分的整体思路：通过使用commander获取命令行中的数据，然后通过node.js中的path以及fs-extra包库，来实现获取目录的绝对路径以及创建正确的目录路径，接着通过cross-spawn来实现安装所需要的包库：react、react-dom、react-scripts，最后通过回调执行node脚本，`'react-scripts/scripts/init.js'`完成项目创建运行

### react-scripts
