<template>
  <div class="page-wrapper">
    <div class="container-fluid">
      <el-row class="mb2">
        <el-col :span="6">
          <div class="mr2 bgf pd3">
            <p class="col9 mb1">可提现余额</p>
            <div class="center">
              <p>
                <span class="font36">{{profitMoney}}</span>元
              </p>
              <a href="javascript:;" @click="goWithdraw" class="alink center withdraw">提&nbsp;现</a>
            </div>
          </div>
        </el-col>
        <el-col :span="6" class="bgf bdr pd3">
          <p class="col9 mb1">我的总收益</p>
          <div class="center" style="margin-bottom: 52px;">
            <p>
              <span class="font36">{{accountInfo ? accountInfo.earnignsStream : 0}}</span>元
            </p>
          </div>
        </el-col>
        <el-col :span="6" class="bgf bdr pd3">
          <p class="col9 mb1">直推收益</p>
          <div class="center mb1">
            <p>
              <span class="font36">{{accountInfo ? accountInfo.earnignsDirectPushStream : '0'}}</span>元
            </p>
            <p class="col9 font14">线下收益：{{accountInfo ? accountInfo.earningsDirectPushStreamOffline : '0'}}元</p>
          </div>
        </el-col>
        <el-col :span="6" class="bgf pd3">
          <p class="col9 mb1">裂变收益</p>
          <div class="center mb1">
            <p>
              <span class="font36">{{accountInfo ? accountInfo.earningsIntroduceStream : '0'}}</span>元
            </p>
            <p class="col9 font14">线下收益：{{accountInfo ? accountInfo.earningsIntroduceStreamOffline : '0'}}元</p>
          </div>
        </el-col>
      </el-row>
      <div class="bgf">
        <div class="pd">账户明细</div>
        <el-table :data="list">
          <el-table-column label="时间">
            <template slot-scope="scope">
              <p>{{scope.row.createTime/1000 | sortTimeYYYYMDHM}}</p>
            </template>
          </el-table-column>
          <el-table-column label="类型">
			  <template slot-scope="scope">
			    <p v-if="scope.row.transactionType == 1 && scope.row.type == 0">充值</p>
				<p v-if="scope.row.transactionType == 1 && scope.row.type == 1">佣金</p>
				<p v-if="scope.row.transactionType == 3 && scope.row.type == 0">提现</p>
			  </template>
		  </el-table-column>
          <el-table-column label="详情">
            <template slot-scope="scope">
              <p>{{scope.row.describe}}</p>
            </template>
          </el-table-column>
          <el-table-column label="金额">
            <template slot-scope="scope">
              <p v-if="scope.row.type == 1" style="color: #FF745B;">+{{scope.row.money}}</p>
			  <p v-else style="color: #00CC99;">-{{scope.row.money}}</p>
            </template>
          </el-table-column>
          <el-table-column label="结余">
            <template slot-scope="scope">
              <p>{{scope.row.balanceMoney}}</p>
            </template>
          </el-table-column>
          <el-table-column label="状态" align="right" width="200">
            <template slot-scope="scope">
				<p v-if="scope.row.transactionType == 1 && scope.row.type == 0">充值成功</p>
				<p v-if="scope.row.transactionType == 1 && scope.row.type == 1">已入账</p>
				<p v-if="scope.row.transactionType == 3 && scope.row.type == 0 && scope.row.status == 0">审核中</p>
				<p v-if="scope.row.transactionType == 3 && scope.row.type == 0 && scope.row.status == 1">审核成功</p>
				<p v-if="scope.row.transactionType == 3 && scope.row.type == 0 && scope.row.status == 2">资金退回</p>
			</template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page center pd bgf">
        <el-pagination
          background
          @current-change="pageChange"
          layout="prev, pager, next,total"
		  :page-size="pageSize"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
		title: "收益账户",
		list: [],
		pageNo: 1,
		pageSize: 10,
		total: 0,
		accountInfo: '',
		profitMoney: 0,// 收益性余额
    };
  },
  mounted() {
  	this.getProfitList();
	this.getEarningsInfo();
	this.getAgentInfo();
  },
  methods: {
	
	// 获取收益性账户的信息
	getEarningsInfo(){
		const that = this
		that.postData({
			url: ApiUrl.getEarningsInfo,
			type: 'post',
			success: function(res){
				if(res.status == 0){
					that.accountInfo = res.data
				}
			}
		})
	},
	
	// 获取代理商信息
	getAgentInfo(){
		let that = this
		that.postData({
			url: ApiUrl.getAgentInfo,
			success: function(res){
				if(res.status == 0){
					that.profitMoney = res.data.profitMoney
				}
			}
		})
	},
	
	
	// 去提现
	goWithdraw(){
		const that = this
		that.postData({
			url: ApiUrl.getBankAccount,
			success: function(res){
				if(res.status == 0){
					if(res.data){
						that.$router.push('/withdrawal')
					} else {
						that.$router.push('/setcount')
					}
				}
			}
		})
	},
	
	// 获取收益性账户流水列表 
	getProfitList(){
		const that = this
		let data = {
			pageNo: that.pageNo,
			pageSize: that.pageSize
		}
		that.postData({
			url: ApiUrl.getProfitList,
			data: data,
			success: function(res){
				if(res.status == 0){
					if(res.data){
						that.list = res.data.list
						that.total = res.data.total
					}
				}
			}
		})
	},  
	 // 选择页码
	pageChange(page){
		this.pageNo = page;
		this.getProfitList();
	},
	
    // 保存验证
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 获取验证码
    getAuthCode() {
      console.log("正在获取验证码");
    }
  }
};
</script>

<style scoped>
.el-table p{
	margin-bottom: 0!important;
}
.inputWidth {
  width: 400px;
}

.el-form-item__error {
  top: 90% !important;
}

.el-form-item {
  margin-bottom: 15px;
}
.el-input-group__append,
.save_btn {
  cursor: pointer;
  background: #58cbc4 !important;
}
.withdraw{
	display: inline-block;
	width:110px;
	height:38px;
	line-height: 38px;
	border:1px solid rgba(228,230,235,1);
	border-radius:5px;
	color: #919398;
}
.withdraw:hover{
	border:1px solid #FFB22B;
	color: #FFB22B;
}
</style>
