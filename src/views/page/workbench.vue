<template>
	<div class="page-wrapper">
		<div class="w-main">
			<div class="w-left">
				<div class="w-left-content">
					<div class="w-left-header bgf">
						<p class="font18 ml2 left mt2">企业-实时概况</p>
						<div v-if="businessFlag === -2" class="right disib mt1">
							<el-date-picker type="date" v-model="startDate" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" @change="selectByDate()">
							</el-date-picker>至<el-date-picker type="date" v-model="endDate" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
							 @change="selectByDate()">
							</el-date-picker>
						</div>
						<p class="linkBtns right">
							<span :class="{'linkBtn': true,'active-btn': businessFlag === -1 }" @click="select(-1)">全部</span>
							<span :class="{'linkBtn': true,'active-btn': businessFlag === 15 }" @click="select(15)">近15天</span>
							<span :class="{'linkBtn': true,'active-btn': businessFlag === 30 }" @click="select(30)">近30天</span>
							<span :class="{'linkBtn': true,'active-btn': businessFlag === -2 }" @click="select(-2)">自定义</span>
						</p>
					</div>
					<div class="bgf w-left-main">
						<div class="w-l-m">
							<div class="pdtb70" style="border-bottom: 1px dotted #ccc;">
								<p class="center font14">
									<span class="font36 fontw5">{{enterpriseInfo.teamNumber ? enterpriseInfo.teamNumber : 0 }}</span>家
								</p>
								<p class="center font16 col9">新增企业</p>
							</div>
							<div class="pdtb70">
								<p class="center font14">
									<span class="font36 fontw5">{{enterpriseInfo.dealNumber ? enterpriseInfo.dealNumber : 0}}</span>家
								</p>
								<p class="center font16 col9">已成交<br><span class="col_main">成交率{{enterpriseInfo.dealProbability ? enterpriseInfo.dealProbability.toFixed(2)*100 : 0}}%</span></p>
							</div>
						</div>
						<div class="w-l-m">
							<div class="pdtb70" style="border-bottom: 1px dotted #ccc;">
								<p class="center font14">
									<span class="font36 fontw5">{{enterpriseInfo.directPushTeamNumber ? enterpriseInfo.directPushTeamNumber : 0}}</span>家
								</p>
								<p class="center font16 col9">直推企业</p>
							</div>
							<div class="pdtb70">
								<p class="center font14">
									<span class="font36 fontw5">{{enterpriseInfo.dealDirectPushNumber ? enterpriseInfo.dealDirectPushNumber : 0}}</span>家
								</p>
								<p class="center font16 col9">直推成交<br><span class="col_main">成交率{{enterpriseInfo.directPushDealProbability ? enterpriseInfo.directPushDealProbability.toFixed(2)*100 : 0}}%</span></p>
							</div>
						</div>
						<div class="w-l-m">
							<div class="pdtb70" style="border-bottom: 1px dotted #ccc;">
								<p class="center font14">
									<span class="font36 fontw5">{{enterpriseInfo.introduceTeamNumber ? enterpriseInfo.introduceTeamNumber : 0}}</span>家
								</p>
								<p class="center font16 col9">转介绍企业</p>
							</div>
							<div class="pdtb70">
								<p class="center font14">
									<span class="font36 fontw5">{{enterpriseInfo.dealIntroduceNumber}}</span>家
								</p>
								<p class="center font16 col9">转介绍成交<br><span class="col_main">成交率{{enterpriseInfo.introduceDealProbability ? enterpriseInfo.introduceDealProbability.toFixed(2)*100 : 0}}%</span></p>
							</div>
						</div>
						<div class="w-l-m-r">
							<div ref="mycharts" style="width: 400px;height: 340px;left: 90px;"></div>
						</div>
					</div>
				</div>
				<div class="height"></div>
				<div class="w-left-content" v-if="userInfo.agentPreceptId == 1">
					<div class="w-left-header bgf">
						<p class="font18 ml2 left mt2">代理商-实时概况</p>
						<div v-if="agentFlag === -2" class="right disib mt1">
							<el-date-picker type="date" v-model="startDate2" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" @change="selectByDate2()">
							</el-date-picker>至<el-date-picker type="date" v-model="endDate2" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
							 @change="selectByDate2()">
							</el-date-picker>
						</div>
						<p class="linkBtns right">
							<span :class="{'linkBtn': true,'active-btn': agentFlag === -1 }" @click="selectAgentTime(1)">全部</span>
							<span :class="{'linkBtn': true,'active-btn': agentFlag === 15 }" @click="selectAgentTime(15)">近15天</span>
							<span :class="{'linkBtn': true,'active-btn': agentFlag === 30 }" @click="selectAgentTime(30)">近30天</span>
							<span :class="{'linkBtn': true,'active-btn': agentFlag === -2 }" @click="selectAgentTime(-2)">自定义</span>
						</p>
					</div>
					<div class="bgf w-left-main">
						<div class="w-l-m_2">
							<div class="pd2">
								<p class="font16 tleft" style="line-height: 40px;color: #919398">新增代理商</p>
								<p class="center font14">
									<span class="font36" style="font-weight: 500;line-height: 80px;">{{agentInfo.newAgentNumber ? agentInfo.newAgentNumber : '0'}}</span>家
								</p>
							</div>
						</div>
						<div class="w-l-m_2">
							<div class="pd2">
								<p class="font16 tleft" style="line-height: 40px;color: #919398">已成交代理商</p>
								<p class="center font14" style="position: relative;">
									<span class="font36" style="font-weight: 500;line-height:80px;">{{agentInfo.dealAgentNumber ? agentInfo.dealAgentNumber : '0'}}</span><span>家</span>
									</br><span class="center font12 col_main">成交率{{agentInfo.agentProbability ? agentInfo.agentProbability.toFixed(2)*100 : 0}}%</span>
								</p>
								<!-- <span class="center font12 col_main">成交率{{agentInfo.agentProbability ? agentInfo.agentProbability : 0}}%</span> -->
							</div>
						</div>
						<div class="w-l-m_2" style="width: 444px;">
							<div class="pd2">
								<p class="font16 tleft col9" style="line-height: 40px;">成交收益</p>
								<p class="center font14">
									<span class="font36" style="font-weight: 500;line-height: 80px;">{{agentInfo.dealAgentAllEarnings ? agentInfo.dealAgentAllEarnings : '0'}}</span>元
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="height"></div>

				<div>
					<div class="audit">
						<div class="tagBtn" @click="selectType(0)">
							<p style="display: flex;flex-direction: column;"><span :class="typeFlag === 0 ? 'col_main' : ''">待审核的企业</span><span
								 :class="typeFlag === 0 ? 'outline' : ''"></span></p>
						</div>
						<div class="tagBtn" @click="selectType(1)" v-if="userInfo.agentPreceptId == 1">
							<p style="display: flex;flex-direction: column;"><span :class="typeFlag === 1 ? 'col_main' : ''">待审核的代理商</span><span
								 :class=" typeFlag === 1 ? 'outline' : ''"></span></p>
						</div>
					</div>
					<div v-if="typeFlag === 0" style="width: 100%;">
						<el-table :data="companyData">
							<el-table-column prop="teamId" label="企业ID"></el-table-column>
							<el-table-column label="管理员" width="150">
								<template slot-scope="scope">
									<p>{{scope.row.userName}}</p>
								</template>
							</el-table-column>
							<el-table-column label="管理员电话" width="150">
								<template slot-scope="scope">
									<p>{{scope.row.userPhone}}</p>
								</template>
							</el-table-column>
							<el-table-column label="管理企业" width="200">
								<template slot-scope="scope">
									<p>{{scope.row.teamName}}</p>
								</template>
							</el-table-column>
							<el-table-column label="产品版本">
								<template slot-scope="scope">
									<p>{{versionList[scope.row.type - 1].version}}</p>
								</template>
							</el-table-column>
							<el-table-column label="推荐人ID">
								<template slot-scope="scope">
									<p v-if="scope.row.recommendId==null">无</p>
									<el-popover
										v-else
										placement="bottom"
										width="160"
										trigger="click">
										<p style="margin-bottom: 0;">姓名：{{scope.row.recommendName ? scope.row.recommendName : '无'}}</p>
										<p style="margin-bottom: 0;">电话：{{scope.row.recommendPhone ? scope.row.recommendPhone : '无'}}</p>
										<p slot="reference">{{scope.row.recommendId}}</p>
									</el-popover>
								</template>
							</el-table-column>
							<el-table-column label="注册时间" width="180">
								<template slot-scope="scope">
									<p>{{scope.row.createTime/1000 | sortTimeYYYYMDHM}}</p>
								</template>
							</el-table-column>
							<el-table-column label="版本有效期" width="180">
								<template slot-scope="scope">
									<p>{{scope.row.serviceDate/1000 | sortTimeYYYYMDHM}}</p>
								</template>
							</el-table-column>
							<el-table-column label="操作" width="150">
								<template slot-scope="scope">
									<p class="tright action">
										<a :href="'/openenterprise?companyId='+scope.row.teamId" style="color: #745AF2!important;">开通</a>
										<el-popover placement="right" width="200" height="200" trigger="click">
											<div style="padding: 20px 0;">
												<img src="../../../static/img/minicode.png" width="150" height="150" style="margin-left: 15px;">
												<p class="center col_main mt3">{{scope.row.teamName}}</p>
												<p class="center font16 fontb" style="margin-bottom: 0;">打开微信扫一扫</p>
												<p class="center font16 fontb">立即预览用户名片信息</p>
											</div>
											<a class="ml2 col_main" @click="showCode" slot="reference" href="javascript:;">查看企业</a>
										</el-popover>
									</p>
								</template>
							</el-table-column>
						</el-table>
						<div class="page pt2 bgf">
							<el-pagination background @current-change="pageChange" layout="prev, pager, next" :total="totalPage"></el-pagination>
							<span>共{{totalPage}}页</span>&emsp;
							<span>共{{totalData}}条数据</span>
						</div>
					</div>
					<div v-if="typeFlag == 1 && userInfo.agentPreceptId == 1" style="width: 100%;">
						<el-table :data="companyData">
							<el-table-column prop="id" label="代理ID"></el-table-column>
							<el-table-column label="代理商" width="250">
								<template slot-scope="scope">
									<p>
										<span>{{scope.row.name}}</span>
										<el-tag type="success" size="mini" color="#fff">二级</el-tag>
									</p>
									<p>{{scope.row.phone}}</p>
									<p>{{scope.row.region}}</p>
								</template>
							</el-table-column>
							<el-table-column label="申请等级">
								<template slot-scope="scope">
									<!-- <p>{{scope.row.administrator}}</p> -->
									<p>二级代理商</p>
								</template>
							</el-table-column>
							<el-table-column label="推荐人ID">
								<template slot-scope="scope">
									<p>{{scope.row.parentUserId ? scope.row.parentUserId : '无'}}</p>
								</template>
							</el-table-column>
							<el-table-column label="备注" width="200">
								<template slot-scope="scope">
									<p>{{scope.row.remarks}}</p>
								</template>
							</el-table-column>
							<el-table-column label="状态">
								<template slot-scope="scope">
									<!-- <p v-if="scope.row.applyStatus == 0">无</p> -->
									<p v-if="scope.row.applyStatus == 0">等待审核</p>
									<p v-if="scope.row.applyStatus == 1">已通过</p>
									<p v-if="scope.row.applyStatus == 2">已驳回</p>
								</template>
							</el-table-column>

							<el-table-column label="提交时间" width="180">
								<template slot-scope="scope">
									<p>{{scope.row.createTime/1000 | sortTimeYYYYMDHM}}</p>
								</template>
							</el-table-column>
							<el-table-column label="操作">
								<template slot-scope="scope">
									<p class="tright action">
										<span @click="reject(scope.row.id)" style="color: #000;">驳回</span>
										<a :href="'/openagent?companyId='+scope.row.id" class="ml2" style="color: #745AF2!important;">审核</a>
									</p>
								</template>
							</el-table-column>
						</el-table>
						<div class="page pt2 bgf">
							<el-pagination background @current-change="pageChange" layout="prev, pager, next" :total="totalPage"></el-pagination>
							<span>共{{totalPage}}页</span>&emsp;
							<span>共{{totalData}}条数据</span>
						</div>
					</div>
				</div>
			</div>
			<div class="width"></div>
			<div class="w-right bgf">
				<div>
					<div class="w-right-item">
						<p class="tleft font16 ml3">消耗性余额</p>
						<p class="cbff">
							<span class="icon-money"></span><span class="font28 ml">{{consumeMoney}}</span>元
						</p>
						<a href="/consumAccount" class="col9 font14 mb line30 pointer">账户明细</a>
						<a href="javascript:;" class="alink center" @click="showRechargeType">充值</a>
					</div>
					<div class="w-right-item">
						<p class="tleft font16 ml3">收益余额</p>
						<p class="cbff">
							<span class="icon-money"></span><span class="font28 ml">{{profitMoney}}</span>元
						</p>
						<a href="/incomeAccount" class="col9 font14 mb line30 pointer">账户明细</a>
						<a href="javascript:;" @click="goWithdraw" class="alink center">提现</a>
					</div>
					<div class="w-right-item">
						<p class="font14 center">若有疑问请联系你的专属顾问</p>
						<div style="display: flex;" class="ml3 mt2">

							<img width="50px" height="50px" src="../../../static/img/logo_work.png" />
							<div class="ml1">
								<p style="line-height: 29px;" class="tleft">小悟科技</p>
								<p class="col9" style="line-height:20px;">18398774106</p>
							</div>
						</div>
					</div>
					<div class="w-right-item">
						<img src="../../../static/img/minicode.png" width="128" height="128" alt />
						<p class="font14 ml3 mr3 mt2 col9">微信扫一扫，打开你的小程序随时随地跟进你的客户</p>
					</div>
				</div>
			</div>
		</div>

		<!-- 充值框 -->
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
						<span v-for="(item,index) in rechargeList" :key="index" :class="rechargeId==item.id ? 'active':''" @click="checkRecharge(item.id)">{{item.consumeMoney}}客豆/{{item.money}}元</span>
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
					<span class="pay_money">{{profitMoney}}元</span>
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

		<!-- 查看企业的小程序的二维码 -->
		<div class="message" v-if="showMessage">
			<img src="../../../static/img/minicode.png" width="128" height="128" class="message-img">
			<p class="center mt5 col_main">企业名称</p>
			<p class="center font18 fontb mt2">打开微信扫一扫</p>
			<p class="center font18 fontb">立即预览用户名片信息</p>
		</div>
	</div>
