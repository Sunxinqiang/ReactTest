import React from 'react'

export default function (WrappedComponent, notLog = false) {

  var log = function () {
    let timeoutId = null
    let index = 0
    return function (msg, ...rest) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        index = 0
      }, 2000)
      if (!notLog) {
        console.log(`%c${++index}. %c生命周期：%c${msg}`,
          'color: blue;font-size: 20px;',
          'color:green;font-size:20px;',
          'font-size: 20px',
          rest)
      }
    }
  }();

  class LogLifeCycle extends React.Component {

    // mount
    constructor (props) {
      super(props)
      this.state = {
        error: false
      }
      log('constructor')
    }
    static getDerivedStateFromProps(...args) {
      log('getDerivedStateFromProps',...args)
      return null
    }
    render () {
      log('render')
      return (<WrappedComponent {...this.props}></WrappedComponent>)
    }
    componentDidMount () {
      log('componentDidMount')
    }


    // update
    shouldComponentUpdate (...args) {
      log('shouldComponentUpdate', ...args)
      return true
    }
    getSnapshotBeforeUpdate () {
      log('getSnapshotBeforeUpdate')
      return 'componentDidUpdate\'s third params'
    }
    componentDidUpdate (...args) {
      log('componentDidUpdate', ...args)
    }

    // Unmounting
    componentWillUnmount () {
      log('componentWillUnmount')
    }

    // error 放到ErrorBoundary里处理了 这里写的话 会拦截掉错误
    // static getDerivedStateFromError () {
    //   log('getDerivedStateFromError')
    // }
    // componentDidCatch () {
    //   log('componentDidCatch')
    // }

    // 过时的
    // UNSAFE_componentWillReceiveProps () {
    //   log('UNSAFE_componentWillReceiveProps')
    // }
    // UNSAFE_componentWillUpdate () {
    //   log('UNSAFE_componentWillUpdate')
    // }
    // UNSAFE_componentWillMount () {
    //   log('UNSAFE_componentWillMount')
    // }
  }
  LogLifeCycle.displayName = 'LogLifeCycle'
  return LogLifeCycle
}