<template>
    <div class="page-wrapper">
        <div class="agent pd3 bgf">
            <div class="agent-avter">
                <img :src="openBusinessInfo.teamIcon ? imgHead + openBusinessInfo.teamIcon : '../../../static/img/head.png'" width="85" height="85" alt />
                <div class="ml2 mr2">
                    <p style="line-height: 26px;">
                        <span class="tag font18 col2">{{openBusinessInfo.teamName}}</span>
                    </p>
                    <p class="col9 font16" style="line-height: 26px;">创建者：{{openBusinessInfo.userName ? openBusinessInfo.userName : '无'}}-{{openBusinessInfo.contactNumber ? openBusinessInfo.contactNumber : '无'}}</p>
                    <p class="col9 font16" style="line-height: 26px;" v-if="openBusinessInfo.teamAddress"><span class="location-icon mr"></span>{{openBusinessInfo.teamAddress}}</p>
                </div>
            </div>
        </div>
        <div class="height"></div>
        <div class="main bgf pd3 font16">
            <el-form ref="form" label-width="120px">
                <el-form-item label="联系电话：">
                    <p class="font16">{{openBusinessInfo.contactNumber}}</p>
                </el-form-item>
                <el-form-item label="当前版本：">
                    <p class="font16" style="display: flex;align-items: center;">
                       {{openBusinessInfo.versionName}}
                        <span v-if="openBusinessInfo.versionId!=3" class="small_btn col_main font12 center ml1" @click="showDialog(1)">升级</span>
                    </p>
                </el-form-item>
                <el-form-item label="开通人数：">
                    <p class="font16" style="display: flex;align-items: center;">
                        <span>{{bussinessCreateInfo.peopleNumber!=-1 ? bussinessCreateInfo.peopleNumber: '不限'}}人</span>
						<span class="col9">(已使用{{usePeopleNumber}}人)</span>
                        <span v-if="bussinessCreateInfo.peopleNumber!=-1" class="small_btn col_main font12 center ml1" @click="showDialog(2)">添加</span>
                    </p>
                </el-form-item>
                <el-form-item label="开通时间：">
                    <p class="font16">{{bussinessCreateInfo.passTime/1000 | sortTimeYYYYMDHM}}</p>
                </el-form-item>
                <el-form-item label="版本有效期：">
                    <!-- <p class="font16">{{openBusinessInfo.indate}}</p> -->
                    <p class="font16" style="display: flex;align-items: center;">
                        <span>{{bussinessCreateInfo.serviceDate/1000 | sortTimeYYYYMDHM}}</span>
                        <span class="small_btn col_main font12 center ml1" @click="showDialog(5)">续期</span>
                    </p>
                </el-form-item>
                <el-form-item label="我的收益：">
                    <p class="font16" style="display: flex;align-items: center;">
                        <span>{{openBusinessInfo.myProfit ? openBusinessInfo.myProfit : 0}}元</span>
                        <span class="font12 ml1">分佣{{agentProfit*100}}%</span>
                        <span class="checkDraw ml1 col_main" @click="showDialog(3)">查看裂变图</span>
                    </p>
                </el-form-item>
                <el-form-item label="推荐人ID：">
                    <p class="font16">{{openBusinessInfo.recommendId ? openBusinessInfo.recommendId + '（' + openBusinessInfo.recommendName + '-' + openBusinessInfo.recommendPhone + '）' : '无'}}</p>
                </el-form-item>
                <el-form-item label="类型：">
                    <p class="font16">{{bussinessCreateInfo.type == 1 ? '直推' : '转介绍'}}</p>
                </el-form-item>
                <el-form-item label="裂变企业：">
                    <p class="font16">
                        <span>{{bussinessCreateInfo.fissionNumber ? bussinessCreateInfo.fissionNumber : 0}}家</span>
                    </p>
                </el-form-item>
                <el-form-item label>
                    <div class="equity mt1">
                        <el-form>
                            <el-form-item label="扩展功能：">
                                <div class="user-equity">
                                    <p style="width: 130px;" v-for="(item,index) in extendList" :key="index">
                                        <input type="checkbox" :id="item" disabled :checked="permission.includes(index+1)"
                                            class="gcs-checkbox" />
                                        <label :for="item"></label>
                                        {{item}}
                                    </p>
                                </div>
                            </el-form-item>
                            <el-form-item label="营销推广：">
                                <div class="user-equity">
                                    <p style="width: 130px;" v-for="(item,index) in promotionList" :key="index">
                                        <input type="checkbox" :id="item" disabled :checked="permission.includes(index+4)"
                                            class="gcs-checkbox" />
                                        <label :for="item"></label>
                                        {{item}}
                                    </p>
                                </div>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-form-item>
            </el-form>
        </div>

        <!-- 升级版本 -->
        <el-dialog title="升级版本" :visible.sync="upGradeFlag" width="730px">
            <div class="upgrade">
                <div class="upgrade_1">
                    <p class="col9">升级版本：</p>
                    <p class="versions versioned">
						<!-- 原来的样式 -->
                        <!-- <el-select v-model="versionIndex" placeholder="请选择" @change="selectVersion">
                            <el-option :key="index" :label="item.name"
                                :value="index" v-for="(item,index) in servicePreceptInfoList"></el-option>
                        </el-select> -->
						<!-- 样式修改后的 -->
						<span :style="versionIndex === index ? 'border: 1px solid #745af2;color: #745af2;' : ''" @click="select(index)" class="vspan" :key="index" v-for="(item,index) in servicePreceptInfoList">{{item.name}}</span>
                    </p>
                </div>
                <div class="upgrade_1 mt2">
                    <p class="col9">套餐人数：</p>
                    <p class="versions ml1" v-if="servicePreceptInfoList.length>0">
                        <span class="col2" v-if="versionIndex !== ''">{{servicePreceptInfoList[versionIndex].people==-1 ? '不限':servicePreceptInfoList[versionIndex].people}}</span>
                        <!-- <span class="col2" v-if="versionIndex != ''">{{openNumber}}</span> -->
                        <span class="col2" v-else>无</span>人
                        <span class="col9">(已使用{{openBusinessInfo.usePeopleNumber}}人)</span>
                    </p>
                </div>
                <!-- <div class="upgrade_1 mt2">
                    <p class="col9">升级年限：</p>
                    <p class="versions">
                        <el-select v-model="timeIndex" placeholder="请选择" @change="selectTime">
                            <el-option :key="index" :label="item.name" :value="index" v-for="(item,index) in indateList"></el-option>
                        </el-select>
                    </p>
                </div> -->
                <div class="upgrade_1 mt2">
					<p class="col9">开通时间：</p>
					<p class="versions ml1">
						<span class="col2">服务有效期至{{bussinessCreateInfo.serviceDate/1000 | sortTimeYYYYMDHM}}</span>
					</p>
				</div>
                <div class="upgrade_1 mt2">
                    <p class="col9">升级费用：</p>
                    <p class="versions ml1">
                        <span class="col2">{{marketPrice}}元</span>
                    </p>
                </div>
                <div class="upgrade_1 mt2">
                    <p class="col9">代理价格：</p>
                    <p class="versions ml1">
                        <span class="col2">{{agencyPrice}}元</span>
                    </p>
                </div>
                <div class="upgrade_1 mt2">
                    <p class="col9">预估收益：</p>
                    <p class="versions ml1">
                        <!-- <span class="col_main">{{earning}}元</span> -->
                        <span class="col_main">{{marketPrice*agentProfit}}元</span>
                        <span class="font12 col9 ml1" style="margin-top: 3px;">分佣{{agentProfit*100}}%</span>
                    </p>
                </div>
                <div class="upgrade_2 mt5">
                    <p class="col2 font16">
                        <span class="col_main">本次开通需扣除账户余额: {{agencyPrice}}元</span> ，账户余额{{consumeMoney ? consumeMoney : 0}}元
                        <a href="javascript:;" class="col_main" @click="showRechargeType" style="color: #745AF2;!imporatnt">充值</a>
                    </p>
                </div>
                <div class="upgrade_2 mt2">
                    <p class="go-up center font16" @click="upgradeBusiness(1)">确认升级</p>
                </div>
            </div>
        </el-dialog>
        <!-- 版本升级成功 -->
        <el-dialog title="提示" :visible.sync="infoFlag" width="730px">
            <div class="info-contant col2 center font18">升级版本成功，已赚取{{earning}}元，继续加油哦！</div>
            <div class="upgrade_2 mt2">
                <p class="go-up center font16" @click="roger" >我知道了</p>
            </div>
        </el-dialog>
        <!-- 添加人数 -->
        <el-dialog title="添加人数" :visible.sync="addFlag" width="730px">
            <div class="upgrade">
                <div class="upgrade_1 mt2">
                    <p class="col9">添加人数：</p>
                    <p class="versions ml1">
                        <span class="col_main">{{openNumber}}</span>人
                        <span class="col9">(已使用{{openBusinessInfo.usePeopleNumber}}人)</span>
                    </p>
                    <el-input-number v-model="openNumber" @change="changePeople" :min="temporaryPeople" label="描述文字"></el-input-number>
                </div>
                <!-- <div class="upgrade_1 mt2">
                    <p class="col9">开通时间：</p>
                    <p class="versions ml1">
                        <span class="col2">服务有效期至2020-12-21 16:23</span>
                    </p>
                </div> -->
				<div class="upgrade_1 mt2">
					<p class="col9">开通时间：</p>
					<p class="versions ml1">
						<span class="col2">服务有效期至{{bussinessCreateInfo.serviceDate/1000 | sortTimeYYYYMDHM}}</span>
					</p>
				</div>
                <div class="upgrade_1 mt2">
                    <p class="col9">升级费用：</p>
                    <p class="versions ml1">
                        <span class="col2">{{marketPrice}}元</span>
                    </p>
                </div>
                <div class="upgrade_1 mt2">
                    <p class="col9">代理价格：</p>
                    <p class="versions ml1">
                        <span class="col2">{{agencyPrice}}元</span>
                    </p>
                </div>
                <div class="upgrade_1 mt2">
                    <p class="col9">预估收益：</p>
                    <p class="versions ml1">
                        <span class="col_main">{{marketPrice*agentProfit}}元</span>
                        <span class="font12 col9 ml1" style="margin-top: 3px;">分佣{{agentProfit*100}}%</span>
                    </p>
                </div>
                <div class="upgrade_2 mt5">
                    <p class="col2 font16">
                        <span class="col_main">本次开通需扣除账户余额:{{agencyPrice}}元</span> ，账户余额{{consumeMoney ? consumeMoney : 0}}元
                        <a href="javascript:;" class="col_main" @click="showRechargeType" style="color: #745AF2;!imporatnt">充值</a>
                    </p>
                </div>
                <div class="upgrade_2 mt2">
                    <p class="go-up center font16" @click="upgradeBusiness(2)">确认添加</p>
                </div>
            </div>
        </el-dialog>
        <!-- 续期 -->
        <el-dialog title="续期时间" :visible.sync="renewalFlag" width="730px">
            <div class="upgrade">
                <div class="upgrade_1 mt2">
                    <p class="col9">续期时间：</p>
                    <el-select v-model="timeIndex" placeholder="请选择" @change="selectTime">
                        <el-option :key="index" :label="item.name" :value="index" v-for="(item,index) in indateList"></el-option>
                    </el-select>
                </div>
                <div class="upgrade_1 mt2">
                	<p class="col9">开通时间：</p>
                	<p class="versions ml1">
                		<span class="col2">服务有效期至{{bussinessCreateInfo.serviceDate/1000 | sortTimeYYYYMDHM}}</span>
                	</p>
                </div>
                <div class="upgrade_1 mt2">
                    <p class="col9">升级费用：</p>
                    <p class="versions ml1">
                        <span class="col2">{{marketPrice}}元</span>
                    </p>
                </div>
                <div class="upgrade_1 mt2">
                    <p class="col9">代理价格：</p>
                    <p class="versions ml1">
                        <span class="col2">{{agencyPrice}}元</span>
                    </p>
                </div>
                <div class="upgrade_1 mt2">
                    <p class="col9">预估收益：</p>
                    <p class="versions ml1">
                        <span class="col_main">{{marketPrice*agentProfit}}元</span>
                        <span class="font12 col9 ml1" style="margin-top: 3px;">分佣{{agentProfit*100}}%</span>
                    </p>
                </div>
                <div class="upgrade_2 mt5">
                    <p class="col2 font16">
                        <span class="col_main">本次开通需扣除账户余额:{{marketPrice}}元</span> ，账户余额{{consumeMoney ? consumeMoney : 0}}元
                        <a href="javascript:;" class="col_main" @click="showRechargeType" style="color: #745AF2;!imporatnt">充值</a>
                    </p>
                </div>
                <div class="upgrade_2 mt2">
                    <p class="go-up center font16" @click="upgradeBusiness(1)(3)">确认</p>
                </div>
            </div>
        </el-dialog>
		<!-- 充值 -->
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
		    <el-input v-model="totalMoney" placeholder="请输入充值金额"></el-input>
		  </div>
		</li>
		</ul>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="showRecharge = false">取 消</el-button>
		    <el-button type="primary" @click="rechargePayByprofitMoney">{{rechargeType == 1 ? '我已支付' : '立即充值'}}</el-button>
		  </span>
		</el-dialog>

		<el-dialog title="裂变图" :visible.sync="fissionFlag" width="730px">
			<div class="center pb5">
			    <template v-for="(item,index) in dataDiagramLists">
			        <div v-if="index!=0">
			            <div class="mt2">{{item.lineString}}</div>
			            <div class="mb1"><i class="icon char_icon"></i></div>
			        </div>
			        <!-- chart_arr chart_arr3 -->
			        <div class="chart_box" :class="item.type==2 ? 'chart_box_yellow chart_arr':(item.type==3 ? 'chart_box_gray chart_right':'chart_arr')">
			            <div class="pdt2">
			                {{item.name}}({{item.typeName}})
			            </div>
			            <div>
			                本次收益:{{item.profitMoney}}
			            </div>
			            <div v-if="(index+1)==dataDiagramLists.length" class="chart_hline" :style="'width:'+((agentNum)*60)+'px;right:'+(-(agentNum)*60)+'px'"></div>
			            <div v-else class="chart_hline" :style="'width:'+((agentNum-index)*60)+'px;right:'+(-(agentNum-index)*60)+'px'"></div>

			            <div v-if="(index+1)!=dataDiagramLists.length" class="chart_vline"
			                :style="'height:'+((agentNum-index)*164)+'px;right:'+(-(agentNum-index)*60)+'px'">
			            </div>
			            <div v-if="item.type==3 && (index+1)!=dataDiagramLists.length" class="chart_hline chart_hline2"
			                :style=" index==0?('width:'+((dataDiagramLists.length)*60)+'px;left:'+(-(dataDiagramLists.length)*60)+'px'):('width:'+((index+1)*60)+'px;left:'+(-(index+1)*60)+'px')"></div>
			            <div v-if="item.type==3 && (index+1)!=dataDiagramLists.length" class="chart_vline chart_vline3"
			                :style="'height:'+((index)*163)+'px;left:'+(-(index+1)*60)+'px'"></div>
			            <!--收益-->
                        <div v-if="item.type!=3" class="chart_Profit" :style="'right:'+(-(agentNum-index)*60)+'px;top:'+((agentNum-index)*160/2)+'px'">
			                <div>{{item.percentage*100}}%</div>
			                <div>{{item.profitMoney}}</div>
			            </div>
			            <div v-if="item.type==3 && enterNum>1" class="chart_Profit chart_Profit2" :style="'left:'+(-(index+1)*60)+'px'">
			                <div>{{item.percentage*100}}%</div>
			                <div>{{item.profitMoney}}</div>
			            </div>
			        </div>
			    </template>
			</div>
		</el-dialog>
	</div>
