
<template>
  <div class="page-wrapper">
    <div class="agent pd3 bgf">
      <div class="agent-avter">
        <img src="../../../static/img/head.png" width="85" height="85" alt />
        <div class="ml2 mr2">
            <p style="line-height: 42px;">
                {{openAgentDetail.name}}
                <span class="tag">{{openAgentDetail.agentPreceptId==1 ? '总代':'二级'}}</span>
            </p>
            <p style="line-height: 42px;">{{openAgentDetail.phone}}</p>
        </div>
      </div>
    </div>
    <div class="height"></div>
    <div class="main bgf pd3 font16">
      <el-form ref="form" :model="openAgentDetail" label-width="120px">
        <el-form-item label="联系电话：">
          <p class="font16">{{openAgentDetail.phone ? openAgentDetail.phone : '无'}}</p>
        </el-form-item>
        <el-form-item label="推荐人ID：">
          <p class="font16">
          {{createUserInfo.userId ? createUserInfo.userId : '无'}}
          <span class="col9" v-if="createUserInfo.userName!=null">({{createUserInfo.userName}}-{{createUserInfo.userPhone}})</span>
          </p>
        </el-form-item>
        <el-form-item label="提交时间：">
          <p class="font16">{{openAgentDetail.createTime/1000 | sortTimeYYYYMDHM}}</p>
        </el-form-item>
        <el-form-item label="开通版本：">
          <p class="font16">{{openAgentDetail.versionId == 1 ? '无' : '二级代理商'}}</p>
        </el-form-item>
        <el-form-item label="有效期：">
          <p class="font16">永久</p>
        </el-form-item>
        <el-form-item label="市场价格：">
          <p class="font16">{{openUseMoney.marketMoney}}元</p>
        </el-form-item>
        <el-form-item label="代理价格：">
          <p class="font16">{{openUseMoney.preceptMoney}}元</p>
        </el-form-item>
        <el-form-item label="预估收益：">
          <p class="font16">{{openUseMoney.forecastEarnings}}元
            <span class="font12 ml1 col9">分佣80%<!-- {{openAgentDetail.interestRate}} --></span>
            <span class="checkDraw ml1 col_main">产看裂变图</span>
          </p>
        </el-form-item>
        <el-form-item label="创建的企业：">
          <p class="font16" style="display: flex;align-items: center;">
            <span>{{openAgentDetail.teamName ? openAgentDetail.teamName : '无'}}</span>

          </p>
        </el-form-item>
        <el-form-item label="备注：">
          <p
            class="font16 col2"
            style="width: 444px;"
          >{{openAgentDetail.remarks ? openAgentDetail.remarks : '无'}}</p>
        </el-form-item>
        <el-form-item label>
          <div class="pay pd">
            <p class="col_main font14">本次开通需扣除账户余额: {{openUseMoney.preceptMoney}}元</p>
            <p class="button-holder" @click="selectPayType(0)">
              <input type="radio" id="radio-1-1" name="radio-1-set" class="regular-radio" checked />
              <label for="radio-1-1"></label>
              <span class="pay-money">
                消耗性余额{{consumeMoney}}元
                <span @click="showRechargeType" class="ml1 pointer" style="color:#FFB22B">充值</span>
              </span>
            </p>
            <p class="button-holder" @click="selectPayType(1)">
              <input type="radio" id="radio-1-2" name="radio-1-set" class="regular-radio" />
              <label for="radio-1-2"></label>
              <span class="pay-money">微信支付</span>
            </p>
          </div>
        </el-form-item>
        <el-form-item label>
          <p class="goOpen center mt2 pointer" @click="openAgent">立即开通</p>
        </el-form-item>
      </el-form>
    </div>
    <!-- 充值提示框 -->
    <el-dialog title="消耗型余额充值" :visible.sync="showRecharge" width="729px">
      <ul class="mt2" v-if="rechargeType == 1">
        <li class="mb2">
          充值方式：
          <el-radio v-model="rechargeType" @change="payRechangeByWx" label="1">微信充值</el-radio>
          <el-radio v-model="rechargeType" @change="payRechangeByWx" label="2">从"收益账户"中充值</el-radio>
        </li>
        <li class="mb2 ovh">
          <span class="left">选择套餐：</span>
          <div class="payBox_tcbox left">
            <span
              v-for="(item,index) in rechargeList"
              :key="index"
              :class="rechargeId==item.id ? 'active':''"
              @click="checkRecharge(item.id)"
            >{{item.consumeMoney}}客豆/{{item.money}}元</span>
          </div>
        </li>
        <li class="mb2">
          <span>当前余额：</span>
          <span class="pay_money">{{haveMoney}}元</span>
        </li>
        <li class="mb2">
          <span>支付方式：</span>
          <div class="pay_ewm" v-loading="loading" element-loading-text="加载中..">
            <div id="qrcode" ref="qrcode"></div>
            <p>微信扫一扫，即可完成充值</p>
          </div>
        </li>
      </ul>
      <ul class="mt2" v-if="rechargeType == 2">
        <li class="mb2">
          &emsp;&emsp;充值方式：
          <el-radio v-model="rechargeType" @change="payRechangeByWx" label="1">微信充值</el-radio>
          <el-radio v-model="rechargeType" @change="payRechangeByWx" label="2">从"收益账户"中充值</el-radio>
        </li>
        <li class="mb2">
          <span>收益账户余额：</span>
          <span class="pay_money">{{haveMoney}}元</span>
        </li>
    	<li class="mb2 ovh">
    	  <span class="left line40">&emsp;&emsp;充值金额：</span>
    	  <div class="payBox_tcbox_2 left">
    	    <el-input v-model="totalMoney" placeholder="请输入充值金额"></el-input>
    	  </div>
    	</li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showRecharge = false">取 消</el-button>
        <el-button type="primary" @click="rechargePayByprofitMoney">{{rechargeType == 1 ? '我已支付' : '立即充值'}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import QRCode from "qrcodejs2";
import tool from "../../api/tools.js"
export default {
  data() {
    return {
      showRecharge: false, // 充值窗口
      rechargeType: "1", //充值方式
	  payType: 0,// 支付方式
      rechargeList: [],
	  createUserInfo: '', // 创建者的信息
	  openAgentDetail: {},
	  companyId: '',
	  loading: true,
      rechargeId: 5, //充值金额选择 0/200,1/300,2/500;
      orderNumber: "", //预支付订单号
      haveMoney: 0,
      pageId: 1,
      pageSize: 1,
	  consumeMoney: 0,
	  useMoney: 0,
	  userInfo: {},// 当前登录的用户信息
	  openUseMoney: '',//开通的获利及费用
	  totalMoney: '',// 收益性余额充值消费性余额
    };
  },
  created(){
	this.userInfo = tool.getStore('member_info');
  	if(this.$route.query.companyId){
  		this.companyId = this.$route.query.companyId
  	}
  },
  mounted() {
  	this.getOpenAgentDetail();
	this.getAgentInfo();
	this.getOpenVersionMoney();
	this.getRechargeConfig()
  },
  methods: {

	// 收益性余额充值消费性余额
	rechargePayByprofitMoney(){
		const that = this
		if(!that.totalMoney){
			that.$message({
				type: 'warning',
				message: '请输入充值金额'
			})
		} else {
			this.profitMoneyConversionToConsummerMoney()
		}
	},
	// 微信充值
	wxRecharge(){
		const that = this
		let data = {}
		if(that.rechargeId){
			data.configId = that.rechargeId
		}
		that.postData({
			url: ApiUrl.getQCode,
			data: data,
			success: function(res){
				if(res.status == 0){
					that.qrCode(res.data.qcode)
					that.loading = false
				}
			}
		})
	},
	// 收益性余额充值
	profitMoneyConversionToConsummerMoney(){
		const that = this
		let data = {
			totalMoney: that.totalMoney,
		}
		that.postData({
			url: ApiUrl.profitMoneyConversionToConsummerMoney,
			data: data,
			success: function(res){
				if(res.status == 0){
					that.$message({
						type: 'success',
						message: res.message
					})
				} else if(res.status == -1){
					console.log(res.message)
					that.$message({
						type: 'warning',
						message: res.message
					})
				}
			}
		})
	},
	//获取充值选项
	getRechargeConfig() {
	  let that = this;
	  that.postData({
	    url: ApiUrl.getRechargeConfigList,
	    success: function(res) {
	      if (res.status == 0) {
	        if (res.data.length) {
	          that.rechargeList = res.data
	        }
	      }
	    }
	  });
	},
	// 选择微信充值
	payRechangeByWx(){
	  if(this.rechargeType == 1){
		  this.loading = true
		  this.wxRecharge()
	  }
	},
	// 打开充值
	showRechargeType(){
		this.showRecharge = true
		this.rechargeType = '1',
		this.wxRecharge()
	},
	//选择充值套餐
	checkRecharge(datas) {
	  this.rechargeId = datas;
	  this.wxRecharge()
	},
	// 选择支付方式
	selectPayType(type){
		this.payType = type
	},
	// 获取需要开通的代理商的信息
	getOpenAgentDetail(){
		const that = this
		let data = {
			agentId: that.companyId
		}
		that.postData({
			url: ApiUrl.getAgentDetail,
			data: data,
			success: function(res){
				if(res.status == 0){
					that.openAgentDetail = res.data
					that.createUserInfo = res.data.recommendUser
				}
			}
		})
	},
	// 获取当前代理商开通的详情
	getOpenVersionMoney(){
		const that = this
		that.postData({
			url: ApiUrl.openVersionMoney,
			success: function(res){
				if(res.status == 0){
					that.openUseMoney = res.data[1]
				}
			}
		})
	},


	// 开通代理商
	openAgent(){
		const that = this
		let data = {
			versionId: 2,//
			money: that.openUseMoney.preceptMoney,//开通的费用
			openAgentId: that.companyId,
		}

		if(that.payType == 0){
			that.postData({
				url: ApiUrl.openVersionAgentUser,
				data: JSON.stringify(data),
				type: 'post',
				success: function(res){
					if(res.status == 0){
						that.$message({
							type: 'success',
							message: '开通成功'
						})
					that.$router.push({path: '/agentdetail',query: {companyId: that.companyId}})
					} else {
						that.$message({
							type: 'info',
							message: res.message
						})
					}
				}
			})
		} else {
			that.postData({
				url: ApiUrl.openVersionAgentUserByWxPay,
				data: JSON.stringify(data),
				type: 'post',
				success: function(res){
					if(res.status == 0){
						that.$message({
							type: 'success',
							message: res.message
						})
						that.$router.push({path: '/agentdetail',query: {companyId: that.companyId}})
					} else {
						that.$message({
							type: 'info',
							message: res.message
						})
					}
				}
			})
		}
	},

	// 查询代理商详情
	getAgentInfo(){
		const that = this
		that.postData({
			url: ApiUrl.getAgentInfo,
			success: function(res){
				if(res.status == 0){
					that.haveMoney = res.data.profitMoney
					that.consumeMoney = res.data.consumeMoney
				}
			}
		})
	},

    //获取账户明细
    getList() {
      let that = this;
      let data = {
        pageId: that.pageId,
        pageSize: that.pageSize
      };
      that.postData({
        url: ApiUrl.getRechargeConfig,
        data: data,
        success: function(res) {
          if (res.status == 0) {
            that.list = res.data.list;
          }
        }
      });
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
    pageChange() {},
    selectOrder() {
      //查询充值结果
      let that = this;
      that.postData({
        url: ApiUrl.selectOrder,
        data: {
          orderNumber: that.orderNumber
        },
        success: function(res) {
          if (res.status == 0) {
            that.$message({
              type: "success",
              message: "充值成功!"
            });
            that.getUserMoney();
            that.showRecharge = false;
          } else if (res.status == 4) {
            that.$message({
              type: "success",
              message: "未查询到支付记录,请扫码支付!"
            });
          } else {
            that.$message({
              type: "success",
              message: res.message
            });
            that.showRecharge = false;
          }
        }
      });
    },
    qrCode(url) {
      this.$refs.qrcode.innerHTML = "";
      let qrcode = new QRCode("qrcode", {
        width: 200, //图像宽度
        height: 200, //图像高度
        colorDark: "#000000", //前景色
        colorLight: "#ffffff", //背景色
        typeNumber: 4,
        correctLevel: QRCode.CorrectLevel.H //容错级别 容错级别有：（1）QRCode.CorrectLevel.L （2）QRCode.CorrectLevel.M （3）QRCode.CorrectLevel.Q （4）QRCode.CorrectLevel.H
      });
      qrcode.clear(); //清除二维码
      qrcode.makeCode(url); //生成另一个新的二维码
      this.loading = false;
    }
  }
};
</script>
<style scoped>
p {
  margin: 0;
  padding: 0;
}
label {
  margin-bottom: 0.1rem !important;
}
.agent-main {
  width: 100%;
}
.agent-avter {
  display: flex;
}
.agent {
  display: flex;
}
.main {
  width: 100%;
  /* height: 700px; */
}
.el-form-item {
  margin: 0;
}
.el-form-item__label {
  font-size: 16px;
}
.checkDraw {
  display: inline-block;
  width: 88px;
  height: 26px;
  border: 1px solid rgba(116, 90, 242, 1);
  border-radius: 5px;
  font-size: 12px;
  line-height: 24px;
  text-align: center;
  cursor: pointer;
}
.pay {
  width: 327px;
  height: 130px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(228, 230, 235, 1);
  box-shadow: 0px 0px 16px 0px rgba(213, 228, 237, 0.38);
  border-radius: 5px;
}
.goOpen {
  width: 150px;
  height: 38px;
  background: rgba(116, 90, 242, 1);
  border-radius: 5px;
  color: #fff;
  line-height: 38px;
  margin-top: 30px;
}

.button-holder {
  height: 30px !important;
  position: relative;
}
.pay-money {
  position: absolute;
  top: -4px;
  left: 20px;
}
.regular-radio {
  display: none;
}

.regular-radio + label {
  -webkit-appearance: none;
  background-color: #fff;
  border: 1px solid #aaa;
  padding: 6px;
  border-radius: 50px;
  display: inline-block;
  position: relative;
}

.regular-radio:checked + label:after {
  content: " ";
  width: 6px;
  height: 6px;
  border-radius: 50px;
  position: absolute;
  top: 3px;
  background: #745af2;
  left: 3px;
}
.regular-radio:checked + label {
  border: 1px solid #745af2;
}

.payBox_tcbox span {
  width: 150px;
  text-align: center;
  height: 50px;
  line-height: 50px;
  border: 2px solid #a7a7a7;
  color: rgba(52, 52, 52, 0.7);
  border-radius: 6px;
  margin-right: 20px;
  margin-bottom: 10px;
  cursor: pointer;
  font-weight: 700;
  display: inline-block;
}
.active{
	border: 2px solid #745AF2!important;
}
.pay_ewm{
	margin-left: 75px;
}
.payBox_tcbox_2{
	display: flex;
}

.tag {
    padding: 0 4px;
    font-size: 12px;
    border: 1px solid #ccc;
    border-radius: 10px;
}
</style>
