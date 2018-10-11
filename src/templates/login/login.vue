<style scoped>
    .logo {
        position: absolute;
        left: 286px;
        top: 130px;
        width: 200px;
        height: 162px;
        background-image: url(./images/icon_logo.png);
        background-repeat: no-repeat;
        background-size: auto 100%;
        background-position: center center;
    }

    .title {
        width: 319px;
        height: 110px;
        background-image: url(./images/icon_font.png);
        background-repeat: no-repeat;
        -webkit-background-size: 100% auto;
        background-size: cover;
        background-position: center center;
        margin: 420px auto 0 auto;
    }

    .phoneInput {
        width: 568px;
        border-bottom: 1px solid #cccccc;
        margin: 92px auto 0 auto;
        display: flex;
        flex-direction: row;
        justify-content: left;
    }

    .phonePre {
        width: 193px;
        height: 62px;
        background-image: url(./images/icon_phone.png);
        background-repeat: no-repeat;
        -webkit-background-size: 31px 50px;
        background-size: 31px 50px;
        background-position: 33px center;
        position: relative;
    }

    .phonePre-value {
        height: 62px;
        line-height: 62px;
        text-indent: 87px;
    }

    .phoneText {
        margin-top: 12px;
        width: 374px;
        height: 34px;
        border-left: 1px solid #cccccc;
        vertical-align: middle;
    }

    .phoneText input {
        padding: 0;
        margin: 0;
        border: 0;
        outline: 0;
        width: 100%;
        height: 100%;
        text-indent: 15px;
    }

    .pwdInput {
        display: flex;
        justify-content: left;
        flex-direction: row;
        align-items: center;
        background-image: url(./images/icon_pwd.png);
        background-repeat: no-repeat;
        background-position: 33px center;
        -webkit-background-size: 31px 41px;
        background-size: 31px 41px;
        width: 572px;
        height: 60px;
        margin: 30px auto;
        border-bottom: 1px solid #cccccc;
    }

    .pwdInput input {
        margin: 0 0 0 94px;
        padding: 0;
        border: 0;
        outline: 0;
        height: 40px;
    }

    .getCode {
        height: 34px;
        line-height: 34px;
        border-left: 1px solid #cccccc;
        color: #2a4c7e;
        text-indent: 15px;
    }

    .loginBtn {
        margin: 50px auto 0 auto;
        width: 330px;
        height: 70px;
        line-height: 70px;
        border: 1px solid #4a43b6;
        -webkit-border-radius: 70px;
        -moz-border-radius: 70px;
        border-radius: 70px;
        text-align: center;
        color: #4a43b6;
    }

    .tomain {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        color: #666;
        width: 280px;
        margin: 40px auto 0 auto;
    }

    .accessInput {
        margin-left: 94px;
        margin-top: 10px;
        height: 40px;
        line-height: 40px;
        outline: none;
        border: 0;
        padding: 0;
    }

    .showPwd {
        width: 40px;
        height: 28px;
        background-image: url(./images/icon_showPwd.png);
        background-repeat: no-repeat;
        -webkit-background-size: cover;
        background-size: cover;
        background-position: center center;
        margin-right: 22px;
    }

    .accessPwdInput {
        justify-content: space-between;
        margin-bottom: 10px;
    }

    .accessNo, .mobile {
        height: 200px;
        margin-top: 420px;
    }

    .accessNo input {
        width: 400px;
    }

    .isGet {
        color: #666666;
    }

    .forgetRegister {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 220px;
        color: #666666;
        margin-left: 440px;
    }

    .phonePre-options {
        background-color: #fff;
        position: absolute;
        left: 87px;
        top: 70px;
        z-index: 10;
    }

    .phonePre-options-item {
        line-height: 50px;
        border-bottom: 1px solid #ccc;
        white-space: nowrap;
    }
</style>

<template>
    <div>
        <div class="logo"></div>
        <!-- <div class="title"></div> -->
        <div class="mobile" v-show="mobile">
            <div class="phoneInput">
                <div class="phonePre">
                    <div class="phonePre-value font-t1" v-tap="{methods:toShowPre}">{{pre}}</div>
                    <div class="phonePre-options" v-show="showPre">
                        <div class="phonePre-options-item font-t1" v-tap="{methods:choicePre,item:item}"
                             v-for="(item,index) in preList" :key="index">{{item.name}}
                        </div>
                    </div>
                </div>
                <div class="phoneText">
                    <input type="text" class="font-t2" v-model="form.mobile" maxlength="11" placeholder="请输入手机号码">
                </div>
            </div>
            <div class="pwdInput">
                <input type="text" v-model="form.code" class="font-t2" maxlength="6" placeholder="请输入验证码">
                <div class="getCode font-t2" v-bind:class="{'isGet':isGet}" v-tap.stop.prevent="{methods:getCode}">
                    {{code}}
                </div>
            </div>
        </div>
        <div class="accessNo" v-show="!mobile">
            <div class="phoneInput">
                <div class="phonePre">
                    <input type="text" v-model="form.mobile" class="accessInput font-t2" maxlength="11"
                           placeholder="手机号">
                </div>
            </div>
            <div class="pwdInput accessPwdInput">
                <input :type="showPwd?'text':'password'" v-model="form.password" class="font-t2" maxlength="15"
                       placeholder="请输入密码">
                <div class="showPwd" v-tap.stop.prevent="{methods:showPassword}"></div>
            </div>
            <div class="forgetRegister">
                <div class="register font-t2" v-tap.stop.prevent="{methods:toOtherPage,pageName:'register'}">立即注册</div>
                <div class="font-t2">|</div>
                <div class="forgetPwd font-t2" v-tap.stop.prevent="{methods:toOtherPage,pageName:'forgetPassword'}">
                    忘记密码
                </div>
            </div>
        </div>
        <div class="loginBtn" v-tap.stop.prevent="{methods:toLogin}">登录</div>
        <div class="tomain">
            <div class="sy font-t2" v-tap.stop.prevent="{methods:toOtherPage,pageName:'home'}">随便逛逛</div>
            <div class="font-t4">|</div>
            <div class="access font-t2" v-tap.stop.prevent="{methods:changeLogin}">{{mobile?'账号登录':'手机号登录'}}</div>
        </div>
    </div>