</template>
<script>
    import tool from "../../api/tools.js"
	import QRCode from "qrcodejs2";
    export default {
        data() {
            return {
				showRecharge: false,
				rechargeType: '1', //充值方式
                renewalDate: '',
				fissionFlag: false,
                upGradeFlag: false, // 升级框的显示标志
                infoFlag: false, // 提示框的显示标志
                addFlag: false, // 添加框的显示标志
                renewalFlag: false, // 续期框的显示标志
                versionFlag: 0,
                renewalId: 1, //续期的时间
                openNumber: 0, // 开通人数
                companyId: '',
                versionList: '', // 版本列表
                openBusinessInfo: {}, // 企业的详细信息,
                bussinessCreateInfo: '',
                extendList: ['商城在线支付', '角色管理', '独立小程序'], // 扩展功能列表
                promotionList: ['BOSS雷达', 'AI雷达', '获客红包', '获客文章'], // 营销推广列表
                indateList: [{
                    id: 0,
                    name: '1年'
                }, {
                    id: 1,
                    name: '2年'
                }, {
                    id: 2,
                    name: '3年'
                }, {
                    id: 3,
                    name: '4年'
                }, {
                    id: 4,
                    name: '5年'
                }], // 版本有效期列表
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
				loading: false,
				rechargeId: 5, //充值金额选择 0/200,1/300,2/500;
                permission: '', // 权益
                servicePreceptInfoList: '', // 版本套餐
                openPeople: '', // 开通人数
                marketPrice: 0, // 市场价格
                earning: 0, // 预估收益
                agencyPrice: 0, // 代理价格
                openPrice: '', // 开通价格
                versionIndex: '', //版本下标
                timeIndex: 0, //有效期下标
                agentPreceptId:'',//代理商版本
				haveMoney: '',
				consumeMoney: '',
				agentProfit: '',// 分佣百分比
				totalMoney: '',
				imgHead:BaseUrl.ImgHead,
				mineId: '',// 自己的id
				temporaryPeople: '',
                dataDiagramLists:[],//裂变图数据
                enterNum:0,//裂变图企业个数
                agentNum:0,//裂变图代理商个数
				usePeopleNumber: '',// 使用版本的人数
            };
        },

        created() {
            if (this.$route.query.companyId) {
                this.companyId = this.$route.query.companyId
            }
			if(tool.getStore('member_info')){
				this.mineId = tool.getStore('member_info').id
			}
        },
		// computed:{
		// 	openNumber(){
		// 		if(servicePreceptInfoList){
		// 			return servicePreceptInfoList[versionIndex].people==-1 ? '不限':servicePreceptInfoList[versionIndex].people
		// 		} else {
		// 			return 0
		// 		}
		// 	},
		// },
        mounted() {
            if(tool.getStore('member_info')){
                this.agentPreceptId = tool.getStore('member_info').agentPreceptId;
            }
            this.getOpenBusiness();
			this.selectAgentProfit();
			this.getAgentInfo();
        },
        methods: {
            //获取裂变图
            selectOpenTeamChart(){
                const that = this
				let data = {}
				data.teamId = that.companyId;
				data.totalMoney = 0;
				that.postData({
					url: ApiUrl.selectOpenTeamChart,
					data: data,
					success: function(res){
						if(res.status == 0){
                            that.dataDiagramLists = res.data;
                            that.dataDiagramLists.push({
                                lineString: that.bussinessCreateInfo.type == 1 ? '直推' : '转介绍',
                                name: that.openBusinessInfo.userName,
                                profitMoney: that.openBusinessInfo.myProfit/(that.agentProfit/100),
                                percentage: 0.8,
                                type:3,
                                typeName: that.bussinessCreateInfo.type == 1 ? '直推' : '转介绍',
                            });
                            for(var i in that.dataDiagramLists){
                                if(that.dataDiagramLists[i].type==3){//企业
                                    that.enterNum++;
                                }else{
                                     that.agentNum++;
                                }
                                that.dataDiagramLists[i].profitMoney = that.setMoneyData(that.dataDiagramLists[
                                    i].profitMoney);
                            }
						}
					}
				})
            },
            //设置钱
            setMoneyData(money) {
                if (money == null || money == 0) {
                    return 0+ '元';
                } else {
                    return (money)+'元';
                }
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
				// this.upGradeFlag = false;
				// this.addFlag = false;
				// this.renewalFlag = false;
				// setTimeout(() => {this.showRecharge = true},1000)
				this.showRecharge = true
				this.rechargeType = '1',
				this.wxRecharge()
			},
			  //选择充值套餐
			  checkRecharge(datas) {
			    this.rechargeId = datas;
				this.wxRecharge()
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
			},
			// 升级成功，我知道了
			roger(){
				this.infoFlag = false
				this.getOpenBusiness();
			},
			// 查询开通这个企业的获利百分比
			selectAgentProfit(){
			  const that = this
			  let data = {
				  teamId: that.companyId
			  }
			  that.postData({
				  url: ApiUrl.selectAgentProfit,
				  data: data,
				  success: function(res){
					  if(res.status == 0){
						  that.agentProfit = res.data
						  // console.log(res.data)
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
							that.haveMoney = res.data.profitMoney
							that.consumeMoney = res.data.consumeMoney
                            that.selectOpenTeamChart();
						}
					}
				})
			},
            // 获取开通企业的详细信息
            getOpenBusiness() {
                const that = this;
                let data = {
                    teamId: that.companyId
                }
                that.postData({
                    url: ApiUrl.getOpenBusiness,
                    data: data,
                    success: function(res) {
                        if (res.status == 0) {
                            that.openBusinessInfo = res.data
                            that.bussinessCreateInfo = res.data.teamVersionIfo
							that.openNumber = res.data.teamVersionIfo.peopleNumber
							that.temporaryPeople = res.data.teamVersionIfo.peopleNumber
							that.permission = res.data.permissions
							that.usePeopleNumber = res.data.usePeopleNumber
                            that.getServicePreceptInfo();
                        }
                    }
                })
            },
            // 获取版本套餐详情
            getServicePreceptInfo() {
                const that = this
                that.postData({
                    url: ApiUrl.getServicePreceptInfo,
                    success: function(res) {
                        if (res.status == 0) {
                            that.$nextTick(() => {
                                let arr = res.data,
                                    newarr = [];
                                for (var i in arr) {
                                    if (arr[i].id > that.openBusinessInfo.versionId) {
                                        newarr.push(arr[i]);
                                    }
                                }
                                that.servicePreceptInfoList = newarr;
								// that.versionIndex = newarr[0].id;
                                that.openPeople = res.data[0].people
                                // that.permission = res.data[0].permission;
                                for (var i in res.data) {
                                    if (res.data[i].type == that.openBusinessInfo.versionId){
                                        that.nowService =  res.data[i];
                                    }
                                }
                            })
                        }
                    }
                })
            },
            // 选择版本
            select(option) {
				this.versionIndex = option
                this.getUpgradeServiceMoney();
            },
            selectTime(option) {
                this.time = option;
                this.getUpgradeServiceMoney();
            },
            // 升级
            upgradeBusiness(type) { // 1-升级版本 2-增加人数 3-续期
                const that = this
                let data = {
                    year: that.timeIndex+1, //选择的时间
                    teamId: that.companyId, // 给哪个企业开通
                    permissions: that.permission, // 权限
                    money: that.agencyPrice, // 金额
                    totalMoney: that.marketPrice, //总金额
                    timeId:that.timeIndex+1,
					type: 3,
                }
                if (type == 1) {
                    data.type=0;
                    data.servicePreceptId=that.servicePreceptInfoList[that.versionIndex].id;
                    data.peopleNumber=that.servicePreceptInfoList[that.versionIndex].people; // 选择的版本
                }
                if (type == 2) {
                    data.type=2;
                    data.peopleNumber = that.openNumber;
                }
                if (type == 3) {
                    data.type=1;
                    data.peopleNumber = that.openBusinessInfo.applyVersionNumber;
                }
                that.postData({
                    url: ApiUrl.openVersionByBalance,
                    data: JSON.stringify(data),
                    type: 'post',
                    success: function(res) {
                        if (res.status == 0) {
                            that.infoFlag = true;
                            that.upGradeFlag=false;
                            that.addFlag=false;
                            that.renewalFlag=false;
                        } else {
                            that.$message.error(res.message);
                        }
                    }
                })
            },
            // 显示/隐藏 对话框
            showDialog(num) {
                if (num === 1) {
                    this.upGradeFlag = true;
                } else if (num === 2) {
                    this.addFlag = true;
                    this.getUpgradeServiceMoney();
                } else if (num === 3) {
                    this.fissionFlag = true;
                } else if (num === 4) {
                    this.upGradeFlag = this.infoFlag = false;
                } else if (num === 5) {
                    this.renewalFlag = true;
                }
            },
			changePeople(){
				this.getUpgradeServiceMoney();
			},
            //获取升级费用
            getUpgradeServiceMoney(){
                var upMoney = 0, agentProfit = 0, agentMoney=0;
                // let price = this.servicePreceptInfoList[this.versionIndex].servicePreceptTimeList[this.timeIndex].price;
				let price = this.nowService.servicePreceptTimeList[this.timeIndex].price;
                if(this.agentPreceptId==1){
                  if(this.upGradeFlag){
					price = this.servicePreceptInfoList[this.versionIndex].servicePreceptTimeList[this.timeIndex].price;
                    agentProfit = price * 0.8;
                    agentMoney = price * 0.2;
                    upMoney = price;
                  } else if (this.addFlag) {
                    agentProfit = 360 * this.openNumber * 0.8;
                    agentMoney = 360 * this.openNumber * 0.2;
                    upMoney = 360 * this.openNumber;
                  } else {
                    let price = this.nowService.servicePreceptTimeList[this.timeIndex].price;
                    agentProfit = price * 0.8*(this.timeIndex+1);
                    agentMoney = price * 0.2*(this.timeIndex+1);
                    upMoney = price*(this.timeIndex+1);
                  }
                }else{
                  if(this.upGradeFlag){
                    agentProfit = price * 0.7;
                    agentMoney = price * 0.3;
                    upMoney = price;
                  } else if (this.addFlag) {
                    agentProfit = 360 * this.openNumber * 0.7;
                    agentMoney = 360 * this.openNumber * 0.3;
                    upMoney = 360 * this.openNumber;
                  } else {
                    // let price = this.nowService.servicePreceptTimeList[this.timeIndex].price;
                    agentProfit = price * 0.7*(this.timeIndex+1);
                    agentMoney = price * 0.3*(this.timeIndex+1);
                    upMoney = price*(this.timeIndex+1);
                  }
                }
                this.marketPrice = parseFloat(upMoney).toFixed(2);
                // this.agencyPrice = parseFloat(agentMoney).toFixed(2);
                // this.earning = parseFloat(agentProfit).toFixed(2);
				this.earning = parseFloat(this.marketPrice * this.agentProfit).toFixed(2);
				this.agencyPrice = parseFloat(this.marketPrice - this.earning).toFixed(2);
				// console.log(this.marketPrice,this.earning)
            },
        }
    };
