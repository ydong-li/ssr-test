SSR 测试子项目

### 克隆项目后, 启动SSR服务器看效果

    yarn && yarn build && yarn build:s

    
打开  http://localhost:3777/c

### 如果客户端代码有更改, 客户端和服务端的代码都需重新打包:

    yarn build && yarn build:s

## Available Scripts

In the project directory, you can run:

### `yarn build`

打包客户端的文件, 服务端渲染时会从中查找`js`和`css`链接

### `yarn build:s`

打包服务端的`js`, 并运行`node server`

### `yarn start`

调试前端代码, create-react-app 自带

### `yarn srs`

启动SSR服务器, http://localhost:3777/b