</template>

<script>
	import vLine from "../../components/common/Dotted.vue";
	import tool from "../../api/tools.js"
	import QRCode from "qrcodejs2";
	export default {
		components: {
			vLine
		},
		data() {
			return {
				showMessage: false,
				businessFlag: -1, // 企业的时间段的显示标志
				agentFlag: -1, // 代理商时间段筛选显示标志
				typeFlag: 0, // 企业或代理商的显示标志
				loading: true,
				totalPage: 0, // 总页数
				totalData: 0, //总的数据条数
				// 企业审核
				companyData: [],
				// 版本列表
				versionList: [{
					versionid: 0,
					version: "个人版"
				}, {
					versionid: 1,
					version: "企业版"
				}, {
					versionid: 2,
					version: "集团版"
				}],
				showRecharge: false, //充值窗口
				rechargeType: "1", //充值方式
				rechargeList: [],
				rechargeId: 5, //充值金额选择 0/200,1/300,2/500;
				orderNumber: "", //预支付订单号
				haveMoney: 0,
				pageNo: 1,
				pageSize: 5,
				enterpriseInfo: {}, // 企业的实时状况
				agentInfo: {}, //代理商的实时状况
				userInfo: {}, // 登录的用户信息
				consumeMoney: 0,
				totalMoney: '',
				profitMoney: '',
				phone: 18080983998,
				startDate: '',
				endDate: '',
				startDate2: '',
				endDate2: '',
			};
		},
		created() {
			this.userInfo = tool.getStore('member_info');
			// console.log(this.userInfo.agentPreceptId)
		},
		mounted() {
			this.getEnterpriseList();
			this.getAgentInfo(0);
			this.getAgentInfo(1);
			this.getRechargeConfig();
			this.checkAuth();
			// this.drawPie();
		},
		methods: {

			drawPie(dMoney, fMoney, earnings) {
				let myChart = this.$echarts.init(this.$refs.mycharts);
				myChart.setOption({
						title : {
							text: earnings + '元',
							subtext: '成交收益',
							x:'42%',
							y:'center',
						},
						tooltip: {
							// trigger: 'item',
							formatter: "{b}: {c} ({d}%)"
						},
						legend: {
							y: 'bottom',
							padding: [20,20],
							data:['直推收益','转介绍收益']
						},
						toolbox: {
							show : true,
							feature : {
								mark : {show: true},
							}
						},
						series: [
						   {
								type:'pie',
								radius : [80, 96],
								label: {
									normal: {
										show: true,
										// position: 'center',
										formatter: '{c|{c}元}\n{d|{d}%}\n{hr|}',
										lineStyle: {
											color: 'yellow',
											width: 8,
										},
										rich: {
											a: {
												padding: 10,
											},
											b: {
												fontSize: 12,
												align: 'left',
												// padding: 82,
												// margin: 80,
												lineHeight: 25,
											},
											hr: {
												borderColor: '#000',
												width: '100%',
												borderWidth: 2,
												height: 0,
											},
											d: {
												fontSize: 12,
												align: 'left',
												color: '#000',
												padding: [10,30,10,20],
											},
											c: {
												fontSize: 12,
												align: 'left',
												padding: [0,30,0,20],
											},
										},
									},
									emphasis: {
										show: true
									}
								},
								data:[
									{value:dMoney, name:'直推收益',itemStyle: {color: 'rgb(255, 178, 43)'}},
									{value:fMoney, name:'转介绍收益',itemStyle: {color: 'rgb(255, 116, 91)'}},
								]
							}
						]

						// title: {
						// 	text: '',
						// 	x: 'center',
						// 	y: 'center',
						// 	textStyle: {
						// 		color: '#fff',
						// 		fontSize: 12,
						// 	},
						// },
						// tooltip: {
						// 	show: false,
						// },
						// grid: {
						// 	top: '15%',
						// },
						// legend: {
						// 	orient: 'vertical',
						// 	//x: canvasStyles.legendX,
						// 	y: 'center',
						// 	right: 0,
						// 	itemWidth: 15,
						// 	itemHeight: 10,
						// 	itemGap: 5,
						// 	formatter: function(name) {
						// 		return name.length > 5 ? name.substr(0, 5) + '...' : name;
						// 	},
						// 	textStyle: {
						// 		color: '#fff',
						// 		fontSize: 10,
						// 	},
						// },
						// color: 'green',
						// series: [
						// 	{
						// 		name: '房屋状态',
						// 		type: 'pie',
						// 		radius: ['40%', '48%'],
						// 		center: ['50%', '50%'],
						// 		minAngle: 12,
						// 		avoidLabelOverlap: false,
						// 		label: {
						// 			normal: {
						// 				show: false,
						// 				formatter: '{c|{c}} ({d|{d}%})\n{hr|}\n{a|{a}}',
						// 				lineStyle: {
						// 					color: 'yellow',
						// 					width: 2,
						// 				},
						// 				rich: {
						// 					a: {
						// 						padding: 4,
						// 					},
						// 					b: {
						// 						fontSize: 12,
						// 						align: 'left',
						// 						padding: 82,
						// 						margin: 80,
						// 						lineHeight: 80,
						// 					},
						// 					hr: {
						// 						borderColor: '#4681ec',
						// 						width: '100%',
						// 						borderWidth: 2,
						// 						height: 0,
						// 					},
						// 					d: {
						// 						fontSize: 12,
						// 						align: 'left',
						// 						padding: 4,
						// 					},
						// 					c: {
						// 						fontSize: 12,
						// 						align: 'left',
						// 					},
						// 				},
						// 			},
						// 			emphasis: {
						// 				position: 'left',
						// 				show: true,
						// 				textStyle: {
						// 					fontSize: '14',
						// 					fontWeight: 'bold',
						// 				},
						// 				length: 1,
						// 			},
						// 			},
						// 			data: [{value: 111,name: 'hhh'},{value: 222,name: '1111'}],
						// 		},
						// 	],
						})
					},
						//判断代理商审核状态
						checkAuth() {
							if (tool.getStore('member_info')) {
								let status = tool.getStore('member_info').applyStatus;
								if (status != 1) {
									let msg = '您当前还未开通，请联系你的推荐人进行开通后，即可正常使用了哟。联系电话' + this.phone + '进行开通';
									if (status == 2) { //审核失败
										msg = '审核失败，了解详情可拨打电话：' + this.phone;
									}
									this.$alert(msg, '温馨提示', {
										confirmButtonText: '确定',
										callback: action => {

										}
									});
								}
							}
						},
						showCode() {},
						// 收益性余额充值消费性余额
						rechargePayByprofitMoney() {
							const that = this
							if (that.rechargeType == 1) {
								that.showRecharge = false
							} else {
								if (!that.totalMoney) {
									that.$message({
										type: 'warning',
										message: '请输入充值金额'
									})
								} else {
									this.profitMoneyConversionToConsummerMoney()
								}
							}
						},
						// 去提现
						goWithdraw() {
							const that = this
							that.postData({
								url: ApiUrl.getBankAccount,
								success: function(res) {
									if (res.status == 0) {
										if (res.data) {
											that.$router.push('/withdrawal')
										} else {
											that.$router.push('/setcount')
										}
									}
								}
							})
						},
						// 微信充值
						wxRecharge() {
							const that = this
							let data = {}
							if (that.rechargeId) {
								data.configId = that.rechargeId
							}
							that.postData({
								url: ApiUrl.getQCode,
								data: data,
								success: function(res) {
									if (res.status == 0) {
										that.qrCode(res.data.qcode)
									}
								}
							})
						},
						// 收益性余额充值
						profitMoneyConversionToConsummerMoney() {
							const that = this
							let data = {
								totalMoney: that.totalMoney,
							}
							that.postData({
								url: ApiUrl.profitMoneyConversionToConsummerMoney,
								data: data,
								success: function(res) {
									if (res.status == 0) {
										that.$message({
											type: 'success',
											message: res.message
										})
									} else if (res.status == -1) {
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
						payRechangeByWx() {
							if (this.rechargeType == 1) {
								this.loading = true
								this.wxRecharge()
							}
						},
						// 打开充值
						showRechargeType() {
							this.showRecharge = true
							this.rechargeType = '1',
								this.wxRecharge()
						},
						//选择充值套餐
						checkRecharge(datas) {
							this.rechargeId = datas;
							this.wxRecharge()
						},
						reject(id) {
							const that = this
							let data = {
								applyId: id,
								teamType: 1
							}
							that.postData({
								url: ApiUrl.rejectApply,
								data: JSON.stringify(data),
								type: 'post',
								success: function(res) {
									if (res.status == 0) {
										that.$message({
											type: 'success',
											message: res.message
										})
									} else {
										that.$message({
											type: 'warning',
											message: res.message
										})
									}
								}
							})
						},
						// 企业时间段的筛选
						select(num) {
							this.businessFlag = num;
							if (this.businessFlag != -2) {
								this.startDate = '';
								this.endDate = '';
							}
							if (this.businessFlag != -2 && this.businessFlag != -1) {
								this.getAgentInfo(0, tool.getDay(this.businessFlag), tool.getDay(0))
							} else {
								this.getAgentInfo(0);
							}
						},
						// 代理商时间段筛选
						selectAgentTime(num) {
							this.agentFlag = num;
							if (this.agentFlag != -2) {
								this.startDate2 = '';
								this.endDate2 = '';
							}
							if (this.agentFlag != -2 && this.agentFlag != -1) {
								this.getAgentInfo(1, tool.getDay(this.agentFlag), tool.getDay(0))
							} else {
								this.getAgentInfo(1);
							}
						},
						// 代理商或企业的显示
						selectType(num) {
							this.typeFlag = num;
							this.getEnterpriseList();
						},
						selectByDate() {
							if (this.startDate && this.endDate) {
								this.getAgentInfo(0, tool.formateDate(this.startDate), tool.formateDate(this.endDate))
							}
						},
						selectByDate2() {
							if (this.startDate2 && this.endDate2) {
								this.getAgentInfo(1, tool.formateDate(this.startDate2), tool.formateDate(this.endDate2))
							}
						},
						// 获取代理商的信息
						getAgentInfo(type, startDate, endDate) {
							let that = this
							let data = {}
							if (startDate && endDate) {
								data.startDate = startDate;
								data.endDate = endDate;
							}
							that.postData({
								url: ApiUrl.getAgentInfo,
								data: data,
								success: function(res) {
									if (res.status == 0) {
										if (type == 0) {
											that.enterpriseInfo = res.data;
											let earnings = res.data.earnings;
											let directPushEarnings = res.data.directPushEarnings
											let introduceEarnings = res.data.introduceEarnings
											that.drawPie(directPushEarnings, introduceEarnings, earnings)
										} else {
											that.agentInfo = res.data;
											console.log(that.agentInfo)
										}
										that.haveMoney = res.data.profitMoney;
										that.profitMoney = res.data.profitMoney;
										that.consumeMoney = res.data.consumeMoney
									}
								}
							})
						},
						// 获取待审核企业或代理商
						getEnterpriseList() {
							let that = this
							let data = {
								pageNo: that.pageNo,
								pageSize: that.pageSize,
								type: that.typeFlag,
								state: 0,
							}
							that.postData({
								url: ApiUrl.getEnterpriseList,
								data: data,
								success: function(res) {
									if (res.status == 0) {
										that.companyData = res.data.list
										that.totalPage = res.data.total
										that.totalData = res.data.total
									}
								}
							})
						},
						// 获取待审核的代理商
						// getAgentList(){
						// 	let that = this
						// 	let data = {
						// 		pageNo: that.pageNo,
						// 		pageSize: thta.pageSize,
						// 		type: 0,
						// 	}
						// 	that.postData({
						// 		url: ApiUrl.getAgentList,
						// 		success: function(res){
						// 			if(res.status == 0){
						// 				that.agencyData = res.data
						// 			}
						// 		}
						// 	})
						// },


						// 页数改变
						pageChange(page) {
							// console.log(page);
						},
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

<style>
	* {
		margin: 0;
		padding: 0;
	}

	.w-main p {
		margin-bottom: 0;
	}

	.has-gutter tr>th:nth-last-child(2) .cell {
		text-align: right;
	}

	.action {
		color: #745af2;
		cursor: pointer;
	}

	.w-main {
		width: 100%;
		display: flex;
	}

	.w-left {
		width: 1360px;
	}

	.w-left-header {
		height: 60px;
		border-bottom: 1px dotted #ccc;
		overflow: hidden;
	}

	.w-main .w-left-main {
		width: 1360px;
		display: flex;
	}

	.w-l-m {
		width: 266px;
		border-right: 1px dotted #ccc;
	}

	.w-l-m_2:not(:last-child) {
		width: 443px;
		border-right: 1px dotted #ccc;
	}

	.linkBtn {
		padding: 17px 5px;
		text-align: center;
		cursor: pointer;
	}

	.active-btn {
		border-bottom: 2px solid #745af2;
		color: #745af2;
	}

	.linkBtns {
		width: 300px;
		display: flex;
		justify-content: space-around;
	}

	.tcenter {
		width: 100px;
		text-align: center;
	}

	.w-right {
		width: 268px;
		height: 1052px;
		text-align: center;
	}

	.w-right-item {
		padding: 35px 0;
		border-bottom: 1px solid #eef5f9;
	}

	.alink {
		display: block;
		width: 110px;
		height: 38px;
		line-height: 38px;
		border: 1px solid rgba(228, 230, 235, 1);
		border-radius: 5px;
		margin: 0 auto;
		color: #919398;
	}

	.alink:hover {
		border: 1px solid #ff9800;
		color: #ff9800 !important;
	}

	.tagBtn {
		text-align: center;
		margin-left: 30px;
		cursor: pointer;
		display: flex;
		flex-direction: column;
	}

	.audit {
		display: flex;
		height: 60px;
		line-height: 60px;
		background: #fff;
	}

	.page {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.pdtb70 {
		padding: 50px 0;
	}

	.el-pagination.is-background .el-pager li:not(.disabled).active {
		background: #745af2 !important;
	}

	.el-pagination.is-background .el-pager li:not(.active):hover {
		color: #745af2 !important;
	}

	/* 充值框 */
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

	.outline {
		display: inline-block;
		width: 50px;
		height: 2px;
		background: #745AF2;
		margin: -2px auto;
	}

	.el-table-row {
		padding: 10px 0 !important;
	}

	.icon-money {
		display: inline-block;
		width: 22px;
		height: 22px;
		background-image: url(../../../static/img/goldmoney.png);
	}

	.message {
		width: 250px;
		height: 400px;
		background: #fff;
		box-shadow: 0 0 4px 2px #ccc;
		position: fixed;
		top: 200px;
		left: 50%;
		transform: translate(-50%);
		z-index: 999;
	}

	.message-img {
		margin: 60px 60px 0;
	}

	.payBox_tcbox_2 {
		display: flex;
	}

	.w-active {
		border: 2px solid #745AF2 !important;
	}

	.pay_ewm {
		margin-left: 75px;
	}
</style>