</script>
<style scoped>
    p {
        margin: 0;
        padding: 0;
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
        height: 700px;
    }

    .el-form-item {
        margin: 0;
    }

    .el-form-item__label {
        font-size: 16px;
    }

    .checkDraw {
        display: block;
        width: 88px;
        height: 26px;
        border: 1px solid rgba(116, 90, 242, 1);
        border-radius: 5px;
        font-size: 12px;
        line-height: 24px;
        text-align: center;
        cursor: pointer;
    }

    .equity {
        width: 398px;
        height: 189px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(228, 230, 235, 1);
        box-shadow: 0px 0px 16px 0px rgba(213, 228, 237, 0.38);
        border-radius: 5px;
        padding: 20px;
    }

    .equity .el-form-item__label {
        font-size: 14px !important;
    }

    .gcs-checkbox {
        display: none;
    }

    .gcs-checkbox+label {
        background-color: white;
        border-radius: 3px;
        border: 1px solid #292a36;
        width: 17px;
        height: 17px;
        display: inline-block;
        text-align: center;
        vertical-align: middle;
        line-height: 15px;
    }

    .gcs-checkbox+label:hover {
        cursor: pointer;
    }

    .gcs-checkbox:checked+label:after {
        content: "\2713";
        font-weight: 700;
        color: black;
    }

    label {
        margin-bottom: 0.1rem !important;
    }

    .ml58 {
        margin-left: 58px;
    }

    .user-equity {
        display: flex;
        flex-wrap: wrap;
    }

    .pay {
        width: 327px;
        height: 130px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(228, 230, 235, 1);
        box-shadow: 0px 0px 16px 0px rgba(213, 228, 237, 0.38);
        border-radius: 5px;
    }

    .small_btn {
        display: block;
        width: 46px;
        height: 26px;
        line-height: 24px;
        border: 1px solid rgba(116, 90, 242, 1);
        border-radius: 5px;
        cursor: pointer;
    }

    .upgrade_1 {
        display: flex;
        align-items: center;
        font-size: 16px;
    }

    .upgrade_2 {
        display: flex;
        justify-content: flex-end;
    }

    .versions {
        display: flex;
    }

    .version {
        display: block;
        width: 91px;
        height: 40px;
        line-height: 40px;
        border: 1px solid rgba(228, 230, 235, 1);
        border-radius: 5px;
        color: #919398;
        cursor: pointer;
    }

    .active-version {
        border: 1px solid rgba(116, 90, 242, 1);
        color: #745af2;
    }

    .go-up {
        width: 150px;
        height: 38px;
        background: rgba(116, 90, 242, 1);
        border-radius: 5px;
        line-height: 38px;
        color: #fff;
        cursor: pointer;
    }

    .info-contant {
        line-height: 150px;
    }

    .location-icon {
        display: inline-block;
        width: 11px;
        height: 14px;
        background-image: url(../../../static/img/location.png);
    }
	.pay_ewm{
		margin-left: 75px;
	}
	.vspan{
		display: inline-block;
		width: 90px;
		height: 40px;
		text-align: center;
		line-height: 40px;
		border: 1px solid #E4E6EB;
		border-radius: 5px;
	}
	.versioned span:not(:first-child){
		margin-left: 10px;
	}
    /*裂变tu*/
	.chart_box{
	    color:#fff;
	    width:214px;
	    height: 90px;
	    background: #745AF2;
	    display:inline-block;
	    border-radius: 5px;
	    position:relative;
	}
	.char_icon{
	    width:15px;
	    height:15px;
	    display:inline-block;
	    background: url(../../../static/img/chart_botton.png);
	}
	.chart_box_yellow{
	    background: #FFB22B;
	}
	.chart_box_black{
	    background: #343542;
	}
	.chart_box_gray{
	    background: #ABB5C1;
	}
	.chart_hline{
	    position:absolute;
	    width: 60px;
	    border-top: 2px solid #745AF2;
	    right: -60px;
	    top: 45px;
	}
	.chart_vline{
	    position:absolute;
	    width: 1px;
	    height: 60px;
	    border-left: 2px solid #745AF2;
	    right: -60px;
	    top: 45px;
	}
	.chart_vline2{
	    top: 45px;
	}
	.chart_hline2{
	    left: -60px;
	    border-color: #ABB5C1;
	}
	.chart_vline3{
	    left: -60px;
	    border-color: #ABB5C1;
        top:inherit;
        bottom:50px;
	}
	.chart_Profit{
	   background: #fff;
	   color: #745AF2;
	   position: absolute;
	   z-index: 1;
	}
	.chart_Profit2{
	    color: #292A36;
	}
	.chart_arr::after{
	    content: '';
	    position: absolute;
	    background: url(../../../static/img/chart_left.png);
	    width:15px;
	    height:15px;
	    right: -12px;
	    bottom: 37px;
	}
	.chart_arr3::after{
	    background: url(../../../static/img/chart_right.png);
	    left: -14px;
	    bottom: 37px;
	}
</style>
