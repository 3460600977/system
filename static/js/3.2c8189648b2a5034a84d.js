webpackJsonp([3],{640:function(t,e,l){l(787);var s=l(319)(l(678),l(776),"data-v-29eebb96",null);t.exports=s.exports},648:function(t,e,l){"use strict";var s=l(320),a=l.n(s),i=l(67),o=l.n(i),n={isJSON:function(t){return"object"===(void 0===t?"undefined":o()(t))&&"[object object]"===Object.prototype.toString.call(t).toLowerCase()&&!t.length},stringify:function(t){return void 0===t||"function"==typeof t?t+"":a()(t)},isPhone:function(t){return/^1\d{10}$/.test(t)},deserialize:function(t){if("string"==typeof t)try{return JSON.parse(t)}catch(e){return t||void 0}},isFunction:function(t){return"[object Function]"==={}.toString.call(t)},isArray:function(t){return t instanceof Array},islocalStorage:function(){return!!window.localStorage},isCode:function(t){return/^\d{6}$/.test(t)},setStore:function(t,e){if(this.islocalStorage){if(t&&!this.isJSON(t))window.localStorage.setItem(t,this.stringify(e));else if(t&&this.isJSON(t)&&!e)for(var l in t)this.setStore(l,t[l])}else console.log("浏览器不支持localStorage(setStore)")},getStore:function(t){if(this.islocalStorage){if(!t)throw new Error("getStore参数不存在");return this.deserialize(window.localStorage.getItem(t))}console.log("浏览器不支持localStorage(getStore)")},delStore:function(t){if(this.islocalStorage){if(!t)throw new Error("delStore参数不存在");window.localStorage.removeItem(t)}else console.log("浏览器不支持localStorage(getStore)")},clearStore:function(){this.islocalStorage?window.localStorage.clear():console.log("浏览器不支持localStorage(clearStore)")},getCookie:function(t){var e,l=new RegExp("(^| )"+t+"=([^;]*)(;|$)");return(e=document.cookie.match(l))?unescape(e[2]):null},formateYYYYMMDD:function(t){var e;e=t?new Date(t):new Date;var l=e.getFullYear(),s=e.getMonth()+1,a=e.getDate(),i=e.getHours(),o=e.getMinutes();return 1==o.toString().length&&(o="0"+o),l+"-"+s+"-"+a+" "+i+":"+o},formateDate:function(t){var e;return e=t?new Date(t):new Date,e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate()},formateDateNoDelimiter:function(t){var e=new Date(t),l=e.getFullYear(),s=e.getMonth()+1,a=e.getDate();return 1==s.toString().length&&(s="0"+s),1==a.toString().length&&(a="0"+a),l+s+a}};e.a=n},649:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAAmCAYAAABzhkOMAAAA50lEQVRogWP8DwQMIxQwDbQDBhKwDLQD6AE8F7xhuPbyF5itJc7GsD1BBMweETEP8zg6e0R4HhcY9fxIBaOeH6lgWFR1uKoyQmBYxDyuqowQGBaeJxeMaM/TJc+TmydpDegS8+TmSVqDEZ3sRz0/UsGI9vyQaOHRqrYYEjFPq9piSHieVmBEe56oPD9YW2iUAqJifrC20CgFo8l+uCZrQgAc88M1WRMCIzrZj2jPD4rm7UCVOYMi5geqzBkUnh8oMOr5kQpGPQ8qYWFAS4wVQxEh+YjlbxjkO5+BMYhNqv6BkmccyQuSAEFgYzXUcxg0AAAAAElFTkSuQmCC"},651:function(t,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=l(648);e.default={props:{tit:{type:String,required:!0},nav:{type:String}},data:function(){return{teamId:"",glob:0,count:0}},mounted:function(){this.teamId=s.a.getStore("teamId"),this.getTeamInfo(),window.scrollTo(0,0)},methods:{getTeamInfo:function(){var t=this;t.postData({url:ApiUrl.getTeamInfo+"?teamId="+this.teamId,success:function(e){0==e.status&&(t.glob=e.data.glob,t.count=e.data.totalMoney)}})}}}},652:function(t,e,l){e=t.exports=l(90)(!1),e.push([t.i,'.page-titles[data-v-0358e23a]{background:#fff;margin:0 -30px 30px;padding:15px;-webkit-box-shadow:1px 0 5px rgba(0,0,0,.1);box-shadow:1px 0 5px rgba(0,0,0,.1)}.page-titles h3[data-v-0358e23a]{margin-top:8px}.page-titles .breadcrumb[data-v-0358e23a]{padding:0;background:transparent;font-size:14px}.page-titles .breadcrumb li[data-v-0358e23a]{margin-top:0;margin-bottom:0}.page-titles .breadcrumb .breadcrumb-item+.breadcrumb-item[data-v-0358e23a]:before{content:"\\E649";font-family:themify;color:#a6b7bf;font-size:11px}.page-titles .breadcrumb .breadcrumb-item.active[data-v-0358e23a]{color:#99abb4}',""])},653:function(t,e,l){l(655);var s=l(319)(l(651),l(654),"data-v-0358e23a",null);t.exports=s.exports},654:function(t,e,l){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row page-titles"},[s("div",{staticClass:"col-md-5 col-8 align-self-center"},[s("h3",{staticClass:"mb1"},[t._v(t._s(t.tit))])]),t._v(" "),s("div",{staticClass:"col-md-7 col-4 align-self-center"},[s("div",{staticClass:"d-flex m-t-10 justify-content-end"},[s("div",{staticClass:"d-flex mr2 ml1"},[s("div",{staticClass:"chart-text mr1 mr2"},[s("img",{staticClass:"left mt1 mr1",attrs:{src:l(649)}}),t._v(" "),s("div",{staticClass:"left"},[t._m(0),t._v(" "),s("h4",{staticClass:"mt0 text-info"},[t._v("￥"+t._s(t.glob))])])])]),t._v(" "),s("div",{staticClass:"d-flex mr2 ml1"},[s("div",{staticClass:"chart-text mr1"},[s("img",{staticClass:"left mt1 mr1",attrs:{src:l(649)}}),t._v(" "),s("div",{staticClass:"left"},[t._m(1),t._v(" "),s("h4",{staticClass:"mt0 text-primary"},[t._v("￥"+t._s(t.count))])])])])])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("h6",{staticClass:"mb0 font18"},[l("small",[t._v("月目标")])])},function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("h6",{staticClass:"mb0 font18"},[l("small",[t._v("已成交")])])}]}},655:function(t,e,l){var s=l(652);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);l(318)("111e6cd8",s,!0)},657:function(t,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=l(320),a=l.n(s),i=l(648);e.default={props:{showadd:Boolean,id:Number},data:function(){return{teamid:"",filedList:[],ruleForm:{name:"",phone:"",state:1,customUserLabel:""},rules:{name:[{required:!0,message:"姓名不能为空",trigger:"blur"}],phone:[{required:!0,message:"电话不能为空",trigger:"blur"}],customUserLabel:[{required:!0,message:"标签必须选择哦",trigger:"blur"}]},time:"",labelList:[],visibleLabel:!1,labelTag:!1}},mounted:function(){this.teamId=i.a.getStore("teamId").toString(),this.getFiled(),this.getLabelList()},watch:{id:function(){this.getRelation()}},methods:{getRelation:function(){var t=this;t.postData({url:ApiUrl.getRelationDetail+"?relationShipId="+this.id,success:function(e){if(0==e.status){if(t.ruleForm.name=e.data.customName,t.ruleForm.phone=e.data.customPhone,t.ruleForm.state=e.data.shareState,t.time=e.data.customTime,null!=e.data.customUserLabel&&""!=e.data.customUserLabel){var l=t.labelList,s=JSON.parse(e.data.customUserLabel);t.labelTag=!0;for(var a in l){l[a].lebelIndex=-1;for(var i in l[a].lebelContent)for(var o in s)s[o].lebelContent==l[a].lebelContent[i]&&(l[a].lebelIndex=s[o].lebelIndex)}}else t.labelTag=!1;if(null!=e.data.customInfo&&""!=e.data.customInfo){var n=JSON.parse(e.data.customInfo);for(var a in n)for(var i in t.filedList)n[a].name==t.filedList[i].name&&(t.filedList[i].value=n[a].value)}}}})},getFiled:function(){var t=this;this.teamid&&t.postData({url:ApiUrl.getfield+"?teamId="+this.teamid,success:function(e){0==e.status&&(t.filedList=JSON.parse(e.data.idText))}})},getLabelList:function(){var t=this;t.postData({url:ApiUrl.getLabels,success:function(e){if(0==e.status&&null!=e.data){var l=e.data;for(var s in l)null!=l[s].lebelContent&&""!=l[s].lebelContent&&(l[s].lebelIndex=-1,l[s].lebelContent=l[s].lebelContent.split(",")),"状态"==l[s].lebelName&&(""==l[s].lebelContent&&(l[s].lebelContent=[]),l[s].lebelContent.push("成交"),l[s].lebelContent.push("流失"));t.labelList=l}console.log(t.id),t.id&&t.getRelation()}})},choiceCustomLabel:function(t,e){this.$set(this.labelList[t],"lebelIndex",e)},choiceState:function(t){this.ruleForm.state=t},addLabel:function(){this.visibleLabel=!0},getDot:function(t){return t?"，":""},confirmLabel:function(){this.labelTag=!0,this.ruleForm.customUserLabel="true",this.visibleLabel=!1},inputValue:function(t,e){this.filedList[t].value=e},submitForm:function(t){var e=this,l=this;l.$refs[t].validate(function(t){if(!t)return console.log("error submit!!"),!1;var s=JSON.parse(a()(l.ruleForm)),i=[];for(var o in e.labelList)-1!=e.labelList[o].lebelIndex&&void 0!=e.labelList[o].lebelIndex&&(i.push({lebelId:e.labelList[o].lebelId,lebelIndex:e.labelList[o].lebelIndex,lebelContent:e.labelList[o].lebelContent[e.labelList[o].lebelIndex],lebelColor:e.labelList[o].lebelColor}),"成交"==i[o].lebelContent?s.label=1:"流失"==i[o].lebelContent&&(s.label=-1));if(e.filedList.length>0){var n=[];for(var o in e.filedList)e.filedList[o].value&&n.push({required:e.filedList[o].required,name:e.filedList[o].name,value:e.filedList[o].value});s.customInfo=a()(n)}s.customUserLabel=a()(i),s.teamId=e.teamid,e.time&&(s.time=new Date(e.time).getTime()),e.id||l.postData({url:ApiUrl.addCustomer,type:"post",data:a()(s),success:function(t){0==t.status?(l.$message({message:"添加成功",type:"success"}),l.showadd=!1,l.handleClose(),l.ruleForm.name="",l.ruleForm.phone="",l.ruleForm.state=1,l.ruleForm.customUserLabel="",l.labelTag=!1):l.$message({message:t.message,type:"warning"})}})})},handleClose:function(){this.$emit("watchshow")}}}},658:function(t,e,l){e=t.exports=l(90)(!1),e.push([t.i,"",""])},659:function(t,e,l){l(661);var s=l(319)(l(657),l(660),"data-v-bd3d2202",null);t.exports=s.exports},660:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("el-dialog",{attrs:{title:"添加客户",visible:t.showadd,width:"450px","before-close":t.handleClose,"append-to-body":"true"},on:{"update:visible":function(e){t.showadd=e}}},[l("el-form",{ref:"ruleForm",staticClass:"sett-for mb2",staticStyle:{height:"500px"},attrs:{model:t.ruleForm,rules:t.rules,"label-position":"right","label-width":"93px"}},[l("el-form-item",{attrs:{prop:"name",label:"名字："}},[l("el-input",{staticClass:"login-input",attrs:{placeholder:"输入姓名"},model:{value:t.ruleForm.name,callback:function(e){t.$set(t.ruleForm,"name",e)},expression:"ruleForm.name"}})],1),t._v(" "),l("el-form-item",{attrs:{prop:"phone",label:"电话："}},[l("el-input",{staticClass:"login-input",attrs:{type:"number",placeholder:"输入电话"},model:{value:t.ruleForm.phone,callback:function(e){t.$set(t.ruleForm,"phone",e)},expression:"ruleForm.phone"}})],1),t._v(" "),t._l(t.filedList,function(e,s){return l("el-form-item",{attrs:{label:e.name}},[l("el-input",{staticClass:"login-input",attrs:{placeholder:"输入"+e.name},on:{input:function(e){t.inputValue(s,e)}}})],1)}),t._v(" "),l("el-form-item",{attrs:{prop:"customUserLabel",label:"标签："}},[t.labelTag?[l("div",{on:{click:t.addLabel}},t._l(t.labelList,function(e,s){return-1!=e.lebelIndex?l("span",{staticClass:"tips"},[0!=s?[t._v("，")]:t._e(),t._v("\n\t\t            \t\t"+t._s(e.lebelContent[e.lebelIndex])+"\n\t\t            \t")],2):t._e()}))]:[l("span",{staticClass:"colp pointer",on:{click:t.addLabel}},[l("i",{staticClass:"fa fa-plus-square-o ml2 mr1 font16"}),t._v("添加标签")])],t._v(" "),l("div",{staticClass:"absolute del-box"},[l("el-popover",{attrs:{placement:"right",width:"300"},model:{value:t.visibleLabel,callback:function(e){t.visibleLabel=e},expression:"visibleLabel"}},[t._l(t.labelList,function(e,s){return l("div",{staticClass:"mb1"},[l("p",{staticClass:"colg"},[t._v(t._s(e.lebelName))]),t._v(" "),l("div",{staticClass:"col9 row label-box center bdb pb1"},t._l(e.lebelContent,function(a,i){return l("span",{staticClass:"col-lg-4 pointer",on:{click:function(e){t.choiceCustomLabel(s,i)}}},[-1!=e.lebelIndex&&e.lebelIndex==i?[l("el-button",{staticClass:"btn-hollow btn-small"},[t._v(t._s(a))])]:[t._v("\n\t\t\t\t\t\t\t\t\t\t"+t._s(a)+"\n\t\t\t\t\t\t\t\t\t")]],2)}))])}),t._v(" "),l("div",{staticClass:"center"},[l("span",{staticClass:"col9 mr2 pointer",on:{click:function(e){t.visibleLabel=!1}}},[t._v("取消")]),t._v(" "),l("span",{staticClass:"colp pointer",on:{click:t.confirmLabel}},[t._v("确认")])])],2)],1)],2),t._v(" "),l("el-form-item",{attrs:{label:"共享范围："}},[l("el-button",{class:1==t.ruleForm.state?"":"btn-hollow",on:{click:function(e){t.choiceState(1)}}},[t._v("自己独占")]),t._v(" "),l("el-button",{class:2==t.ruleForm.state?"":"btn-hollow",on:{click:function(e){t.choiceState(2)}}},[t._v("团队共享")])],1),t._v(" "),l("el-form-item",{attrs:{label:"提醒时间："}},[l("el-date-picker",{attrs:{type:"datetime",placeholder:"选择日期"},model:{value:t.time,callback:function(e){t.time=e},expression:"time"}})],1),t._v(" "),l("div",{staticClass:"center mt2 mb3"},[l("el-button",{staticClass:"linear5",on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("保存")])],1)],2)],1)},staticRenderFns:[]}},661:function(t,e,l){var s=l(658);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);l(318)("cd8162e6",s,!0)},665:function(t,e,l){t.exports=l.p+"static/img/1.cb88fb0.jpg"},678:function(t,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=l(320),a=l.n(s),i=l(648),o=l(653),n=l.n(o),r=l(659),c=l.n(r);e.default={data:function(){return{title:"客户跟进",currentTab:0,teamId:"",followCount:"",type:3,isToday:!1,list:[],followList:[],followType:[],oldlabelList:[],labelList:[],showLableType:1,showLable:!1,nowIndex:0,typeIndex:0,remark:"",key:"",count:{totalCount:0,today_follow:0},turnover:"",labelKey:"",labelKeyList:[],showAdd:!1,relationid:0,totalCount:0,pageId:1,pageSize:10,isSearch:!1}},components:{vBreadNav:n.a,vAddCust:c.a},mounted:function(){this.showAdd=!1,this.teamId=i.a.getStore("teamId").toString(),this.getCount(),this.getFollowType(),this.getList(1),this.getLabelList()},methods:{getList:function(t){var e=this;e.loading=!0;var l={pageId:this.pageId,pageSize:this.pageSize,teamId:this.teamId,type:this.type};this.isToday&&(l.type=parseInt(this.type)+10),this.labelKey&&(l.labelKey=this.labelKey),this.key&&(l.key=this.key),e.postData({url:ApiUrl.getCoustomer,data:l,success:function(l){if(0==l.status){e.nowIndex=0;var s=l.data.list;if(s.length>0){e.totalCount=l.data.totalNumber;for(var a in s)s[a].customUserLabel=null!=s[a].customUserLabel?JSON.parse(s[a].customUserLabel):null,s[a].customInfo=null!=s[a].customInfo?JSON.parse(s[a].customInfo):null,s[a].customShortName=s[a].customName.substr(0,2);e.list=s,t&&e.getFollowList(),e.relationid=e.list[this.nowIndex].relationId}else e.list=[]}e.loading=!1}})},handleCurrentChange:function(t){this.pageId=t,this.getList()},getCount:function(){var t=this;t.postData({url:ApiUrl.getCountToday+"?teamId="+this.teamId,success:function(e){0==e.status&&(t.count=e.data)}})},getFollowType:function(){var t=this;t.postData({url:ApiUrl.getFollowType,success:function(e){0==e.status&&(t.followType=e.data)}})},getLabelList:function(){var t=this;t.postData({url:ApiUrl.getLabels,success:function(e){if(0==e.status&&null!=e.data){var l=e.data;for(var s in l)null!=l[s].lebelContent&&""!=l[s].lebelContent&&(l[s].lebelIndex=-1,l[s].lebelContent=l[s].lebelContent.split(",")),"状态"==l[s].lebelName&&(""==l[s].lebelContent&&(l[s].lebelContent=[]),l[s].lebelContent.push("成交"),l[s].lebelContent.push("流失"));t.labelList=l,t.oldlabelList=l}}})},getFollowList:function(){var t=this;t.loading=!0;var e={relationId:this.list[this.nowIndex].relationId};t.postData({url:ApiUrl.getFollowList,data:e,success:function(e){if(0==e.status){var l=e.data;t.followList=l}t.loading=!1}})},checkIsToday:function(){this.getList()},choiceType:function(t){this.type=t,this.getList()},choiceTab:function(t){this.currentTab=t},choiceFollowType:function(t){this.typeIndex=t},switchLabel:function(t){for(var e in this.labelList)this.labelList[e].lebelIndex=-1;this.showLableType=t,this.showLable=!0},choiceNoWCust:function(t){this.nowIndex=t,this.getFollowList(),this.relationid=this.list[this.nowIndex].relationId},changeTime:function(){var t={time:new Date(this.list[this.nowIndex].customTime).getTime()};this.modifyCustomer(t)},refreshList:function(){this.currentTab=0,this.type=3,this.getList(),this.nowIndex=0},delCust:function(){var t=this,e=this;this.$confirm("确认要修改此客户吗?","提示",{type:"warning"}).then(function(){e.postData({url:ApiUrl.deleteRelation+"?relationShipId="+t.list[t.nowIndex].relationId,success:function(t){0==t.status?(e.$message({message:"已删除",type:"warning"}),e.currentTab=0,e.getList()):e.$message({message:t.message,type:"warning"})}})})},editCust:function(){this.relationid=this.list[this.nowIndex].relationId,this.showAdd=!0},submitRecord:function(){var t=this,e={relationId:this.list[this.nowIndex].relationId,typeId:this.followType[this.typeIndex].followTypeId,typeName:this.followType[this.typeIndex].followTypeName};this.remark&&(e.remark=this.remark),t.postData({url:ApiUrl.writeLog,type:"post",data:a()(e),success:function(e){0==e.status&&(t.getFollowList(),t.remark="",t.getCount())}})},choiceCustomLabel:function(t,e){var l=this;"状态"==this.labelList[t].lebelName&&"成交"!=this.labelList[t].lebelContent[e]&&this.turnover>0?this.$confirm("切换后将清除该客户的成单记录？?","提示",{type:"warning"}).then(function(){l.$set(l.labelList[t],"lebelIndex",e),l.turnover=0}):this.$set(this.labelList[t],"lebelIndex",e)},choiceLabel:function(){if(1==this.showLableType){var t=this.labelList,e="",l=[];for(var s in t)-1!=t[s].lebelIndex&&void 0!=t[s].lebelIndex&&t[s].lebelContent[t[s].lebelIndex]&&(l.push(t[s].lebelContent[t[s].lebelIndex]),e+=t[s].lebelContent[t[s].lebelIndex]+",");this.labelKey=e.substr(0,e.length-1),this.labelKeyList=l,this.getList()}else{var a=[],i=0,o={};for(var s in this.labelList)if(-1!=this.labelList[s].lebelIndex&&void 0!=this.labelList[s].lebelIndex)if(a.push({lebelId:this.labelList[s].lebelId,lebelIndex:this.labelList[s].lebelIndex,lebelContent:this.labelList[s].lebelContent[this.labelList[s].lebelIndex],lebelColor:this.labelList[s].lebelColor}),"成交"==a[s].lebelContent){if(!this.turnover||this.turnover<0)return void this.$message({message:"请输入成交额",type:"warning"});i=1,o.money=this.turnover}else"流失"==a[s].lebelContent&&(i=-1);this.list[this.nowIndex].customUserLabel=a,o.customUserLabel=a,o.label=i,this.modifyCustomer(o)}this.showLable=!1},delKey:function(t){this.labelKeyList.splice(t,1);var e="";for(var l in this.labelKeyList)e+=this.labelKeyList[l]+",";this.labelKey=e.substr(0,e.length-1),this.getList()},addLabel:function(){var t=this.list[this.nowIndex].customUserLabel;for(var e in this.labelList){this.labelList[e].lebelIndex=-1;for(var l in this.labelList[e].lebelContent)for(var s in t)t[s].lebelContent==this.labelList[e].lebelContent[l]&&(this.labelList[e].lebelIndex=t[s].lebelIndex)}this.showLableType=2,this.showLable=!0,this.turnover=this.list[this.nowIndex].customMoney/1},changeState:function(t){this.$set(this.list[this.nowIndex],"shareState",parseInt(t)+1);var e={state:parseInt(t)+1};this.modifyCustomer(e)},modifyCustomer:function(t){var e=this;t.relationShipId=this.list[this.nowIndex].relationId,e.postData({url:ApiUrl.modifyRelation,type:"post",data:a()(t),success:function(l){0==l.status&&(e.$message({message:"修改成功",type:"success"}),t.money&&(e.list[e.nowIndex].customMoney=t.money))}})},hideAdd:function(){this.showAdd=!1},goCopy:function(){document.getElementById("phone").select(),document.execCommand("Copy"),self.$message({message:"已复制",type:"success"})}}}},737:function(t,e,l){e=t.exports=l(90)(!1),e.push([t.i,".add-btn[data-v-29eebb96]{width:115px;height:40px;margin:0 10px 10px;background:#26c6da;color:#fff;display:inline-block;padding:10px 15px}.cust-record[data-v-29eebb96]{height:230px;overflow-y:auto}.upload-card[data-v-29eebb96]{width:340px}.upload-card .card-body[data-v-29eebb96]{padding:1.25rem!important}.mark-text[data-v-29eebb96]{width:92%;background:transparent;padding:10px 30px;BORDER-BOTTOM:0 solid;BORDER-LEFT:0 solid;BORDER-RIGHT:0 solid;BORDER-TOP:0 solid}",""])},776:function(t,e,l){t.exports={render:function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"page-wrapper"},[l("div",{staticClass:"container-fluid"},[l("v-breadNav",{attrs:{tit:t.title,nav:t.title}}),t._v(" "),l("div",{staticClass:"mb2"},[l("el-button",{class:3==t.type?"":"btn-hollow",on:{click:function(e){t.choiceType(3)}}},[t._v("全部"+t._s(t.count.totalCount)+"人")]),t._v(" "),l("el-button",{class:5==t.type?"":"btn-hollow",on:{click:function(e){t.choiceType(5)}}},[t._v("今日未跟进"+t._s(t.count.totalCount-t.count.today_follow)+"人")]),t._v(" "),l("el-button",{class:4==t.type?"":"btn-hollow",on:{click:function(e){t.choiceType(4)}}},[t._v("今日已跟进"+t._s(t.count.today_follow)+"人")]),t._v(" "),l("div",{staticClass:"right relative"},[t._l(t.labelKeyList,function(e,s){return l("el-button",{staticClass:"btn-hollow",on:{click:function(e){t.delKey(s)}}},[l("i",{staticClass:"fa fa-times mr1"}),t._v(t._s(e)+"\n        \t\t\t")])}),t._v(" "),l("el-button",{on:{click:function(e){t.switchLabel(1)}}},[l("i",{staticClass:"fa fa-filter mr1"}),t._v("筛选")]),t._v(" "),l("el-button",{on:{click:t.refreshList}},[l("i",{staticClass:"fa fa-refresh mr1"}),t._v("刷新")]),t._v(" "),l("a",{staticClass:"colf add-btn md-button",attrs:{href:"java:void(0)"},on:{click:function(e){t.showAdd=!0}}},[l("i",{staticClass:"fa fa-plus-circle mr1"}),t._v("一键添加")])],2)],1),t._v(" "),l("div",{staticClass:"row",staticStyle:{height:"650px"}},[l("div",{staticClass:"col-lg-4 col-md-7 over-y",staticStyle:{"padding-right":"0"}},[l("div",{staticClass:"card",staticStyle:{"min-height":"100%"}},[l("div",{staticClass:"card-body"},[l("div",{staticClass:"mb2"},[l("span",{staticClass:"mr2"},[t._v("全部客户")]),t._v(" "),t.isSearch?[l("el-input",{staticStyle:{width:"62%"},attrs:{placeholder:"请输入内容","prefix-icon":"el-icon-search"},on:{change:function(e){t.getList()}},model:{value:t.key,callback:function(e){t.key=e},expression:"key"}},[l("i",{staticClass:"el-input__icon el-icon-close pointer",attrs:{slot:"suffix"},on:{click:function(e){t.isSearch=!1}},slot:"suffix"})])]:[l("el-checkbox",{on:{change:function(e){t.checkIsToday()}},model:{value:t.isToday,callback:function(e){t.isToday=e},expression:"isToday"}},[t._v("今日提醒")]),t._v(" "),l("i",{staticClass:"fa right colp fa-search pointer",staticStyle:{"font-size":"18px"},on:{click:function(e){t.isSearch=!0}}})]],2),t._v(" "),l("ul",{staticClass:"cust-list"},t._l(t.list,function(e,s){return l("li",{staticClass:"mb1",class:t.nowIndex==s?"hover":"",on:{click:function(e){t.choiceNoWCust(s)}}},[l("div",{staticClass:"ovh"},[l("span",{staticClass:"tip-name mr1 left",class:1!=e.shareState?"disabled":""},[t._v(t._s(e.customShortName))]),t._v(" "),l("div",[l("div",{staticClass:"fontb mb1"},[t._v(t._s(e.customName)),l("span",{staticClass:"col9 font14 fontn ml1"},[t._v(t._s(e.customPhone))])]),t._v(" "),l("div",t._l(e.customUserLabel,function(e){return l("label",{staticClass:"label label-rounded mr1",style:{background:e.lebelColor}},[t._v(" \n    \t\t\t\t\t\t\t\t\t\t\t"+t._s(e.lebelContent)+"\n    \t\t\t\t\t\t\t\t\t\t")])}))])]),t._v(" "),null!=e.kekeFollow.followModifyTime?l("p",{staticClass:"col9 mt font14"},[t._v("\n        \t\t\t\t\t\t\t"+t._s(t._f("sortTimeYYYYMDHM")(e.kekeFollow.followModifyTime/1e3))+" "+t._s(e.kekeFollow.followRemark)+"\n        \t\t\t\t\t\t\t")]):t._e()])})),t._v(" "),0==t.list.length?l("p",{staticClass:"col9 center"},[t._v("暂时没有此状态客户哦")]):t._e()])])]),t._v(" "),l("div",{staticClass:"col-lg-8 col-md-5",staticStyle:{"padding-left":"0",height:"100%"}},[l("div",{staticClass:"card",staticStyle:{"border-left":"0",background:"#f4f8fb",height:"100%"}},[l("div",{staticClass:"card-body",staticStyle:{padding:"0!important"}},[l("div",{staticStyle:{padding:"1.25rem 2rem"}},[l("div",{staticClass:"ovh mb3"},[l("el-button",{class:0==t.currentTab?"":"btn-hollow",on:{click:function(e){t.choiceTab(0)}}},[t._v("跟进记录")]),t._v(" "),l("el-button",{class:1==t.currentTab?"":"btn-hollow",on:{click:function(e){t.choiceTab(1)}}},[t._v("客户资料")]),t._v(" "),l("el-button",{class:2==t.currentTab?"":"btn-hollow",on:{click:function(e){t.choiceTab(2)}}},[t._v("客户合同")])],1),t._v(" "),0==t.currentTab?l("div",[0==t.followList.length?l("p",{staticClass:"col9 center"},[t._v("暂时没有跟进记录哦")]):t._e(),t._v(" "),t.list.length>0?l("ul",{staticClass:"cust-record"},t._l(t.followList,function(e){return l("li",{staticClass:"mb2"},[l("span",{staticClass:"tip-name mr1 left"},[t._v(t._s(t.list[t.nowIndex].customShortName))]),t._v(" "),l("div",{staticClass:"card bdn"},[l("div",{staticClass:"card-body"},[l("span",{staticClass:"col9 mr2"},[t._v(t._s(t._f("sortTimeYYYYMDHM")(e.followModifyTime/1e3)))]),t._v("\n\t        \t\t\t\t\t\t\t\t\t\t"+t._s(e.followTypeName?e.followTypeName:"")),e.followRemark&&e.followTypeName?[t._v("：")]:t._e(),t._v("\n\t        \t\t\t\t\t\t\t\t\t\t"+t._s(e.followRemark)+"\n\t        \t\t\t\t\t\t\t\t\t")],2)])])})):t._e(),t._v(" "),t.list.length>0?l("div",[t._l(t.list[t.nowIndex].customUserLabel,function(e){return l("label",{staticClass:"label label-rounded mr1",style:{background:e.lebelColor}},[t._v(" \n    \t\t\t\t\t\t\t\t\t\t\t"+t._s(e.lebelContent)+"\n    \t\t\t\t\t\t\t\t\t")])}),t._v(" "),l("span",{staticClass:"colp pointer",on:{click:t.addLabel}},[l("i",{staticClass:"fa fa-plus-square-o ml2 mr1 font16"}),t._v("添加标签")])],2):t._e()]):t._e(),t._v(" "),1==t.currentTab&&t.list.length>0?l("div",{staticClass:"font16 colg"},[l("p",{staticClass:"mb2"},[t._v("名字："+t._s(t.list[t.nowIndex].customName))]),t._v(" "),l("p",{staticClass:"mb2"},[t._v("电话："+t._s(t.list[t.nowIndex].customPhone))]),t._v(" "),t._l(t.list[t.nowIndex].customInfo,function(e){return l("p",{staticClass:"mb2"},[t._v(t._s(e.name)+"："+t._s(e.value))])}),t._v(" "),l("div",{staticClass:"ovh mb3"},[l("el-button",{staticClass:"btn-hollow",on:{click:function(e){t.delCust()}}},[t._v("删除客户")]),t._v(" "),l("el-button",{on:{click:function(e){t.editCust()}}},[t._v("编辑资料")])],1)],2):t._e(),t._v(" "),2==t.currentTab?l("div",{staticClass:"colg"},[t._m(0),t._v(" "),l("div",{staticClass:"ovh mt2"},[l("el-button",{on:{click:function(e){t.submitForm()}}},[t._v("添加附件")])],1)]):t._e()]),t._v(" "),0==t.currentTab&&t.list.length>0?l("div",{staticClass:"pb2 bgf"},[l("div",{staticClass:"card bdn"},[l("div",{staticClass:"card-body follow-state"},[t._v("\n\t\t\t\t\t\t\t\t\t\t"+t._s(t.list[t.nowIndex].customName)+"\n\t\t\t\t\t\t\t\t\t\t"),l("span",{staticClass:"col9 mr2"},[t._v(t._s(t.list[t.nowIndex].customPhone))]),t._v(" "),l("input",{staticStyle:{opacity:"0",width:"0"},attrs:{id:"phone"},domProps:{value:t.list[t.nowIndex].customPhone}}),t._v(" "),l("span",{staticClass:"colp pointer",on:{click:t.goCopy}},[l("i",{staticClass:"fa fa-copy font16"})]),t._v(" "),l("div",{staticClass:"right pointer ml2"},[l("i",{staticClass:"fa fa-anchor colp font16"}),t._v(" "),l("el-select",{attrs:{value:t.list[t.nowIndex].shareState-1==0?"自己独占":"团队共享"},on:{change:function(e){t.changeState(e)}}},[l("el-option",{attrs:{value:"0"}},[t._v("自己独占")]),t._v(" "),l("el-option",{attrs:{value:"1"}},[t._v("团队共享")])],1)],1),t._v(" "),l("span",{staticClass:"right pointer"},[l("i",{staticClass:"fa fa-clock-o colp font16"}),t._v(" "),l("el-date-picker",{attrs:{type:"datetime",format:"MM 月 dd 日 hh:mm",placeholder:"提醒时间"},on:{change:t.changeTime},model:{value:t.list[t.nowIndex].customTime,callback:function(e){t.$set(t.list[t.nowIndex],"customTime",e)},expression:"list[nowIndex].customTime"}})],1)])]),t._v(" "),l("div",[l("textarea",{directives:[{name:"model",rawName:"v-model",value:t.remark,expression:"remark"}],staticClass:"pd3 mb2 mark-text",attrs:{rows:"4",placeholder:"请输入备注/跟进结果"},domProps:{value:t.remark},on:{input:function(e){e.target.composing||(t.remark=e.target.value)}}})]),t._v(" "),l("div",{staticClass:"pdlr3"},[t._l(t.followType,function(e,s){return[t.typeIndex==s?[l("el-button",{staticClass:"blue-button",staticStyle:{"margin-right":"20px"},on:{click:function(e){t.choiceFollowType(s)}}},[t._v(t._s(e.followTypeName))])]:[l("span",{staticClass:"pointer mr2",on:{click:function(e){t.choiceFollowType(s)}}},[t._v(t._s(e.followTypeName))])]]}),t._v(" "),l("el-button",{staticClass:"right",on:{click:function(e){t.submitRecord()}}},[t._v("提交记录")])],2)]):t._e()])])])]),t._v(" "),l("div",{staticClass:"center mt2 mb2"},[l("el-pagination",{attrs:{"current-page":t.pageId,"page-size":t.pageSize,layout:"total, prev, pager, next",total:t.totalCount},on:{"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.pageId=e}}})],1)],1),t._v(" "),l("el-dialog",{attrs:{title:"标签筛选",visible:t.showLable,width:"450px"},on:{"update:visible":function(e){t.showLable=e}}},[t._l(t.labelList,function(e,s){return l("div",{staticClass:"mb1"},[l("p",{staticClass:"colg mb1"},[t._v(t._s(e.lebelName))]),t._v(" "),l("div",{staticClass:"col9 row label-box center bdb"},t._l(e.lebelContent,function(a,i){return l("span",{staticClass:"col-lg-4 pointer follow-input",on:{click:function(e){t.choiceCustomLabel(s,i)}}},[-1!=e.lebelIndex&&e.lebelIndex==i?[l("el-button",{staticClass:"btn-hollow"},[t._v(t._s(a))])]:[t._v("\n\t\t\t\t\t\t\t"+t._s(a)+"\n\t\t\t\t\t\t")],t._v(" "),2==t.showLableType&&"成交"==a&&-1!=e.lebelIndex&&e.lebelIndex==i?[l("el-input",{staticClass:"mt1",staticStyle:{width:"100px"},attrs:{placeholder:"请输入大于0的成交"},model:{value:t.turnover,callback:function(e){t.turnover=e},expression:"turnover"}})]:t._e()],2)}))])}),t._v(" "),l("div",{staticClass:"center"},[l("el-button",{staticClass:"linear5",on:{click:function(e){t.choiceLabel()}}},[t._v("确认")]),t._v(" "),l("el-button",{staticClass:"btn-hollow",on:{click:function(e){t.showLable=!1}}},[t._v("取消")])],1)],2),t._v(" "),l("v-addCust",{attrs:{showadd:t.showAdd,id:t.relationid},on:{watchshow:t.hideAdd}})],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"card upload-card"},[s("div",{staticClass:"card-body"},[s("img",{staticClass:"left mr1",attrs:{src:l(665),width:"80px",height:"80px"}}),t._v(" "),s("div",{},[s("p",{staticClass:"colp fontb mb2"},[t._v("BUG1.PNG")]),t._v(" "),s("p",{staticClass:"col9"},[t._v("图片 文件")]),t._v(" "),s("p",{staticClass:"col9"},[t._v("\n\t\t\t\t\t\t\t\t\t\t\t\t185.03k\n\t\t\t\t\t\t\t\t\t\t\t\t"),s("span",{staticClass:"ml2 fontb"},[t._v("打开")]),t._v(" "),s("span",{staticClass:"ml1 fontb"},[t._v("下载")]),t._v(" "),s("span",{staticClass:"ml1 fontb"},[t._v("删除")])])])])])}]}},787:function(t,e,l){var s=l(737);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);l(318)("9fb8bf1e",s,!0)}});