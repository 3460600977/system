<template>
    <div class="page-wrapper">
        <div class="agent pd3 bgf">
            <div class="agent-avter">
                <img src="../../../static/img/head.png" width="85" height="85" alt />
                <div class="ml2 mr2">
                    <p style="line-height: 26px;">
                        <span class="tag">{{openBusinessInfo.teamName}}</span>
                    </p>
                    <p style="line-height: 26px;">创建者：{{openBusinessInfo.userName}}-{{openBusinessInfo.contactNumber}}</p>
                    <p style="line-height: 26px;" v-if="openBusinessInfo.teamAddress"><span class="location-icon mr"></span>{{openBusinessInfo.teamAddress}}</p>
                </div>
            </div>
        </div>
        <div class="height"></div>
        <div class="main bgf pd3 font16">
            <el-form label-width="120px">
                <el-form-item label="联系电话：">
                    <p class="font16">{{openBusinessInfo.contactNumber}}</p>
                </el-form-item>
                <el-form-item label="推荐人ID：">
                    <p class="font16">{{openBusinessInfo.recommendId ? openBusinessInfo.recommendId : '无'}}</p>
                </el-form-item>
                <el-form-item label="提交时间：">
                    <p class="font16">{{openBusinessInfo.createTime/1000 | sortTimeYYYYMDHM}}</p>
                </el-form-item>
                <el-form-item label="开通版本：">
                    <el-select v-model="versionIndex" placeholder="请选择" @change="selectVersion">
                        <el-option :key="index" :label="item.name" :value="index" v-for="(item,index) in servicePreceptInfoList"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开通人数：">
                    <div style="display: flex;">
                        <div class="peoples">
                            <span style="color: #FF745B;">{{openPeople==-1 ? '不限':openPeople}}</span>人
                            <span style="color: #919398;">(已开通{{openBusinessInfo.hasOpenNumber ? openBusinessInfo.hasOpenNumber : 0 }}人）</span>
                        </div>
                        <el-input-number v-if="versionIndex > 0 && openPeople > 0" @change="changePeople" v-model="openPeople"
                            :min="temporaryPeople" label="描述文字"></el-input-number>
                    </div>
                </el-form-item>
                <el-form-item label="版本有效期：">
                    <el-select v-model="timeIndex" placeholder="请选择" @change="selectTime">
                        <el-option :key="index" :label="item.name" :value="index" v-for="(item,index) in indateList"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="市场价格：">
                    <p class="font16">{{openPrice}}元</p>
                </el-form-item>
                <el-form-item label="代理价格：">
                    <p class="font16">{{agencyPrice}}元</p>
                </el-form-item>
                <!-- <el-form-item label="预估收益：">
          <p class="font16">{{openBusinessInfo.earning}}</p>
        </el-form-item> -->
                <el-form-item label="预估收益：">
                    <p class="font16" style="display: flex;align-items: center;">
                        <span>{{earning}}元</span>
                        <span class="font12 ml1 col9">分佣{{agentProfit*100}}%</span>
                        <span class="checkDraw ml1 col_main" @click="showDialog()">查看裂变图</span>
                    </p>
                </el-form-item>
                <el-form-item label="企业权益：">
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
                    <div class="equity_money">
                        <p class="col_main font14" style="margin-top: 10px;">本次开通需扣除账户余额:{{agencyPrice}}元</p>
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
                    <div class="goOpen center" @click="openBusiness">立即开通</div>
                </el-form-item>
            </el-form>
        </div>

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
                        <span v-for="(item,index) in rechargeList" :key="index" :class="rechargeId==item.id ? 'active':''"
                            @click="checkRecharge(item.id)">{{item.consumeMoney}}客豆/{{item.money}}元</span>
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
        <!-- 开通成功的显示 -->
        <el-dialog title="提示" :visible.sync="infoFlag" width="730px">
            <div class="info-contant col2 center font18">开通企业成功，已赚取{{earning}}元，继续加油哦！</div>
            <div class="upgrade_2 mt2">
                <p class="go-up center font16" @click="successOpen">我知道了</p>
            </div>
        </el-dialog>
        <el-dialog title="微信支付" :visible.sync="showPayCode" width="350px">
            <div class="pay_ewm" v-loading="loading" element-loading-text="加载中.." style="margin: 45px;">
                <div id="qrcode" ref="qrcode"></div>
            </div>
            <!-- <div id="qrcode" ref="qrcode" ></div> -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="showPayCode = false">取 消</el-button>
                <el-button type="primary" @click="showPayCode = false">我已支付</el-button>
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
    import QRCode from "qrcodejs2";
    export default {
        data() {
            return {
                value: 1,
                num: 1,
                showPayCode: false, //微信支付显示
                loading: true,
                showRecharge: false, //充值窗口
                rechargeType: "1", //充值方式
                rechargeList: [],
                rechargeId: 5, //充值金额选择 0/200,1/300,2/500;
                orderNumber: "", //预支付订单号
                haveMoney: 0,
                pageId: 1,
                pageSize: 1,
                companyId: '',
                versionId: 1, // 开通的版本
                openPeople: 0, //开通的人数
                time: 0, //版本有效期
                openBusinessInfo: {}, // 开通企业的详细信息
                versionList: '', // 版本列表
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
                extendList: ['商城在线支付', '角色管理', '独立小程序'], // 扩展功能列表
                promotionList: ['BOSS雷达', 'AI雷达', '获客红包', '获客文章'], // 营销推广列表
                servicePreceptInfoList: [], // 版本套餐
                openPrice: 0,
                versionIndex: 0, //版本下标
                timeIndex: 0, //有效期下标
                agentProfit: 0, // 获利百分比
                marketPrice: 0, // 市场价格
                agencyPrice: 0, // 代理价格
                earning: 0, // 预估收益
                permission: '', // 版本权益
                payType: 0, // 支付方式
                consumeMoney: 0, // 消耗性余额
                infoFlag: false,
                totalMoney: '', // 收益性余额充值消费性余额
                temporaryPeople: '',
                fissionFlag: false,
                dataDiagramLists: [], //裂变图数据
                enterNum: 0, //裂变图企业个数
                agentNum: 0, //裂变图代理商个数
                usePeopleNumber: '', // 使用版本的人数
            };
        },
        created() {
            // console.log(this.$route.query)
            if (this.$route.query.companyId) {
                this.companyId = this.$route.query.companyId;
            }
        },
        mounted() {
            // this.selectAgentProfit();
            this.getOpenBusiness();
            this.getServicePreceptInfo();
            this.getAgentInfo();
            this.getRechargeConfig();
        },
        methods: {
            // 选择微信充值
            payRechangeByWx() {
                if (this.rechargeType == 1) {
                    this.loading = true
                    this.wxRecharge()
                }
            },
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
            // 获取代理商信息
            getAgentInfo() {
                let that = this
                that.postData({
                    url: ApiUrl.getAgentInfo,
                    success: function(res) {
                        if (res.status == 0) {
                            that.haveMoney = res.data.profitMoney
                            that.consumeMoney = res.data.consumeMoney
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
            // 打开充值
            showRechargeType() {
                this.showRecharge = true
                this.rechargeType = '1',
                    this.wxRecharge()
            },


            // 选择支付方式
            selectPayType(type) {
                this.payType = type
            },

            // 开通企业
            openBusiness() {
                const that = this
                let data = {
                    servicePreceptId: that.versionIndex + 1, // 选择的版本
                    peopleNumber: that.openPeople, // 开通的人数
                    timeId: that.timeIndex, //选择的时间
                    teamId: that.companyId, // 给哪个企业开通
                    permissions: that.permission, // 权限
                    money: that.agencyPrice, // 金额
                    totalMoney: that.openPrice, //总金额
                    type: 0,
                }
                if (that.payType == 0) {
                    that.postData({
                        url: ApiUrl.openVersionByBalance,
                        data: JSON.stringify(data),
                        type: 'post',
                        success: function(res) {
                            if (res.status == 0) {
                                that.$message({
                                    type: 'success',
                                    message: res.message
                                })
                                that.infoFlag = true
                            } else if (res.status == -4) {
                                that.$message({
                                    type: 'info',
                                    message: res.message
                                })
                            }
                        }
                    })
                } else {
                    that.showPayCode = true
                    that.postData({
                        url: ApiUrl.openVersionByWxPay,
                        data: JSON.stringify(data),
                        type: 'post',
                        success: function(res) {
                            if (res.status == 0) {
                                that.qrCode(res.data)
                            }
                        }
                    })
                }
            },

            changePeople(newValue, oldValue) {
                // console.log(newValue,oldValue)
                this.openPrice += (newValue - oldValue) * 360
                this.agencyPrice += (newValue - oldValue) * 360 * (1 - this.agentProfit)
                this.earning += (newValue - oldValue) * 360 * this.agentProfit
                // this.getServicePreceptInfoByYear();
            },


            // 选择版本
            selectVersion(option) {
                this.getServicePreceptInfoByYear();
            },
            // 选择年限
            selectTime(option) {
                this.getServicePreceptInfoByYear()
            },
            // 根据年限查询价格
            getServicePreceptInfoByYear() {
                const that = this
                let data = {
                    // timeId: this.servicePreceptInfoList[this.versionIndex].servicePreceptTimeList[this.timeIndex].id,
                    teamId: that.companyId,
                    versionId: that.versionIndex + 1,
                    year: that.timeIndex + 1,
                }
                that.postData({
                    url: ApiUrl.getServicePreceptInfoByYear,
                    data: data,
                    success: function(res) {
                        if (res.status == 0) {
                            that.openPrice = res.data.price
                            that.agencyPrice = res.data.agentPrice
                            that.earning = res.data.forecastEarnings
                            that.openPeople = res.data.people
                            that.temporaryPeople = res.data.people
                            that.permission = res.data.permission
                            that.agentProfit = res.data.percentage;
                            that.selectOpenTeamChart();
                        }
                    }
                })
            },

            // 获取开通企业的信息
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
                            that.openBusinessInfo = res.data;
                        }
                    }
                })
            },
            //获取裂变图
            selectOpenTeamChart() {
                const that = this
                let data = {}
                data.teamId = that.companyId;
                data.totalMoney = that.openPrice;
                that.postData({
                    url: ApiUrl.selectOpenTeamChart,
                    data: data,
                    success: function(res) {
                        if (res.status == 0) {
                            that.dataDiagramLists = res.data;
                            that.dataDiagramLists.push({
                                lineString: that.openBusinessInfo.type == 1 ? '直推' : '转介绍',
                                name: that.openBusinessInfo.userName,
                                profitMoney: that.openBusinessInfo.myProfit / (that.agentProfit /
                                    100),
                                percentage: 0.8,
                                type: 3,
                                typeName: that.openBusinessInfo.type == 1 ? '直推' : '转介绍',
                            });
                            for (var i in that.dataDiagramLists) {
                                if (that.dataDiagramLists[i].type == 3) { //企业
                                    that.enterNum++;
                                } else {
                                    that.agentNum++;
                                }
                                that.dataDiagramLists[i].profitMoney = that.setMoneyData(that.dataDiagramLists[
                                    i].profitMoney);
                            }
                            console.log(that.dataDiagramLists)
                        }
                    }
                })
            },
            //设置钱
            setMoneyData(money) {
                if (money == null || money == 0) {
                    return 0;
                } else {
                    return (money)+'元';
                }
            },
            // 获取开通企业的版本列表
            getVersionList() {
                const that = this
                that.postData({
                    url: ApiUrl.getVersionList,
                    success: function(res) {
                        if (res.status == 0) {
                            that.versionList = res.data
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
                                that.servicePreceptInfoList = res.data
                                that.openPeople = res.data[0].people
                                that.permission = res.data[0].permission
                                that.marketPrice = res.data[0].price
                                that.earning = res.data[0].forecastEarnings
                                that.agencyPrice = res.data[0].agentPrice
                                that.getServicePreceptInfoByYear()
                            })
                        }
                    }
                })
            },
            successOpen() {
                this.infoFlag = false
                this.$router.push({
                    path: '/businessdetail',
                    query: {
                        companyId: this.companyId
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

            //选择充值套餐
            checkRecharge(datas) {
                this.rechargeId = datas;
                this.wxRecharge()
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
            },
            showDialog() {
                this.fissionFlag = true;
            }
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
        /* height: 900px; */
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
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(228, 230, 235, 1);
        box-shadow: 0px 0px 16px 0px rgba(213, 228, 237, 0.38);
        border-radius: 5px;
        padding: 20px;
    }

    .small_btn {
        display: block;
        width: 46px;
        height: 26px;
        line-height: 24px;
        border: 1px solid rgba(116, 90, 242, 1);
        opacity: 0.5;
        border-radius: 5px;
    }

    .peoples {
        width: 178px;
        height: 34px;
        line-height: 34px;
        padding-left: 10px;
        border: 1px solid rgba(228, 230, 235, 1);
        border-radius: 5px;
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

    .regular-radio+label {
        -webkit-appearance: none;
        background-color: #fff;
        border: 1px solid #aaa;
        padding: 6px;
        border-radius: 50px;
        display: inline-block;
        position: relative;
    }

    .regular-radio:checked+label:after {
        content: " ";
        width: 6px;
        height: 6px;
        border-radius: 50px;
        position: absolute;
        top: 3px;
        background: #745af2;
        left: 3px;
    }

    .regular-radio:checked+label {
        border: 1px solid #745af2;
    }

    .goOpen {
        width: 150px;
        height: 38px;
        line-height: 38px;
        color: #fff;
        background: rgba(116, 90, 242, 1);
        border-radius: 5px;
        cursor: pointer;
        margin-top: 30px;
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

    .location-icon {
        display: inline-block;
        width: 11px;
        height: 14px;
        background-image: url(../../../static/img/location.png);
    }

    .upgrade_2 {
        display: flex;
        justify-content: flex-end;
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

    .active {
        border: 2px solid #745AF2 !important;
    }

    .pay_ewm {
        margin-left: 75px;
    }

    .payBox_tcbox_2 {
        display: flex;
    }

    /*裂变tu*/
    .chart_box {
        color: #fff;
        width: 214px;
        height: 90px;
        background: #745AF2;
        display: inline-block;
        border-radius: 5px;
        position: relative;
    }

    .char_icon {
        width: 15px;
        height: 15px;
        display: inline-block;
        background: url(../../../static/img/chart_botton.png);
    }

    .chart_box_yellow {
        background: #FFB22B;
    }

    .chart_box_black {
        background: #343542;
    }

    .chart_box_gray {
        background: #ABB5C1;
    }

    .chart_hline {
        position: absolute;
        width: 60px;
        border-top: 2px solid #745AF2;
        right: -60px;
        top: 45px;
    }

    .chart_vline {
        position: absolute;
        width: 1px;
        height: 60px;
        border-left: 2px solid #745AF2;
        right: -60px;
        top: 45px;
    }

    .chart_vline2 {
        top: 45px;
    }

    .chart_hline2 {
        left: -60px;
        border-color: #ABB5C1;
    }

    .chart_vline3 {
        left: -60px;
        border-color: #ABB5C1;
        top: inherit;
        bottom: 50px;
    }

    .chart_Profit {
        background: #fff;
        color: #745AF2;
        position: absolute;
        z-index: 1;
    }

    .chart_Profit2 {
        color: #292A36;
    }

    .chart_arr::after {
        content: '';
        position: absolute;
        background: url(../../../static/img/chart_left.png);
        width: 15px;
        height: 15px;
        right: -12px;
        bottom: 37px;
    }

    .chart_arr3::after {
        background: url(../../../static/img/chart_right.png);
        left: -14px;
        bottom: 37px;
    }
</style>
