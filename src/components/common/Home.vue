<template>
  <div class>
    <v-sidebar></v-sidebar>
    <div class="wrapper-right">
      <div class="wrapper-right-header mb3 bgf">
        <div class="line60 font18 top_header">
          <p style="margin-bottom: 0;"><span>{{routerName1}}</span><span v-if="routerName2">&gt;</span><span v-if="routerName2" class="font12">{{routerName2}}</span></p>
          <ul class="navbar-nav my-lg-0">
              <li class="nav-item dropdown">
                  <a class="dropdown-toggle text-muted text-muted waves-effect waves-dark" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img :src="userHead" class="bdr_half" width="48px" height="48px" />
                  <span class="mr2 font16 ml1">{{username}}</span>
                  <i class="mdi mdi-message middle"></i>
                  </a>
                   <div class="dropdown-menu line25 dropdown-menu-right scale-up" style="margin-top:15px!important;padding: 4px!important;">
                      <a @click="exitLogin" class="dropdown-item" href="#">
                          <i class="flag-icon flag-icon-in"></i>退出
                      </a>
                   </div>
              </li>
          </ul>
        <!--  <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
			<img class="bdrh" :src="userHead" width="48" height="48" alt=""><span class="col3 ml1" style="font-size: 15px;">{{username}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <div class="dropdown-menu dropdown-menu-right scale-up">
               <a @click="" class="dropdown-item" href="#">
                   <i class="flag-icon flag-icon-in"></i>退出
               </a>
            </div>

          </el-dropdown> -->
          <!-- <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="loginOut">退出</el-dropdown-item>
          </el-dropdown-menu> -->
		  <!-- <v-topbar></v-topbar> -->
        </div>
      </div>
      <!-- <transition name="move" mode="out-in">
        <router-view></router-view>
      </transition>-->
      <div class="wrapper-right-main">
        <transition name="move" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import vSidebar from "./Sidebar.vue";
import vTopbar from "./Topbar.vue";
import tool from "../../api/tools.js"
export default {
  components: {
    vSidebar,
    vTopbar
  },
  data() {
    return {
		routerName1: this.$route.name,
		routerName2: '',
		username:'',
		userHead:'',
		imgHead:BaseUrl.ImgHead
    };
  },
  mounted() {
	  this.setName();
    // console.log(this.$route);
  },
  methods:{
	  setName(){
		  if(tool.getStore('member_info')){
			this.username = tool.getStore('member_info').name;
			// console.log(tool.getStore('member_info'))
			this.userHead= this.setHeadImg(tool.getStore('member_info').userHeadImg);
		  }
	  },
       //设置头像
      setHeadImg(head) {
          if(head){
            let str = head.indexOf("qlogo") == -1 ? (this.imgHead + head) : head;
            return str;
          }else{
            return '../../../static/img/head.png';
          }
      },
		exitLogin(){
			const that = this
			that.postData({
				url: ApiUrl.logOut,
				success: function(res){
					if(res.status == 0){
						that.$message({
							type: 'success',
							message: '已退出系统',
						})
						tool.delStore("member_info");
						tool.delStore("token");
						that.$router.push('/login');
					}
				}
			})
		}
	},
  watch: {
    $route: function(obj,oldRouter) {
		this.routerName2 = '';
		let nameArr = obj.name.split('-');
		if(nameArr[1]){
			this.routerName2 = nameArr[1]
		}
		this.routerName1 = nameArr[0];
		if(obj.path == '/openenterprise' || obj.path == '/businessdetail'){
			this.routerName1 = oldRouter.name
			this.routerName2 = obj.name
		}
    }
  }
};
</script>
<style>
.wrapper {
  display: flex;
}
.wrapper-left {
  width: 260px;
}
.wrapper-right {
  margin-left: 200px;
}
.wrapper-right-header {
  width: 100%;
  flex: 0 0 60px;
}
.wrapper-right-main {
  flex: 1;
  overflow: auto;
  /* padding: 20px; */
  padding: 0 30px;
  box-sizing: border-box;
  background: #eef5f9;
}
.top_header {
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
}
.bdr_half{border-radius:50%}
</style>
