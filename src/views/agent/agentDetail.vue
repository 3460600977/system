<template>
  <div class="page-wrapper">
    <div class="agent-main bgf">
      <div class="agent pd2">
        <div class="agent-avter">
          <img src="../../../static/img/head.png" width="85" height="85" alt />
          <div class="ml2 mr2">
            <p style="line-height: 42px;">
              {{agentDetail.name ? agentDetail.name : ''}}
              <span class="tag">二级</span>
            </p>
            <p style="line-height: 42px;">{{agentDetail.phone ? agentDetail.phone : ''}}</p>
          </div>
        </div>
        <div class="agent-info">
          <div class="first-line">
            <p class="f-child">代理ID: {{agentDetail.id}}</p>
            <p class="s-child" style="width: 600px;">所在地区：{{agentDetail.region}}</p>
          </div>
          <div class="second-line">
            <p class="f-child">加入时间: {{agentDetail.passTime/1000 | sortTimeYYYYMDHM}}</p>
            <p class="s-child">推荐人ID: {{agentDetail.parentUserId ? agentDetail.parentUserId : '无'}}</p>
            <p class="t-child">创建的企业：{{agentDetail.teamName ? agentDetail.teamName : '无'}}</p>
          </div>
        </div>
      </div>
      <div class="height"></div>
      <div class="data-info">
        <div class="w-left-header bgf pdlr2">
          <p class="font18">数据统计表</p>
          <div style="display: flex;">
          	<p class="linkBtns">
          		<span :class="{'linkBtn': true,'active-btn': btnFlag === -1 }" @click="select(-1)">全部</span>
          		<span :class="{'linkBtn': true,'active-btn': btnFlag === 15 }" @click="select(15)">近15天</span>
          		<span :class="{'linkBtn': true,'active-btn': btnFlag === 30 }" @click="select(30)">近30天</span>
          		<span :class="{'linkBtn': true,'active-btn': btnFlag === -2 }" @click="select(-2)">自定义</span>
          	</p>
          	<div v-if="btnFlag === -2" class="right disib mt1">
          		<el-date-picker
          		  type="date"
          		  v-model="startDate"
          		  placeholder="选择日期"
          		  @change="selectByDate()"
          		  format="yyyy 年 MM 月 dd 日">
          		</el-date-picker>至<el-date-picker
          		  type="date"
          		  v-model="endDate"
          		  placeholder="选择日期"
          		  @change="selectByDate()"
          		  format="yyyy 年 MM 月 dd 日">
          		</el-date-picker>
          	</div>
          </div>
        </div>
        <div class="bgf w-left-main">
          <div class="w-l-m">
            <div class="pdtb70" style="border-bottom: 1px dotted #ccc;">
              <p class="center font12">
                <span class="font36" style="font-weight: 600">{{agentDetail.teamNumber ? agentDetail.teamNumber : 0}}</span>家
              </p>
              <p class="center font12">新增企业</p>
            </div>
            <div class="pdtb70">
              <p class="center font14">
              	<span class="font36 fontw5">{{agentDetail.dealNumber ? agentDetail.dealNumber : 0}}</span>家
              </p>
              <p class="center font16 col9">已成交<br><span class="col_main">成交率{{agentDetail.dealProbability ? agentDetail.dealProbability.toFixed(2)*100 : 0}}%</span></p>
            </div>
          </div>
          <div class="w-l-m">
            <div class="pdtb70" style="border-bottom: 1px dotted #ccc;">
              <p class="center font12">
                <span class="font36" style="font-weight: 600">{{agentDetail.directPushTeamNumber ? agentDetail.directPushTeamNumber : 0}}</span>家
              </p>
              <p class="center font12">直推企业</p>
            </div>
            <div class="pdtb70">
              <p class="center font14">
              	<span class="font36 fontw5">{{agentDetail.dealDirectPushNumber ? agentDetail.dealDirectPushNumber : 0}}</span>家
              </p>
              <p class="center font16 col9">直推成交<br><span class="col_main">成交率{{agentDetail.directPushDealProbability ? agentDetail.directPushDealProbability.toFixed(2)*100 : 0}}%</span></p>
            </div>
          </div>
          <div class="w-l-m">
            <div class="pdtb70" style="border-bottom: 1px dotted #ccc;">
              <p class="center font12">
                <span class="font36" style="font-weight: 600">{{agentDetail.introduceTeamNumber ? agentDetail.introduceTeamNumber : 0 }}</span>家
              </p>
              <p class="center font12">转介绍企业</p>
            </div>
            <div class="pdtb70">
              <p class="center font14">
              	<span class="font36 fontw5">{{agentDetail.dealIntroduceNumber}}</span>家
              </p>
              <p class="center font16 col9">转介绍成交<br><span class="col_main">成交率{{agentDetail.introduceDealProbability ? agentDetail.introduceDealProbability.toFixed(2)*100 : 0}}%</span></p>
            </div>
          </div>
			<div class="w-l-m_r">
				<div ref="mycharts" style="width: 400px;height: 340px;left: 80px;"></div>
			</div>
          <div class="w-l-m bdn">
            <div style="border-bottom: 1px dotted #ccc;">
              <div class="pd2">
                <p class="font12 tleft" style="line-height: 40px;color: #919398">代理总收益</p>
                <p class="center font12">
                  <span class="font36" style="font-weight: 600;line-height: 98px;">{{agentDetail.allEarnings ? agentDetail.allEarnings : 0}}</span>元
                </p>
              </div>
            </div>
            <div>
              <div class="pd2">
                <p class="font12 tleft" style="line-height: 40px;color: #919398">我的总收益</p>
                <p class="center font12">
                  <span class="font36" style="font-weight: 600;line-height: 98px;">{{agentDetail.myEarnings ? agentDetail.myEarnings : 0}}</span>元
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="height"></div>
      <div class="contact-info pd2">数据关系图</div>
      <div class="center pb5">
          <div class="chart_box chart_arr">
            <div class="pdt2">我（总代）</div>
            <div>总收益:{{agentDetail.earnings/10000 ? agentDetail.earnings/10000 : 0}}万</div>
            <div class="chart_hline" :style="'width:'+((dataDiagramLists.length)*60)+'px;right:'+(-(dataDiagramLists.length)*60)+'px'"></div>
          </div>
          <template v-for="(item,index) in dataDiagramLists">
              <div>
                  <div class="mt2">{{index==0 ? '招募':(item.type==2 ?'直推':((index+1==dataDiagramLists.length) ? '共裂变'+item.layerNumber+'层':'转介绍'))}}</div>
                  <div class="mb1"><i class="icon char_icon"></i></div>
              </div>
              <div class="chart_box" :class="index==0 ? 'chart_box_yellow chart_arr chart_arr3':(item.type==2 ? 'chart_box_black':'chart_box_gray')">
                <div class="pdt2">
                    <template v-if='index==0'>{{item.agentName}}（二级代理）</template>
                    <template v-else>
                        {{item.type==2 ?'直推':'转介绍'}}企业{{item.number}}家
                    </template>
                </div>
                <div>
                    <template v-if='index==0'>总收益:{{item.profitMoneyOne.money/1000}}万</template>
                    <template v-else>已成交:{{item.dealNumber}}家</template>
                </div>
                <div class="chart_hline" :style="'width:'+((index+1)*60)+'px;right:'+(-(index+1)*60)+'px'"></div>
                <div class="chart_vline" :style="'height:'+((index+1)*168)+'px;right:'+(-(index+1)*60)+'px'"></div>
                <div class="chart_hline chart_hline2"
                :style=" index==0?('width:'+((dataDiagramLists.length)*60)+'px;left:'+(-(dataDiagramLists.length)*60)+'px'):('width:'+((index+1)*60)+'px;left:'+(-(index+1)*60)+'px')"
                ></div>
                <div v-if="index!=0" class="chart_vline chart_vline3"  :style="'height:'+((index)*168)+'px;left:'+(-(index+1)*60)+'px'"></div>
                <!--收益-->
                <div class="chart_Profit" :style="'right:'+(-(index+1)*60)+'px'">
                    <div>{{item.profitMoneyOne.percentage*100}}%</div>
                    <div>{{item.profitMoneyOne.money/10000+'万元'}}</div>
                </div>
                <div v-if="index!=0" class="chart_Profit chart_Profit2" :style="'left:'+(-(index+1)*60)+'px'">
                    <div>{{item.profitMoneyTwo.percentage*100}}%</div>
                    <div>{{item.profitMoneyTwo.money/10000+'万元'}}</div>
                </div>
              </div>
          </template>
      </div>
    </div>
  </div>
