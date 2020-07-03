import React from "react";

// 客户端初始渲染高阶组件
export default function ClientRender(Component) {
  if (typeof window === "undefined") {
    return Component;
  }

  let props = {}
  // 在前端开发模式下, 此段代码不会执行
  if (window.__INITIAL_STATE__) {
    const thisProps = window.__INITIAL_STATE__[Component.displayName];
    console.log(thisProps)
    if (thisProps && Array.isArray(thisProps) && thisProps.length) {
      props = thisProps.shift();
    } else {
      console.log("浏览器端发起请求");
      // props = await Component.getInitialProps();
    }
  }
  
  // 在客户端 getInitialProps 定义了异步方法会报错
  // Error: Objects are not valid as a React child (found: [object Promise])
  Component.getInitialProps = null;
  return (p) => {
    const initialProps = { ...p, ...props };
    return <Component {...initialProps} />;
  };
}
