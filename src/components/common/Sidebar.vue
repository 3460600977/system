<template>
  <div class="left-sidebar">
    <div class="sidebar-header">
		<img src="../../../static/img/logo.png" width="42" height="42" alt="">
		<p class="keke">客客代理商后台</p>
	</div>
    <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
      <template v-for="(item,index) in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
              <i :class="subItem.icon"></i>
              {{subItem.title}}
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="index">
            <i :class="item.icon"></i>
            <span class="menu-text">{{item.title}}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
import tool from "../../api/tools.js";
import "font-awesome/css/font-awesome.css";
export default {
  data() {
    return {
      items: '',
      teamId: "",
      showAdd: false //添加客户弹框
    };
  },
	created() {
		this.items = this.$store.state.menuData
	},
  components: {},
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  mounted() {
	  if(localStorage.member_info && this.items.length > 3){
	  	let obj = JSON.parse(localStorage.member_info);
	  	if(obj.agentPreceptId==2 || !obj.agentPreceptId){//二级代理
	  		// this.items.splice(2,1)
			this.$store.commit('selectSidebarList'); 
	  	}
	  }	 
  },
  methods: {
    hideAdd() {
      this.showAdd = false;
    }
  }
};
</script>

<style scoped>
.left-sidebar {
  position: fixed;
  width:200px;
  height:100%;
  top: 0px;
  z-index: 20;
  background: #343542;
  -webkit-box-shadow: 1px 0px 20px rgba(0, 0, 0, 0.08);
  box-shadow: 1px 0px 20px rgba(0, 0, 0, 0.08);
}
.sidebar-header {
  height: 60px;
  background: #745af2;
  background-size: 100% 100%;
}
.sidebar-tit {
  color: #a0a7be;
  display: inline-block;
  border: 1px solid #a0a7be;
  margin-top: 5px;
  padding: 0px 7px;
  border-radius: 3px;
  font-size: 12px;
}
.menu-text {
  width: 60px;
  display: inline-block;
  text-align: left;
  font-weight: bold;
  color: #95959a;
}
.add-btn {
  margin: 27px 18px 10px;
  background: #26c6da;
  color: #fff;
  display: block;
  padding: 10px 15px;
  height: 40px;
}
.el-menu-item:focus,
.el-menu-item:hover {
  background: #292a36;
}
.el-menu-item.is-active .menu-text {
  color: #fff !important;
}
.fa {
  margin-right: 10px;
  font-size: 20px;
  width: 20px;
}
.fa-users,
.fa-th-large,
.fa-university,
.fa-area-chart {
  font-size: 16px;
}
.el-menu-item.is-active .fa-desktop,
.el-menu-item:hover .fa-desktop {
  color: #d81e06;
}
.el-menu-item.is-active .fa-university,
.el-menu-item:hover .fa-university {
  color: #fc4b6c;
}
.el-menu-item.is-active .fa-users,
.el-menu-item:hover .fa-users {
  color: #ffb22b;
}
.el-menu-item.is-active .fa-area-chart,
.el-menu-item:hover .fa-area-chart {
  color: #18c5db;
}

.fa-work{
	background: url(../../../static/img/1.1.png);
	height: 20px;
}
.fa-enterprise {
    background: url(../../../static/img/enterprise.png);
    height: 20px;
}

.fa-agent {
    background: url(../../../static/img/agent_icon.png);
    height: 20px;
}
.fa-finance{
	background: url(../../../static/img/4.4.png);
	height: 20px;
}

.fixed-userinfo {
  position: fixed;
  padding: 10px 0;
  bottom: 0;
  left: 0;
  width: 250px;
  cursor: pointer;
}
.sidebar-header{
	padding-left: 20px;
	display: flex;
	align-items: center;
}
.keke{
	width:169px;
	height:18px;
	font-size:18px;
	font-family:Microsoft YaHei;
	font-weight:bold;
	color:rgba(255,255,255,1);
	line-height: 20px;
	margin-bottom: 0;
	margin-left: 5px;
}
.el-menu-vertical-demo{
    padding-top:90px
}
</style>
