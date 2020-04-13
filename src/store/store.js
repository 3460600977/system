/**
 * Created by Lady.Du on 2018/5/12.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import * as Menu from './menu';

Vue.use(Vuex);
let arr = Menu.menu_list;
// if(localStorage.member_info){
// 	let obj = JSON.parse(localStorage.member_info);
// 	if(obj.agentPreceptId==2 || !obj.agentPreceptId){//二级代理
// 		arr.splice(2,1)
// 	}
// }
const state = {
    count:0,
    menuData:arr,
    adminInfo:{},
    breadcrumb:[{
      icon:'',
      name:''
    },{
      icon:'',
      name:''
    }],
};

const mutations = {
	selectSidebarList(state){
		state.menuData.splice(2,1);
		state.menuData = state.menuData;
	}
};

const actions = {

};

const getters = {

};

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});
