<template>
  <div class="page-wrapper">
    <div class="container-fluid">
      <el-row class="mb2">
        <el-col :span="6">
          <div class="mr2 bgf pd3">
            <p class="col9 mb1">消耗性余额</p>
            <div class="center">
              <p>
                <span class="font36">{{consumeMoney}}</span>元
              </p>
              <a href="javascript:;" class="alink center recharge" @click="showRechargeType">充&nbsp;值</a>
            </div>
          </div>
        </el-col>
        <el-col :span="6" class="bgf bdr pd3">
          <p class="col9 mb1">总消费金额</p>
          <div class="center" style="margin-bottom: 52px;">
            <p>
              <span class="font36">{{accountInfo ? accountInfo.consummerOpenVersionStream + accountInfo.consummerOtherStream : 0}}</span>元
            </p>
          </div>
        </el-col>
        <el-col :span="6" class="bgf bdr pd3">
          <p class="col9 mb1">开通企业共消费</p>
          <div class="center mb1">
            <p>
              <span class="font36">{{accountInfo.consummerOpenVersionStream ? accountInfo.consummerOpenVersionStream : 0}}</span>元
            </p>
			<p class="col9 font14">&nbsp;</p>
            <!-- <p class="col9 font14">线下收益：{{accountInfo.introduceEarnings ? accountInfo.introduceEarnings : '0'}}元</p> -->
          </div>
        </el-col>
        <el-col :span="6" class="bgf pd3">
          <p class="col9 mb1">其他消费</p>
          <div class="center mb1">
            <p>
              <span class="font36">{{accountInfo.consummerOtherStream ? accountInfo.consummerOtherStream : '0'}}</span>元
            </p>
			<p class="col9 font14">&nbsp;</p>
            <!-- <p class="col9 font14">线下收益：{{accountInfo.consummerOtherStream ? accountInfo.consummerOtherStream : '0'}}元</p> -->
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
			    <p>{{scope.row.type == 0 ? '消费' : '充值' }}</p>
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
          <el-table-column label="状态" align="right">
            <template slot-scope="scope">
					<!-- <p v-if="scope.row.status == 0">审核</p> -->
				<p>成功</p>
					<!-- <p v-if="scope.row.status == 2">失败</p> -->
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
          <span class="pay_money">{{consumeMoney}}元</span>
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
	      <span class="pay_money">{{consumeMoney}}元</span>
	    </li>
		<li class="mb2 ovh">
		  <span class="left line40">&emsp;&emsp;充值金额：</span>
		  <div class="payBox_tcbox_2 left">
		    <el-input v-model="totalMoney" placeholder="请输入充值金额" :maxlength="inputMaxL"  @input="inputMaxL = /^\d+\.?\d{0,1}$/.test(totalMoney) ? null : totalMoney.length - 1"></el-input>
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
export default {
  data() {
    return {
      title: "收益账户",
      tableData: [
        {
          companyId: "05",
          administrator: "云上",
          phoneNumber: 18384580836,
          businessMnagement: "成都华悟科技有限责任公司",
          version: "帝王版",
          type: "直招",
          referrer: "ID10254",
          fission: 45,
          rdate: "2019-4-5 19:25:36",
          indate: "2019-4-5 19:25:36"
        }
      ],
      loading: false,//加载标志
      showRecharge: false, //充值窗口
      rechargeType: '1', //充值方式
      rechargeList: [
        {
          id: 1,
          costMoney: 150.0,
          money: 500.0,
          fictitiousMoney: 550.0,
          createDate: 1559265929000,
          createUser: null,
          updateDate: 1559265935000,
          configDetail: "充值客豆"
        }
      ],
	  list: [], // 消耗性账户详细
      rechargeId: 5, //充值金额选择 0/200,1/300,2/500;
      orderNumber: "", //预支付订单号
      haveMoney: 0,
	  consumeMoney: 0,// 消耗性余额
      pageNo: 1,
      pageSize: 10,
	  total: 0,
	  accountInfo: '',// 消耗性账户信息
	  totalMoney: '',//
      inputMaxL:4,
    };
  },
  mounted() {
  	this.getList();
	this.getConsummerInfo();
	this.getRechargeConfig();
	this.getAgentInfo();
  },
  methods: {

	// 获取消耗性账户信息
	getConsummerInfo(){
		const that = this
		that.postData({
			url: ApiUrl.getConsummerInfo,
			type: 'post',
			success: function(res){
				if(res.status == 0){
					that.accountInfo = res.data
				}
			}
		})
	},
	// 收益性余额充值消费性余额
	rechargePayByprofitMoney(){
		const that = this
		if(that.rechargeType == 1){ // 微信支付回调
			that.showRecharge = false
		} else {
			if(!that.totalMoney){
				that.$message({
					type: 'warning',
					message: '请输入充值金额'
				})
			} else {
				this.profitMoneyConversionToConsummerMoney()
			}
		}
	},
	// 获取代理商信息
	getAgentInfo(){
		let that = this
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
        pageNo: that.pageNo,
        pageSize: that.pageSize
      };
      that.postData({
        url: ApiUrl.getRechargeConfig,
        data: data,
        success: function(res) {
          if (res.status == 0) {
			  console.log(res.data)
            // that.list = res.data;
			if(res.data){
				that.total = res.data.total;
				that.list = res.data.list;
			}
          }
        }
      });
    },
	pageChange(page){
		this.pageNo = page
		this.getList()
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
				}
			}
		})
	},
	// 收益性余额充值
	profitMoneyConversionToConsummerMoney(){
		const that = this
		if(that.totalMoney < 0.01){
			that.$message({
				type: 'warning',
				message: '最少充值0.01元'
			})
			return;
		}
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

    // selectOrder() {
    //   //查询充值结果
    //   let that = this;
    //   that.postData({
    //     url: ApiUrl.selectOrder,
    //     data: {
    //       orderNumber: that.orderNumber
    //     },
    //     success: function(res) {
    //       if (res.status == 0) {
    //         that.$message({
    //           type: "success",
    //           message: "充值成功!"
    //         });
    //         that.getUserMoney();
    //         that.showRecharge = false;
    //       } else if (res.status == 4) {
    //         that.$message({
    //           type: "success",
    //           message: "未查询到支付记录,请扫码支付!"
    //         });
    //       } else {
    //         that.$message({
    //           type: "success",
    //           message: res.message
    //         });
    //         that.showRecharge = false;
    //       }
    //     }
    //   });
    // },
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
.el-table p{
	margin-bottom: 0!important;
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
.payBox_tcbox_2{
	display: flex;
}
.recharge{
	display: inline-block;
	width:110px;
	height:38px;
	line-height: 38px;
	border:1px solid rgba(228,230,235,1);
	border-radius:5px;
	color: #919398;
}
.recharge:hover{
	border:1px solid #FFB22B;
	color: #FFB22B;
}
.active{
	border: 2px solid #745AF2!important;
	color: #745AF2!important;
}
.pay_ewm{
	margin-left: 75px;
}
</style>
