import React from 'react';
import qs from 'qs';
import registerStyle from './index.less'
import Axios from 'axios';
export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                frMobile: '',
                captcha: '',
                openid: ''
            },
            smsLoading: false,
            countTime: 60,
        }
    }
    fieldChange = (type, event) => {
        let { value } = event.target
        let form = Object.assign({}, this.state.form)
        switch (type) {
            case 'frMobile':
                form.frMobile = value
                this.setState({
                    form
                })
                break;
            case 'captcha':
                form.captcha = value
                this.setState({
                    form
                })
                break;

        }
    }
    getSms = (e) => {
        let { form } = this.state
        if (!form.frMobile) {
            alert('请输入手机号')
            return
        }
        let that = this
        this.setState({
            smsLoading: true
        })
        Axios.get('http://47.98.144.11:8380/newFranchisee-server/app/sms/getCaptcha', {
            params: {
                mobile: form.frMobile
            }
        })
            .then(function (response) {
                let data = response.data
                if (data.code == 0) {
                    that.loadingTimer()
                    alert('获取验证码成功')
                } else {
                    that.setState({
                        smsLoading: false
                    })
                    alert(data.msg)
                }

            })
            .catch(function (error) {
                that.setState({
                    smsLoading: false
                })
                alert(error)
            });
    }
    bindPhone = (e) => {
        let { form } = this.state
        if (!form.frMobile) {
            alert('请输入手机号')
            return
        }
        if (!form.captcha) {
            alert('请输入验证码')
            return
        }

        if (!form.openid) {
            alert('当前页面数据异常，请关闭当前页面，从公众号进入重新绑定')
            return
        }
        let that = this

        Axios.post('http://47.98.144.11:8380/newFranchisee-server/xfsg/franchisee/wechatBind', form)
            .then(function (response) {
                let data = response.data
                if (data.code == 0) {
                    that.$history.push('result')
                } else {
                    alert(data.msg)
                }
            })
            .catch(function (error) {
                console.log(error);
                alert(error)
            });
    }
    loadingTimer = () => {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            let { countTime } = this.state
            countTime = countTime - 1;
            this.setState({
                countTime,
                smsLoading: true
            })
            if (countTime == 1) {
                countTime = 60;
                clearInterval(this.timer);
                this.setState({
                    countTime,
                    smsLoading: false
                })
            }
        }, 1000);
    }
    componentDidMount() {
        let { location, history } = this.props
        this.$history = history
        let query = qs.parse(location.search.slice(1))
        let form = Object.assign({}, this.state.form)
        form.openid = query.openid
        this.setState({
            form
        })
    }
    componentWillUnmount() {
        clearInterval(this.timer)
    }
    render() {
        let { frMobile, captcha } = this.state.form
        let { smsLoading, countTime } = this.state

        return (
            <div className={registerStyle['login-wrap']}>
                <div className={registerStyle.logo}>
                    <img src="https://xffranchisee.oss-cn-hangzhou.aliyuncs.com/wxapp/login_logo.png" alt='鲜丰水果' />
                </div>
                <div className={registerStyle['form-body']}>
                    <div className={registerStyle['form-item']} style={{ marginBottom: '3.33rem' }}>
                        <input
                            type="number"
                            name="frMobile"
                            maxLength="11"
                            value={frMobile}
                            placeholder="手机号"
                            onChange={(e) => this.fieldChange('frMobile', e)}
                        />
                    </div>
                    <div className={registerStyle['form-item']} style={{ marginBottom: '6.67rem' }}>
                        <input
                            type="number"
                            name="captcha"
                            value={captcha}
                            placeholder="验证码"
                            onChange={(e) => this.fieldChange('captcha', e)}
                        />
                        {smsLoading ? (<span>{countTime}s</span>) : (<span onClick={this.getSms}>获取验证</span>)}

                    </div>
                    <button className={registerStyle.login} onClick={this.bindPhone}>绑 定</button>
                </div>
            </div>
        )
    }
}