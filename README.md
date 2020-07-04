SSR 测试子项目

### 克隆项目后, 启动SSR服务器看效果

    先打包好所有文件,并监听代码文件的变动
    yarn && yarn b
    接着运行服务端代码
    yarn ss

    
打开  http://localhost:3777/c 即可查看效果

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
