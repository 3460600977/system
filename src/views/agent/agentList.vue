<template>
  <div class="page-wrapper">
    <el-form class="bgf pd2 agent-form" label-width="90px">
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
      <el-form-item label="代理商:">
        <el-input v-model="agent" placeholder="请输入代理商名称或ID" size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" @click="searchDirect" class="main_btn">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="pdlr3 line60 font16 bgf mt3 tab_custom">
      <span class="mr3 pointer" :class="typeFlag === 1 ? 'active':''" @click="changeType(1)">已通过</span>
      <span class="mr3 pointer" :class="typeFlag === 0 ? 'active':''" @click="changeType(0)">等待审核</span>
      <span class="pointer" :class="typeFlag === 2 ? 'active':''" @click="changeType(2)">已驳回</span>
      <span class="right font14">总计{{total}}家代理商</span>
    </div>
    <div v-if="typeFlag === 1">
      <el-table :data="agentList" :cell-style="setStyle">
        <el-table-column prop="id" label="代理ID"></el-table-column>
        <el-table-column label="代理商">
          <template slot-scope="scope">
            <p class="mt1"><span>{{scope.row.name}}</span><span class="grade center">二级</span></p>
            <p>{{scope.row.phone}}</p>
            <p>{{scope.row.region}}</p>
          </template>
        </el-table-column>
        <el-table-column label="推荐人ID">
			<template slot-scope="scope">
			  <!-- <p>{{scope.row.parentUserId == 0 ? '无' : scope.row.parentUserId}}</p> -->
			  <p v-if="!scope.row.parentUserId">无</p>
			  <el-popover
			  	v-else
			  	placement="bottom"
			  	width="160"
			  	trigger="hover">
			  	<p style="margin-bottom: 0;">姓名：{{scope.row.recommenderName ? scope.row.recommenderName : '无'}}</p>
			  	<p style="margin-bottom: 0;">电话：{{scope.row.recommenderPhone ? scope.row.recommenderPhone : '无'}}</p>
			  	<p slot="reference">{{scope.row.parentUserId}}</p>
			  </el-popover>
			</template>
			</el-table-column>
        <el-table-column label="企业总数">
          <template slot-scope="scope">
            <p>{{scope.row.directPushTeamNumber  + scope.row.introduceTeamNumber }}</p>
          </template>
        </el-table-column>
        <el-table-column label="已成交企业">
          <template slot-scope="scope">
            <p>{{scope.row.dealDirectPushNumber + scope.row.dealIntroduceNumber }}</p>
          </template>
        </el-table-column>
        <el-table-column label="代理总收益">
          <template slot-scope="scope">
            <p>{{scope.row.allEarnings}}</p>
          </template>
        </el-table-column>
        <el-table-column label="我的收益">
          <template slot-scope="scope">
            <p>{{scope.row.myEarnings}}</p>
          </template>
        </el-table-column>
        <el-table-column label="加入时间">
			<template slot-scope="scope">
				<p>{{scope.row.createTime/1000 | sortTimeYYYYMDHM}}</p>
			</template>
			</el-table-column>
        <el-table-column label="操作" align="right">
          <template slot-scope="scope">
            <p class="tright action">
              <!-- <a :href="'/agentdetail?companyId='+ scope.row.id" class="ml2 col_main">查看详情</a> -->
              <a href="javascript:;" @click="goToBussinessDetail(scope.row.id)" class="ml2 col_main">查看详情</a>
            </p>
          </template>
        </el-table-column>
      </el-table>
      <div class="center pd bgf">
        <el-pagination
          background
          @current-change="pageChange"
          layout="prev, pager, next,total"
          :total="total"
        ></el-pagination>
      </div>
    </div>
	<div v-if="typeFlag === 0">
	  <el-table :data="agentList" :cell-style="setStyle">
	    <el-table-column prop="id" label="代理ID"></el-table-column>
	    <el-table-column label="代理商">
	      <template slot-scope="scope">
	        <p class="mt1"><span>{{scope.row.name}}</span></p>
	        <p>{{scope.row.phone}}</p>
	        <p>{{scope.row.region}}</p>
	      </template>
	    </el-table-column>
		<el-table-column label="申请等级">
			<template slot-scope="scope">
			  <p>{{scope.row.type == 1 ? '总代理' : '二级代理商' }}</p>
			</template>
		</el-table-column>
	    <el-table-column label="推荐人ID">
			<template slot-scope="scope">
			  <p>{{scope.row.parentUserId}}</p>
			</template>
			</el-table-column>
	    <el-table-column label="备注">
	      <template slot-scope="scope">
	        <p>{{scope.row.remarks==null ? '无':scope.row.remarks}}</p>
	      </template>
	    </el-table-column>
	    <el-table-column label="状态">
	      <template slot-scope="scope">
	        <!-- <p>{{scope.row.applyStatus}}</p> -->
	        <p>等待审核</p>
	      </template>
	    </el-table-column>
	    <el-table-column label="提交时间">
	      <template slot-scope="scope">
	        <p>{{scope.row.createTime/1000 | sortTimeYYYYMDHM}}</p>
	      </template>
	    </el-table-column>
	    <el-table-column label="操作" align="right">
	      <template slot-scope="scope">
	        <p class="tright action" v-if="typeFlag == 0">
	          <a href="javascript:;" @click="reject(scope.row.id)" class="ml2 col_main">驳回</a>
	          <a href="javascript:;" @click="goToOpenBussiness(scope.row.id)" class="ml2 col_main">开通</a>
	        </p>
	      </template>
	    </el-table-column>
	  </el-table>
	  <div class="center pd bgf">
	    <el-pagination
	      background
	      @current-change="pageChange"
	      layout="prev, pager, next,total"
	      :total="total"
	    ></el-pagination>
	  </div>
	</div>
	<div v-if="typeFlag === 2">
	  <el-table :data="agentList" :cell-style="setStyle">
	    <el-table-column prop="id" label="代理ID"></el-table-column>
	    <el-table-column label="代理商">
	      <template slot-scope="scope">
	        <p class="mt1"><span>{{scope.row.name}}</span></p>
	        <p>{{scope.row.phone}}</p>
	        <p>{{scope.row.region}}</p>
	      </template>
	    </el-table-column>
		<el-table-column label="申请等级">
			<template slot-scope="scope">
			  <p>二级代理商</p>
			</template>
		</el-table-column>
	    <el-table-column label="推荐人ID">
			<template slot-scope="scope">
			  <p>{{scope.row.parentUserId}}</p>
			</template>
			</el-table-column>
	    <el-table-column label="备注">
	      <template slot-scope="scope">
	        <p>{{scope.row.remarks}}</p>
	      </template>
	    </el-table-column>
	    <el-table-column label="状态">
	      <template slot-scope="scope">
	        <p>已驳回</p>
	      </template>
	    </el-table-column>
	    <el-table-column label="提交时间">
	      <template slot-scope="scope">
	        <p>{{scope.row.createTime/1000 | sortTimeYYYYMDHM}}</p>
	      </template>
	    </el-table-column>
	    <el-table-column label="操作" align="right">
	      <template slot-scope="scope">
	        <p class="tright action" v-if="typeFlag === 1">
	          <!-- <a :href="'/#/openagent?companyId=' + scope.row.id" class="ml2 col_main">管理</a>
	          <a :href="'/#/agentdetail?companyId='+ scope.row.id" class="ml2 col_main">查看详情</a> -->
	        </p>
			<p v-if="typeFlag === 2" class="tright action">---</p>
	      </template>
	    </el-table-column>
	  </el-table>
	  <div class="center pd bgf">
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
      agentList: [],// 代理商列表
      typeFlag: 1,
	  agent: '',// 代理商字段
      startTime: "",
      endTime: "",
		pageNo: 1,
		pageSize: 10,
		total: 0,
    };
  },
	mounted() {
		this.getAgentList();
	},
  methods: {

	// 查询
	searchDirect() {
		this.pageNo = 1;
		this.getAgentList();
	},
	// 选择企业类型
	changeType(num) {
	    this.typeFlag = num;
		console.log(this.typeFlag)
	    this.agent = '';
	    this.startTime = '';
	    this.endTime = '';
	    this.pageNo = 1;
	    this.getAgentList();
	},
	// 页数改变
	    pageChange(page) {
	      this.pageNo = page
	    // this.getAgentList();
	},

	// 获取代理商的列表
	getAgentList(){
		let that = this
		let data = {
			pageNo: that.pageNo,
			pageSize: that.pageSize,
			state: that.typeFlag,
		}
		// // 企业类型
		// if(that.typeFlag){
		// 	data.state = that.typeFlag
		// }
		// 查询的企业名称或管理员电话
		if(that.agent){
			data.name = that.agent
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
			url: ApiUrl.getAgentList,
			data: data,
			success: function(res){
				if(res.status == 0){
					that.agentList = res.data.list
					that.total = res.data.total
				}
			}
		})
	},
	// 驳回
	  reject(id){
		const that = this
		let data = {
			applyId: id,
			teamType: 1
		}
		that.postData({
			url: ApiUrl.rejectApply,
			data: JSON.stringify(data),
			type: 'post',
			success: function(res){
				if(res.status == 0){
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

	  // 查看详情
	  goToBussinessDetail(id){
		  this.$router.push({path: '/agentdetail',query: {companyId: id}})
	  },
	  // 开通企业
	  goToOpenBussiness(id){
		  this.$router.push({path: '/openagent',query: {companyId: id}})
	  },
	  
	  
	// 表单样式设计
    setStyle({ row, column, rowIndex, columnIndex }) {
      if (column.label == "企业总数" || column.label == '我的收益') {
        return "color: #D94F54";
      }
    }
  }
};
</script>
<style scoped>
p{
	margin: 0;
	padding: 0;
}
.el-input {
  width: 270px !important;
}
.agent-form .el-date-editor {
  width: 150px !important;
}
.el-row {
  width: 270px;
}
.el-form-item {
  margin-bottom: 0;
}

.grade{
	display: inline-block;
	width:30px;
	height:20px;
	line-height: 18px;
	border:1px solid rgba(202,206,216,1);
	border-radius:5px;
	font-size: 12px;
	color: #919398;
}
</style>
