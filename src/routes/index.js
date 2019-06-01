// 路由入口
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// 页面
import Register from './register';
import ResultTip from './resultTip';


const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route path='/' exact component={Register}></Route>
            <Route path='/result' exact component={ResultTip}></Route>
        </Switch>
    </HashRouter>
)
export default BasicRoute