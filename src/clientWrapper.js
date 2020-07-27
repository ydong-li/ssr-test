import React, { useState, useEffect } from "react";

// 客户端初始渲染高阶组件
export default function ComponentWrapper(Component) {
  // 服务端直接返回组件
  return typeof window === "undefined"
    ? Component
    : (p) => <ClientRender {...p} Component={Component} />;
}

/*function ClientRender({ Component }) {
  const [props, setProps] = useState({});

  useEffect(() => {
    if (window.__INITIAL_PROPS__) {
      setProps(window.__INITIAL_PROPS__);
      window.__INITIAL_PROPS__ = null;
    } else {
      (async () => {
        setProps(await Component.getInitialProps());
      })();
    }
  }, []);

  return (p) => {
    const initialProps = { ...p, ...props };
    return <Component {...initialProps} />;
  };
}*/

class ClientRender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      props: {},
    };
  }

  async componentDidMount() {
    if (window.__INITIAL_PROPS__) {
      this.setState({ props: window.__INITIAL_PROPS__ });
      window.__INITIAL_PROPS__ = null;
    } else {
      let props = await this.props.Component.getInitialProps();
      this.setState({ props });
    }
  }
  render() {
    const { Component, ...resProps } = this.props;
    return <Component {...{ ...resProps, ...this.state.props }} />;
  }
}