</template>

<script>
    import URL from '@/libs/api';
    export default {
        name: "login",
        data() {
            return {
                mobile: false,
                showPwd: false,
                code: '获取手机验证码',
                minutes: 120,
                timer: null,
                isGet: false,
                form: {
                    mobile: '',
                    password: '',
                    code: ''
                },
                thirdUrl: {},
                showPre: false,
                preList: [{
                    name: '中国(+86)',
                    value: '+86',
                    before: '86'
                },
                    // {
                    //     name: '台湾(+886)',
                    //     value: '+886',
                    //     before:'886'
                    // }, {
                    //     name: '香港(+852)',
                    //     value: '+852',
                    //     before:'852'
                    // }
                ],
                pre: '+86',
                before: '86'
            }
        },
        mounted() {
            Toast('123');
        },
        methods: {
            getCode() {
                // 获取验证码
                if (this.isGet) {
                    // ajax

                } else {
                    let phoneReg = /1\d{10}/;
                    if (phoneReg.test(this.form.mobile)) {
                        this.isGet = true;
                        this.code = `重新获取(${this.minutes})`;
                        this.minutes--;
                        this.timer = setInterval(() => {
                            this.code = `重新获取(${this.minutes})`;
                            this.minutes--;
                            if (this.minutes === -1) {
                                clearInterval(this.timer);
                                this.minutes = 120;
                                this.code = '获取手机验证码';
                                this.isGet = false;
                            }
                        }, 1000);
                        this.toGetCode()
                    } else {
                        Toast('请输入正确的手机号和验证码');
                    }
                }
            },
            toShowPre() {
                this.showPre = !this.showPre;
            },
            choicePre(params) {
                this.pre = params.item.value;
                this.toShowPre();
            },
            showPassword() {
                // 显示密码
                this.showPwd = !this.showPwd;
            },
            changeLogin() {
                // 切换登录方式
                this.mobile = !this.mobile;
            },
            toOtherPage(params) {
                this.$router.push({
                    name: params.pageName
                })
            },
            toLogin() {
                let data = {};
                let requestUrl = '';
                if (!this.mobile) {
                    data.mobile = this.form.mobile;
                    data.password = this.form.password;
                    requestUrl = URL.login;
                } else {
                    data.mobile = this.form.mobile;
                    data.code, this.form.code;
                    requestUrl = URL.mlogin;
                }
                this.$http({
                    method: 'post',
                    url: requestUrl,
                    headers: {
                        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
                    },
                    data: data,
                    responseType: 'json',
                    timeout: 5000
                }).then((res) => {
                    let response = res.data;
                    if (response.ret == '0') {
                        Toast('登录成功');
                        if (response.data.ref != '' || response.data.ref != undefined) {
                            location.href = response.data.ref;
                        } else {
                            if (response.data.check_state == '1') {
                                this.$router.push({
                                    name: 'home'
                                })
                            } else {
                                this.$router.push({
                                    name: 'identify'
                                })
                            }
                        }
                    } else if (response.ret == '2000') {
                        this.$router.push({
                            name: 'login'
                        })
                    } else {
                        Toast(response.msg);
                    }
                }, (err) => {
                    console.log(err);
                });
            },
            toGetCode() {
                let param = new URLSearchParams();
                param.append('mobile', this.form.mobile);
                param.append('type', 'login');
                this.$http({
                    method: 'post',
                    url: URL.code,
                    headers: {
                        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
                    },
                    data: param,
                    responseType: 'json',
                    timeout: 5000
                }).then((res) => {
                    let response = res.data;
                    if (response.ret == '0') {
                        Toast('验证码已经发送到您的手机，请注意查收!');
                    } else if (response.ret == '2000') {
                        this.$router.push({
                            name: 'login'
                        })
                    } else {
                        Toast(response.msg);
                        clearInterval(this.timer);
                        this.minutes = 120;
                        this.code = '获取手机验证码';
                        this.isGet = false;
                    }
                }, (err) => {
                    console.log(err);
                });
            }
        },
        beforeDestroy() {
            clearInterval(this.timer);
        }
    }
</script>