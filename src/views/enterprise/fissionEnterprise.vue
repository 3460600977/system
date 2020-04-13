<template>
  <div class="page-wrapper">
    <el-form class="bgf pd2 agent-form fission-wrapper" label-width="90px">
      <el-form-item label="注册时间:">
        <el-date-picker
          size="small"
          v-model="startTime"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>至
        <el-date-picker
          size="small"
          v-model="endTime"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="企业:">
        <el-input v-model="business" placeholder="请输入管理员电话或企业名称" size="small"></el-input>
      </el-form-item>
      <el-form-item label="代理商:">
        <el-input v-model="agent" placeholder="请输入代理商名称或ID" size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" @click="searchDirect" class="main_btn">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="pdlr3 line60 font16 bgf mt3 tab_custom">
      <span class="mr3 pointer" :class="typeFlag === 0 ? 'active':''" @click="changeType(0)">全部</span>
      <span class="mr3 pointer" :class="typeFlag === 1 ? 'active':''" @click="changeType(1)">普通企业</span>
      <span class="mr3 pointer" :class="typeFlag === 2 ? 'active':''" @click="changeType(2)">VIP企业</span>
      <span class="pointer" :class="typeFlag === 3 ? 'active':''" @click="changeType(3)">已到期</span>
      <span class="right font14">总计{{total}}家企业</span>
    </div>

    <div class="fission">
      <el-table :data="fissionList">
        <el-table-column prop="teamId" label="企业ID"></el-table-column>
        <el-table-column label="管理员">
          <template slot-scope="scope">
            <p>{{scope.row.userName}}</p>
            <p>{{scope.row.userPhone}}</p>
          </template>
        </el-table-column>
        <el-table-column label="管理企业" width="250">
          <template slot-scope="scope">
            <p>{{scope.row.teamName}}</p>
            <p v-if="scope.row.teamAddress"><span class="location-icon mr"></span>{{scope.row.teamAddress}}</p>
            <p class="version-type center col9" v-if="scope.row.teamVersion == 1">个人版</p>
            <p class="version-type center col9" v-if="scope.row.teamVersion == 2">企业版</p>
            <p class="version-type center col9" v-if="scope.row.teamVersion == 3">集团版</p>
            <p class="version-type center col9" v-if="scope.row.teamVersion == 1 && scope.row.freeVersion == 1 ">免费版</p>
          </template>
        </el-table-column>
        <el-table-column label="代理商">
          <template slot-scope="scope">
            <p>{{scope.row.agentUserName}}</p>
			<p v-if="scope.row.agentId">ID:{{scope.row.agentId}}</p>
          </template>
        </el-table-column>
        <el-table-column label="类型">
          <template slot-scope="scope">
            <p>{{scope.row.teamType == 0 ? "直推" : "转介绍"}}</p>
          </template>
        </el-table-column>
        <el-table-column label="推荐人ID">
          <template slot-scope="scope">
				<p v-if="!scope.row.recommenderId">无</p>
				<el-popover
					v-else
					placement="bottom"
					width="160"
					trigger="hover">
					<p style="margin-bottom: 0;">姓名：{{scope.row.recommenderName ? scope.row.recommenderName : '无'}}</p>
					<p style="margin-bottom: 0;">电话：{{scope.row.recommenderPhone ? scope.row.recommenderPhone : '无'}}</p>
					<p slot="reference">{{scope.row.recommenderId}}</p>
				</el-popover>
          </template>
        </el-table-column>
        <el-table-column label="裂变企业">
          <template slot-scope="scope">
            <p>{{scope.row.fissionTeamNumber}}</p>
          </template>
        </el-table-column>
        <el-table-column label="注册时间" width="160">
			<template slot-scope="scope">
			  <p>{{scope.row.createDate/1000 | sortTimeYYYYMDHM}}</p>
			</template>
		</el-table-column>
        <el-table-column label="版本有效期">
          <template slot-scope="scope">
            <p>{{scope.row.serviceDate/1000 | sortTimeYYYYMDHM}}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <p class="tright action col_main">
              <a v-if="scope.row.applyState == 0 || scope.row.freeVersion == -2" class="ml2 col_main" @click="goToOpenBussiness(scope.row.teamId)" href="javascript:;">开通</a>
              <a v-else class="ml2 col_main" @click="checkBussinessInfo(scope.row.teamId)" href="javascript:;">管理</a>
              <el-popover
                placement="right"
                width="200"
				height="200"
                trigger="hover">
				<div style="padding: 20px 0;">
					<img src="../../../static/img/minicode.png" width="150" height="150" style="margin-left: 15px;">
					<p class="center col_main mt3">{{scope.row.teamName}}</p>
					<p class="center font16 fontb" style="margin-bottom: 0;">打开微信扫一扫</p>
					<p class="center font16 fontb">立即预览用户名片信息</p>
				</div>
              	<a class="ml2 col_main" slot="reference" href="javascript:;">查看企业</a>
              </el-popover>
            </p>
          </template>
        </el-table-column>
      </el-table>
      <div class="page pd bgf">
        <el-pagination
          background
          @current-change="pageChange"
          layout="prev, pager, next"
          :total="pages"
        ></el-pagination>
        <span>共{{pages}}页</span>&emsp;
        <span>共{{total}}条数据</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fissionList: [
        {
          companyId: "05",
          administrator: "云上",
          phoneNumber: 18384580836,
          businessMnagement: "成都华悟科技有限责任公司",
          address: '成都市高新区益州大道503号',
          version: "帝王版",
          type: "直招",
          referrer: "ID10254",
          fission: 45,
          rdate: "2019-4-5 19:25:36",
          indate: "2019-4-5 19:25:36"
        }
      ],
      typeFlag: 0,
	  business: '',// 企业字段
      agent: '',// 代理商字段
      startTime: "", // 起始时间
      endTime: "", // 终止时间
      pageNo: 1, // 页号
      pageSize: 10, 
	  total: 0,// 总的数据
	  pages: 0,// 总的页数
    };
  },
  mounted() {
  	this.getFissionBusiness();
  },
  methods: {
	  // 查询
    searchDirect() {
    	this.pageNo = 1;
    	this.getFissionBusiness();
    },
    // 选择企业类型
    changeType(num) {
      this.typeFlag = num;
      this.agent = '';
      this.startTime = '';
      this.endTime = '';
      this.pageNo = 1;
      this.getFissionBusiness();
    },
    // 页数改变
    pageChange(page) {
      this.pageNo = page
      this.getFissionBusiness();
    },
	
	// 开通企业
	goToOpenBussiness(id){
		this.$router.push({path: '/openenterprise',query: {companyId: id}})
	},
	// 管理企业
	checkBussinessInfo(id){
		this.$router.push({path: '/businessdetail',query: {companyId: id}})
	},
	
	// 获取裂变企业
	getFissionBusiness(){
		let that = this
		let data = {
			pageNo: that.pageNo,
			pageSize: that.pageSize,
		}
		// 企业类型
		if(that.typeFlag != 0){
			data.type = that.typeFlag
		}
		// 查询的企业名称或管理员电话
		if(that.agent){
			data.name = that.agent
		}
		// 企业名称字段
		if(that.business){
			data.phoneOrName = that.business
		}
		// 开始时间
		if(that.startTime){
			data.startDate = this.$moment(that.startTime).format('YYYY-MM-DD')
		}
		// 终止时间
		if(that.endTime){
			data.endDate = this.$moment(that.endTime).format('YYYY-MM-DD')
		}
		that.postData({
			url: ApiUrl.getFissionBusiness,
			data: data,
			success: function(res){
				if(res.status == 0){
					that.fissionList = res.data.list
					that.total = res.data.total
					that.pages = res.data.pages
				}
			}
		})
	},
  }
};
</script>

<style>
.fission p {
  margin: 0;
  padding: 0;
}
.has-gutter tr > th:nth-last-child(2) .cell {
  text-align: right;
}
.action {
  cursor: pointer;
}
.block > .el-input {
  width: 115px !important;
}
.company-type {
  display: flex;
  width: 320px;
  justify-content: space-around;
}
.company-type-item {
  width: 80px;
  line-height: 24px;
  text-align: center;
  display: block;
  border: 1px solid #e8e8e8;
  cursor: pointer;
}
.page {
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background: #745af2 !important;
}
.el-pagination.is-background .el-pager li:not(.active):hover {
  color: #745af2 !important;
}
.form-item > .el-row {
  width: 700px !important;
}

.fission-wrapper .el-input {
  width: 270px !important;
}
.agent-form .el-date-editor {
  width: 150px !important;
}
.fission-wrapper .el-row {
  width: 270px;
}
.el-form-item {
  margin-bottom: 0;
}
.version-type{
	width:54px;
	height:26px;
	border:1px solid rgba(202,206,216,1);
	border-radius:5px;
}
.location-icon{
	display: inline-block;
	width:11px;
	height:14px;
	background-image: url(../../../static/img/location.png);
}
</style>
