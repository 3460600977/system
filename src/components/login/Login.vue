
<template>
    <div class="login-container">
        <div class="login-wraper">
            <div class="center"><img src="../../../static/img/login-logo.png" class="mb2"></div>
            <div class="login-content">
                <div class="login-box">
                    <div class="login-header center">
                        <span class="logo">
                           <img src="../../../static/img/logo.png" class="middle" width="25px" height="25px" />
                        </span>
                        <h1 class="fontb colp head-tit">代理商总后台</h1>
                    </div>
                    <div class="login-main">
                        <el-form :model="ruleForm" :rules="rules" label-position="left" class="login-form" label-width="105px">
                            <el-form-item label="管理员账号">
                                <el-input v-model="ruleForm.phone" placeholder="账号" class="login-input"></el-input>
                            </el-form-item>
                            <el-form-item label="登录密码">
                                <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')" class="login-input"></el-input>
								<p class="pointer col_main" style="margin-left: 200px;" @click="centerDialogVisible = true">免费注册</p>
							</el-form-item>
                            <div class="login-btn center mt5">
                                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
		<el-dialog
		  :visible.sync="centerDialogVisible"
		  width="338px"
		  height="400px"
		  center>
		  <div style="position: relative;padding: 14px;">
			<img src="http://192.168.2.47:9019/system/getQrCode?page=pages%2Findex%2Findex%2Findex&scene=123" width="250" height="250"></img>
			<p class="font16 mt3 fontw5 center">微信扫一扫，即可免费注册</p>
		  </div>
		  <img src="../../../static/img/del.png" style="position: absolute;top: 400px; left: 151px;" class="pointer" @click="closeCode">
		</el-dialog>
    </div>
</template>
<script>
    import tool from '../../api/tools.js';
    import rightModel from './RightModel.vue';
    export default {
        components: {
            rightModel
        },
        data: function() {
            return {
                ruleForm: {
                    phone: '',
                    password: '',
                },
				centerDialogVisible: false,// 注册框
                rules: {
                    phone: [{
                        required: true,
                        // message: '账号不能为空',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        // message: '密码不能为空',
                        trigger: 'blur'
                    }]
                }
            }
        },
        mounted(){
            let that = this;
            if (!tool.getStore("token")) {
              this.getUserToken();
            }
        },
        methods: {
			closeCode(){
				this.centerDialogVisible = false;  
			},
			
			// 免费注册
			// freeRegister(){
			// 	this.centerDialogVisible = true
			// 	this.postData({
			// 		url: ApiUrl.getQrCode,
			// 		data: {
			// 			page: 'pages/index/index/index',
			// 			scene: 123,
			// 		}
			// 	})
			// },
			
            //获取token
            getUserToken(callback){
                const self = this;
                self.postData({
                  url:ApiUrl.getToken,
                  success: function(res){
                    if(res.status == 0) {
							tool.setStore('token', res.data);
							localStorage.token=res.data;
							typeof callback === 'function' && callback(res.data);
						}
					},
                });
            },
            /** 账号登录 */
            submitForm(formName) {
                const self = this;
				var formData = JSON.parse(JSON.stringify(self.ruleForm));
				if(!formData.phone && !formData.password){
					self.$message({
						type: 'warning',
						message: '请输入账号和密码哦',
					})
				} else if(!formData.phone){
					self.$message({
						type: 'warning',
						message: '请输入登陆账号哦',
					})
				} else if(!formData.password){
					self.$message({
						type: 'warning',
						message: '请输入登陆密码哦',
					})
				} else {
					self.goLogin(formData);
				}
            },
            goLogin(data){
                const self = this;
                self.postData({
                    url:ApiUrl.login,
                    type:'post',
                    data:JSON.stringify(data),
                    success:function(res){
                        if (res.status == 0) {
                            tool.setStore("member_info",res.data)
                            self.$message({
                                message: '登录成功，即将跳转页面...',
                                type: 'success',
                                onClose: function() {
									if(res.data.agentPreceptId == 2){
										self.$store.commit('selectSidebarList')										
									}
                                    self.$router.push('/workbench');
                                }
                            });
                        } else if (res.status == -82) {
                              tool.setStore("member_info",res.data)
                              self.$alert('您还不是商家用户，先去申请入驻吧', '提示', {
                                confirmButtonText: '去入驻',
                                  callback: action => {
                                    if(action=="confirm"){
                                        self.$router.push('/settled');
                                    }
                                  }
                                });
                        } else if (res.status == -88){
                            self.$alert('您的账号已被禁用，请联系总部', '提示', {
                            confirmButtonText: '确定',
                              callback: action => {
                                 
                              }
                            });
                        } else {
                            self.$message({
                                message: res.message,
                                type: 'warning'
                            });
                            self.changeCode();
                        }
                    }
                });
            }
        }
    }

</script>
<style scoped>
    .login-content{
        width: 1281px;
        height: 599px;
        background: url(../../../static/img/login-wrap.png);
        margin:0 auto;
    }
    .login-box{width:370px;height:330px;float:right;margin-right:200px;margin-top:100px}
    .head-tit{font-size:28px;margin-bottom:50px}
    .login-btn button{
        height:50px!important;
        border-radius:30px;
        width:80%!important;
        color:#fff!important;
        font-size:16px;
        margin-top:20px;
    }
    .login-container .el-form-item__label{
        font-weight:bold;
    }
	.el-dialog__body{
		position: relative;
	}
</style>
