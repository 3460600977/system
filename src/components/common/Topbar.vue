<template>
  <header class="topbar">
    <nav class="navbar top-navbar navbar-expand-md navbar-light">
      <div class="navbar-header">
        <a class="navbar-brand" href="/workbench">
          <b>
            <img src="../../../static/img/logo.png" alt="homepage" class="dark-logo" />
            <span class="colf">客客代理商总后台</span>
          </b>
        </a>
      </div>
      <div class="navbar-collapse">
        <ul class="navbar-nav mr-auto mt-md-0">
          <!-- <li class="nav-item">
                        <a class="nav-link sidebartoggler hidden-sm-down text-muted waves-effect waves-dark" href="javascript:void(0)"><i class="ti-menu"></i></a> 
          </li>-->
          <!-- <li class="nav-item hidden-sm-down search-box">
                        <a class="nav-link hidden-sm-down text-muted waves-effect waves-dark" href="javascript:void(0)"><i class="ti-search"></i></a>
                        <form class="app-search">
                            <input type="text" class="form-control" placeholder="Search & enter"> <a class="srh-btn"><i class="ti-close"></i></a> </form>
          </li>-->
        </ul>
        <ul class="navbar-nav my-lg-0">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle text-muted text-muted waves-effect waves-dark"
              href
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img :src="userLogo" class="bdr_half" width="48px" height="48px" />
              <span class="mr2 font16 ml1">{{userName}}</span>
              <i class="mdi mdi-message middle"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-right scale-up">
              <a @click="exitLogin" class="dropdown-item" href="#">
                <i class="flag-icon flag-icon-in"></i>退出
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
<script>
import tool from "../../api/tools.js";
import "../../assets/themify-icons/themify-icons.css";
export default {
  data() {
    return {
      userName: "",
      userLogo: "../../../static/img/head.png"
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  mounted() {
    this.imgHead = BaseUrl.ImgHead;
    this.getMyinfo();
  },
  methods: {
    //获取我的个人信息
    getMyinfo() {
      let obj = tool.getStore("member_info");
      this.userName = obj.adminLoginName;
    },
    //设置头像
    setHeadImg(head) {
      if (head) {
        let str = head.indexOf("qlogo") == -1 ? this.imgHead + head : head;
        return str;
      } else {
        return "../../../static/img/head.png";
      }
    },
    //退出登录
    exitLogin() {
      this.$router.push("/login");
      tool.delStore("member_info");
      tool.delStore("teamId");
    }
  }
};
</script>
<style scoped>
.topbar {
  width: 90%;
}
.navbar-brand {
  margin-right: 100px;
}
.topbar .top-navbar .navbar-nav > .nav-item > .nav-link {
  padding: 0;
  font-size: 19px;
  line-height: 50px;
  color: #ffffff !important;
}
.nav-link:hover {
  text-decoration: none;
}
.search-box .app-search {
  position: absolute;
  margin: 0px;
  display: block;
  z-index: 110;
  width: 100%;
  top: -1px;
  -webkit-box-shadow: 2px 0px 10px rgba(0, 0, 0, 0.2);
  box-shadow: 2px 0px 10px rgba(0, 0, 0, 0.2);
  display: none;
  left: 0px;
}
.search-box .app-search input {
  width: 100%;
  padding: 35px 40px 35px 20px;
  border-radius: 0px;
  font-size: 17px;
  -webkit-transition: 0.5s ease-in;
  -o-transition: 0.5s ease-in;
  transition: 0.5s ease-in;
}
.search-box .app-search .srh-btn {
  position: absolute;
  top: 23px;
  cursor: pointer;
  background: #ffffff;
  width: 15px;
  height: 15px;
  right: 20px;
  font-size: 14px;
}
.bdr_half {
  border-radius: 50%;
}
</style>
