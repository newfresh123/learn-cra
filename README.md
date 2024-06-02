## 手写CRA

主要目标：

* 掌握如何通过使用node.js中的核心模块，如：cross-spawn、fs-extra、commander创建项目
* react-scripts里面的五个命令 init build start eject等等
* cra-template里面的webpack配置学习

### create-react-app

实现这部分的整体思路：通过使用commander获取命令行中的数据，然后通过node.js中的path以及fs-extra包库，来实现获取目录的绝对路径以及创建正确的目录路径，接着通过cross-spawn来实现安装所需要的包库：react、react-dom、react-scripts，最后通过回调执行node脚本，`'react-scripts/scripts/init.js'`完成项目创建运行

### react-scripts

前面我们知道了，最后是通过react-scripts中的init.js脚本来完成项目创建运行的，现在我们逐步实现，build、eject等等内置脚本命令。

#### build

思路：同样的，我们先获取命令行中的代码，结合cross-spawn开启子进程,然后执行scripts中的build脚本。

**build**简单讲就是通过**fs.copySync**拷贝public到文件目录，然后结合**webpack**配置，使用babel来进行打包。
