import React from 'react';
import style from './index.less';
console.log(style)
export default class Register extends React.Component {
    render() {
        return (
            <div className={style.rootStyle}>
                <h1 className={style.title}>恭喜你</h1>
                <p>绑定成功,请关闭当前页面，点击公众号消息进入小程序，或者直接搜索‘鲜丰水果加盟商小程序’登录使用</p>
            </div>
        )
    }
}
