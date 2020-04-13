<template>
	<div class="page-wrapper">
	    <div class="container-fluid">
	        <div class="bgf container-content">
				<div class="set-count">
					<template v-if="!hasAccount">
						<p class="mb2 pd2 bdb">请先设置银行账户</p>
						<el-form style="width:410px" :model="bankInfo" ref="bankInfo" label-width="120px"
							class="pdlr3 with_ruleForm">
							<el-form-item label="开户银行:">
								<el-select v-model="bankInfo.bankId" placeholder="请选择" class="inputWidth" size="small">
									<el-option :label="item.bankName" :value="item.id" v-for="(item,index) in bankList"
										:key="index"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="银行卡卡号:">
								<el-input v-model="bankInfo.cardId" placeholder="请输入银行卡卡号 或 公司账户" class="inputWidth"
									size="small"></el-input>
							</el-form-item>
							<el-form-item label="开卡人姓名:">
								<el-input v-model="bankInfo.cardName" placeholder="请输入开卡人姓名 或 公司名称" class="inputWidth"
									size="small"></el-input>
							</el-form-item>
							<el-form-item label="开户支行名称:">
								<el-input v-model="bankInfo.cardBankAddress" placeholder="请输入开户支行完整名称" class="inputWidth"
									size="small"></el-input>
								<div class="font12 mb1 col9 line20 info">请对照银行对账单填写完整支行信息，如“中国民生银行(四川省成都市高新区天顺路72号高新支行)”</div>
							</el-form-item>
							<el-form-item class="code_item" label="短信验证码:">
								<div class="ovh code">
									<el-input v-model="authCode" class="mr1 middle line30 code_input left" size="small"
										placeholder="请输入验证码">
										<!-- <span slot="append" style="color: #fff;" @click="getAuthCode">{{codeText}}</span> -->
									</el-input>
									<el-button class="left middle " type="primary" size="mini" @click="getAuthCode">{{codeText}}</el-button>
								</div>
								<div class="font12 line20 col9 mb1 info">验证短信将发送到您的登录账号：{{phone}}，请注意查收</div>
							</el-form-item>
							<el-form-item class="mb2">
								<el-button class="code_input" type="primary" @click="submitForm('ruleForm')">保存</el-button>
							</el-form-item>
						</el-form>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import tool from "../../api/tools.js"
	export default {
	    data() {
	        return {
	            bankInfo: {
	                bankName: "",
	                cardId: "",
	                cardName: "",
	                cardBankAddress: "",
	                authCode: "",
					id: "",
	            },
	            // 开户银行的数据
	            bankList: [{id: 0,bankName: '中国银行'},{id:1,bankName: '招商银行'},{id: 2,bankName: '建设银行'}],
	            hasAccount: false,
	            codeText: '获取验证码',
				authCode: '',
	            time: 60,
	            timer: null,
				id: '',
				isDisabled: false,
				phone: '',// 短信验证码发送的号码
	        };
	    },
		mounted() {
			this.getBankList();
			this.getBankAccount();
			this.phone = tool.getStore('member_info').phone
		},
	    methods: {
	        // 保存验证
	        submitForm(formName) {
	            if(this.bankInfo.bankId && this.bankInfo.cardId && this.bankInfo.cardName && this.bankInfo.cardBankAddress && this.authCode){
					this.saveCount();
				} else {
					this.$message({
						type: 'info',
						message: '请完善信息哦'
					})
				}
	        },			
			
	        // 获取验证码
	        getAuthCode() {
	            const that = this;
				that.phone = tool.getStore('member_info').phone
	            if (!that.phone) {
	                that.$message.error('请输入手机号');
	                return;
	            }
	            if (!tool.isPhone(that.phone)) {
	                that.$message({
	                    message: '账号格式不正确',
	                    type: 'warning'
	                });
	                return;
	            }
	            let data = {
					phone: that.phone
				}
	            if (!this.isDisabled) { //通过验证
	                that.isDisabled = true;
	                that.postData({
	                    url: ApiUrl.getRegistCode,
						data: JSON.stringify(data),
						type: 'post',
						success: function(res){
							if (res.status == 0) {
							    //60s倒计时
							    that.timer = setInterval(() => {
							        let srotTime = that.time--;
							        that.codeText = srotTime + 's';
							        if (that.time < 0) {
							            clearInterval(that.timer);
							            that.isDisabled = false;
							            that.time = 60;
							            that.codeText = '重新获取';
							        }
							    }, 999);
							} else {
							    that.isDisabled = false;
							    that.$message({
							        message: res.message,
							        type: 'warning'
							    });
							}
						}
	                })
	            }
	        },
			// 获取银行卡列表
			getBankList(){
				const that = this
				that.postData({
					url: ApiUrl.getBankList,
					success: function(res){
						if(res.status == 0){
							if(res.data.length != 0){
								that.$nextTick(() => {
									that.bankList = res.data
								})
							}
						}
					}
				})
			},
			// 获取银行卡信息
			getBankAccount(){
				const that = this
				that.postData({
					url: ApiUrl.getBankAccount,
					success: function(res){
						if(res.status == 0){
							if(res.data){
								that.bankInfo = res.data
							}
						}
					}
				})
			}, 
			// 保存账号
			saveCount(){
				const that = this
				let data = {
					cardId: that.bankInfo.cardId,// 银行卡号
					cardName: that.bankInfo.cardName ,// 开卡人姓名
					cardBankAddress: that.bankInfo.cardBankAddress,// 银行行名称
					bankId: that.bankInfo.bankId,
					bankName: that.bankList[that.bankInfo.bankId].bankName,
					code: that.authCode,// 验证码
				}
				if(that.bankInfo.id){
					data.id = that.bankInfo.id
				}
				that.postData({
					url: ApiUrl.saveCount,
					data: data,
					success: function(res){
						if(res.status == 0){
							that.$message({
								type: 'success',
								message: '保存账户成功'
							})
							that.$router.push('/withdrawal')
						} else {
							that.$message({
								type: 'warning',
								message: '请输入正确的验证码'
							})
						}
					}
				})
			}
	    }
	};
</script>

<style scoped>
.el-form-item{
	margin-bottom: 0;
}
.el-select,.el-input,.info{
	width: 300px!important;
}
.ovh .el-input{
	width: 192px!important;
}
.code{
	width: 300px;
	display: flex;
	padding-top: 5px;
}
</style>
