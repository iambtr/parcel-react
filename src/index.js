// 应用入口
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.less'
import Router from './routes/index.js'

ReactDOM.render(<Router />, document.getElementById('container'))
