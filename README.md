SSR 测试子项目

### 客户端有更改:

    yarn build && yarn build:s

### 只是重启`node server`:

    yarn srs

## Available Scripts

In the project directory, you can run:

### `yarn build`

打包客户端的文件, 服务端渲染时会从中查找`js`和`css`链接

### `yarn build:s`

打包服务端的`js`, 并运行`node server`

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.


See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
