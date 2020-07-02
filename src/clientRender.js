import React from "react";

// 客户端初始渲染高阶组件
export default function ClientRender(Component) {
  if (typeof window === "undefined") {
    return Component;
  }
  const props = window.__INITIAL_STATE__ || {};
  window.__INITIAL_STATE__ = null;
  // 在客户端 getInitialProps 定义了异步方法会报错
  // Error: Objects are not valid as a React child (found: [object Promise])
  Component.getInitialProps = null;
  return p => {
    const initialProps = {...p, ...props}
    return <Component {...initialProps} />
  };
}