</template>

<script>
import tool from '../../api/tools.js'
export default {
  data(){
    return{
		btnFlag: -1,
		companyId: '',	// 代理商id
		agentDetail: '',// 代理商的详细信息
		agentInfo: '',// 代理商的实时状况
        dataDiagramLists:[],//裂变图数据
		startDate: '',
		endDate: ''
	}
  },
	created(){
		if(this.$route.query.companyId){
			this.companyId = this.$route.query.companyId
		}
		this.getAgentDetail();
	},
	methods:{

		// 时间段查询
		select(index){
			this.btnFlag = index;
			if(this.btnFlag != -2){
				this.getAgentDetail()
			}
		},

		drawPie(dMoney,fMoney,earnings){
			let myChart = this.$echarts.init(this.$refs.mycharts);
			myChart.setOption({
				title : {
					text: earnings + '元',
					subtext: '成交收益',
					x:'43%',
					y:'center',
				},
					tooltip: {
				        // trigger: 'item',
				        formatter: "{b}: {c} ({d}%)"
				    },
				    legend: {
				        y: 'bottom',
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
				            radius : [64, 80],
				            label: {
				                normal: {
				                    show: true
				                },
				                emphasis: {
				                    show: true
				                }
				            },
				            data:[
				                {value:dMoney, name:'直推收益',itemStyle: {color: 'rgb(255, 116, 91)'}},
				                {value:fMoney, name:'转介绍收益',itemStyle: {color: 'rgb(255, 178, 43)'}},
				            ]
				        }
				    ]
			});
		},
		// 日期选择
		selectByDate(){
			if(this.startDate && this.endDate){
				this.getAgentDetail(tool.formateDate(this.startDate),tool.formateDate(this.endDate))
			}
		},
		// 获取代理商的详情
		getAgentDetail(start,end){
			const that = this
			let data = {}
			if(start && end){
				data.agentId = that.companyId
				data.startDate = start
				data.endDate = end
			} else {
				data.agentId = that.companyId
			}

			if(that.btnFlag != -1 && that.btnFlag != -2){
				data.days = that.btnFlag
			}
			that.postData({
				url: ApiUrl.getAgentDetail,
				data: data,
				success: function(res){
					if(res.status == 0){
						that.agentDetail = res.data;
                        res.data.dataDiagramLists.splice(0,1);
                        that.dataDiagramLists = res.data.dataDiagramLists;
                        console.log(that.dataDiagramLists)
						let dMoney = res.data.directPushEarnings ? res.data.directPushEarnings : 0
						let fMoney = res.data.introduceEarnings ? res.data.introduceEarnings : 0
						let earnings = res.data.earnings ? res.data.earnings : 0
						that.drawPie(dMoney,fMoney,earnings)
					}
				}
			})
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
.first-line,
.second-line {
  display: flex;
}
.f-child {
  width: 260px;
  margin-left: 20px;
}
.s-child {
  width: 360px;
}
.t-child,
.f-child,
.s-child {
  line-height: 42px;
}
.tag {
  padding: 0 4px;
  font-size: 12px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.w-left-header {
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dotted #ccc;
}
.w-left-main {
  display: flex;
}
.w-l-m {
  flex: 0 0 278px;
  border-right: 1px dotted #ccc;
}
.w-l-m_r {
  flex: 1!important;
  border-right: 1px dotted #ccc;
}
.w-l-m_2:not(:last-child) {
  width: 463px;
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
.pdtb70 {
  padding: 53px 0;
}

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
    bottom: 43px;
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
}
.chart_Profit{
   background: #fff;
   color: #745AF2;
   position: absolute;
   z-index: 1;
   bottom: 85px;
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
