/**
 * [$ description] 工具类
 * @type {[type]}
 * Created by Ms.du on 2018/5/12.
 */
function getCookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
export default{
    install(Vue){
        Vue.prototype.postData = function (params) {
            let self=this;
            $.ajax({
                url: BaseUrl.Api+params.url || '',
                type: params.type || 'GET',
                data: params.data || {},
                dataType:"json",
                beforeSend:function(xhr){
                    if(window.localStorage.token){
                        xhr.setRequestHeader("token",window.localStorage.token);
                    }
                },
                contentType:'application/json;charset=utf-8'
                // success: (res) => {
                //     if(res.status=="-18"){
                //         Toast('登陆已过期，请重新登陆！');
                //         this.$route.router.go({name:'login'});
                //     }else{
                //         params.success && params.success(res);  
                //     }   
                // },
                // fail: (res) => {
                //     Toast({
                //       message: '网络链接失败！',
                //       position: 'bottom',
                //       duration: 3000
                //     });
                //     params.fail && params.fail(res);
                // },
                // error: (res) => {
                //     params.error && params.error(res);
                // },
                // complete: (res) => {
                //   params.complete && params.complete(res);
                // }
            }).then(function (response) {
                    // if (response.status == 0 || response.status == -82 || response.status == -83 || response.status == -88 || 
                    // response.status == -1100) {
                    params.success && params.success(response);  
                    // VueEvent.$message.error(response.message);
            }, function (response) {
                if(response.status==0){
                    VueEvent.$message({
                        message:'哎呀，登录已过期，即将跳转到登录界面，请重新登录',
                        type:'error',
                        onClose:function () {
                            // localStorage.removeItem('member_info');
                            // localStorage.removeItem('storeInfo');
                            // self.$router.push('/login');
                        }
                    });
                }else{
                    VueEvent.$message.error('哎呀，登录已过期，即将跳转到登录界面，请重新登录');
                }
            });
        };
        /** 怕判路由是否是HTTP OR HTTPS链接 */
        Vue.prototype.isUrl = function (str) {
            if(str != ""){
                var reg=/(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
                if(!reg.test(str)){
                    return false;
                }else{
                    return true;
                }
            }
        };

        /** 根据管理员的token获取管理员的信息 */
        Vue.prototype.getAdminByToken = function (callback) {
            var self = this;
            this.postData(ApiUrl.authCeck,{},function(res){
              self.$store.state.adminInfo = res.data;
              localStorage.setItem('adminInfo', JSON.stringify(res.data));
            });
        };

        /** 用户退出登录操作 */
        Vue.prototype.loginOut = function () {
            localStorage.removeItem('token');
            localStorage.removeItem('member_info');
            localStorage.removeItem('storeInfo');
            this.$router.push('/login');
        }
    }
}
