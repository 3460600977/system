import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	mode: 'history',
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/Home',
            component: resolve => require(['../components/common/Home.vue'], resolve),//这是vue异步组件懒加载的方法resolve是懒加载的意思
            children: [{
                    path: '/workbench',
                    name: '工作台',
                    component: resolve => require(['../views/page/workbench.vue'], resolve),
                },
                {
                    path: '/agentList',
                    name: '代理商管理',
                    component: resolve => require(['../views/agent/agentList.vue'], resolve)
                },
                {
                    path: '/myDirectPushBusiness',
                    name: '我的直推企业',
                    component: resolve => require(['../views/enterprise/myDirectPushBusiness.vue'], resolve),
                },
                {
                    path: '/fissionEnterprise',
                    name: '裂变企业',
                    component: resolve => require(['../views/enterprise/fissionEnterprise.vue'], resolve),
                },
                {
                    path: '/withdrawal',
                    name: '收益账户-提现',
                    component: resolve => require(['../views/finance/withdrawal.vue'], resolve),
                },
                {
                    path: '/agentdetail',
                    name: '代理商管理-代理商详情',
                    component: resolve => require(['../views/agent/agentDetail.vue'], resolve),
                },
                {
                    path: '/openagent',
                    name: '代理商管理-开通账号',
                    component: resolve => require(['../views/agent/openAgent.vue'], resolve),
                },
                {
                    path: '/businessdetail',
                    name: '企业详情',
                    component: resolve => require(['../views/enterprise/businessDetail.vue'], resolve),
                },
                {
                    path: '/openenterprise',
                    name: '开通企业',
                    component: resolve => require(['../views/enterprise/openEnterPrise.vue'], resolve),
                },
                {
                    path: '/incomeAccount',
                    name: '收益账户',
                    component: resolve => require(['../views/finance/incomeAccount.vue'], resolve),
                },
                {
                    path: '/consumAccount',
                    name: '消耗型账户',
                    component: resolve => require(['../views/finance/consumAccount.vue'], resolve),
                },
				{
					path: '/setcount',
					name: '收益账户-设置账户',
					component: resolve => require(['../views/finance/setCount.vue'],resolve),
				}
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/login/login.vue'], resolve)
        },
    ]
})
