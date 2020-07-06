SSR 测试子项目

### 克隆项目后, 启动SSR服务器看效果

    先打包好所有文件,并监听代码文件的变动
    yarn && yarn b
    接着运行服务端代码
    yarn ss

    
打开  http://localhost:3777/x-web/c 即可查看效果

### 如果客户端代码有更改, 客户端和服务端的代码都需重新打包, 重启这个命令:

    yarn b

## Available Scripts

In the project directory, you can run:

### `yarn build`

打包客户端的文件, 服务端渲染时会从中查找`js`和`css`链接

### `yarn build:s`

打包服务端的`js`

### `yarn ss`

调试服务端代码, create-react-app 自带

### `yarn s`

调试前端代码, create-react-app 自带

### 配合`ssr-layout`项目进行服务端渲染以及路由传递

1. 打包并运行此项目(`yarn b`和`yarn ss`)
2. 此时会生成一个文件`cssAndJs.html`, 将其内容复制到`ssr-layout`中`public/index.html`的相应位置
3. `ssr-layout`打包并运行`yarn b`
4. 浏览器打开 http://localhost:3888/x-web/c 或者 http://localhost:3888/p
