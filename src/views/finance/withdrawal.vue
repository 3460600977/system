<template>
    <div class="page-wrapper">
        <div class="container-fluid">
            <div class="bgf container-content">
                <template>
                    <div class="pd3" >
                        <p class="mb1"><span class="col9">可提现余额：</span>{{isWithdrawalMoney ? isWithdrawalMoney : '0'}}元</p>
                        <div class="mb1">
                            <span class="col9">&nbsp;&nbsp;&nbsp;本次提现：</span>
                            <el-input type="number" v-model="withdrawalMoney" placeholder="请输入金额" class="inputWidth" size="small">
								<span slot="suffix" class="line30 col2 mr1">元</span>
							</el-input>
                        </div>
						<p class="mb1" style="margin-left: 13px;"><span class="col9">提现账户：</span>{{bankInfo ? bankInfo.bankName+"("+bankInfo.cardId+")" : ''}}<a href="/setcount" class="col_main ml1">设置</a>  
                            </p>
							<div style="margin-left:95px;">
                            <div>
                                <el-button type="primary" @click="submitForm">提现</el-button>
                            </div>
                            <span class="col9 font12">提现将在7个工作日完成审核，具体到账时间以银行为准</span>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
		data(){
			return {
				withdrawalMoney: '',// 提现金额
				bankInfo: '', // 银行卡信息
				isWithdrawalMoney: '',// 可提现余额
			}
		},
		mounted() {
			this.getBankAccount();
			this.getAgentInfo();
		},
		methods:{
			// 提交提现审核（提现）
			submitForm(){
				const that = this
				if(!that.withdrawalMoney){
					this.$message({
						type: 'warning',
						message: '请输入提现金额'
					})
					return;
				}
				if(that.withdrawalMoney > that.isWithdrawalMoney){
					this.$message({
						type: 'warning',
						message: '可提现余额为'+ that.isWithdrawalMoney +'元，请重新输入'
					})
					return;
				}
				let data = {
					money: that.withdrawalMoney
				}
				that.postData({
					url: ApiUrl.applyExtract,
					data: data,
					// type: 'post',
					success: function(res){
						if(res.status == 0){
							that.$message({
								type: 'success',
								message: res.message
							})
							that.$router.push('/incomeAccount')
						} else if(res.status == -1) {
							that.$message({
								type: 'info',
								message: res.message
							})
						}
					}
				})
			},
			// 获取账户信息
			getBankAccount(){
				const that = this
				that.postData({
					url: ApiUrl.getBankAccount,
					success: function(res){
						if(res.status == 0){
							that.bankInfo = res.data
							console.log(13)
							console.log(that.bankInfo)
						}
					}
				})
			}, 
			// 获取代理商信息
			getAgentInfo(){
				const that = this
				that.postData({
					url: ApiUrl.getAgentInfo,
					// data: data,
					success: function(res){
						if(res.status == 0){
							that.isWithdrawalMoney = res.data.profitMoney 
						}
					}
				})
			},
		},
		
	}
</script>

<style scoped>
    .inputWidth {
        width: 250px;
    }

    .code_input {
        width: 140px;
    }

    .el-form-item {
        margin-bottom: 5px;
    }
</style>
