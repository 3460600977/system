/**
 * Created by Lady.Du on 2018/5/12.
 */
export const menu_list = [
	{
		icon: 'fa fa-work',
		index: 'workbench',
		title: '工作台',
	},{
		icon: 'fa fa-enterprise',
		index: 'businessManagement',
		title: '企业管理',
		subs: [
			{
				index: 'myDirectPushBusiness',
				title: '我的直推企业',
			},{
				index: 'fissionEnterprise',
				title: '裂变企业',
			}
		]
	},{
		icon: 'fa fa-agent',
		index: 'agentList',
		title: '代理商管理',
	},{
		icon: 'fa fa-finance',
		index: 'incomeAccount',
		title: '财务中心',
        subs: [
        	{
        		index: 'incomeAccount',
        		title: '收益账户',
        	},{
        		index: 'consumAccount',
        		title: '消耗型账户',
        	}
        ]
	},

];
