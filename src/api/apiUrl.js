/**
 * [$ description] 工具类
 * @type {[type]}
 * Created by Ms.du on 2018/5/12.
 */
let proto = window.location.protocol;//拿到当前网址的协议http/https
global.BaseUrl = {
    // Api:proto+'//keked.huawucloud.com/api',
    // Api:proto+'//192.168.2.46:9018',
    // Api:proto+'//keked.huawucloud.com/api',
    // Api:proto+'//192.168.1.9:9017',
    //Api:proto+'//keked.huawucloud.com/api',
    // Api:proto+'//192.168.1.9:9018',

    // Api:proto+'keked.aikkcard.com',
    ImgHead: proto + '//keked.aikkcard.com/img/',
    // Domain:proto+'//keked.huawucloud.com',
    // Domain:proto+'//keke.aikkcard.com',		  //域名
    // Api:proto+'//keke.aikkcard.com/api',   	  //接口地址
    // ImgHead:proto+'//keke.aikkcard.com/img/',  //上传的图片地址
    //Domain:proto+'//keke.huawucloud.com',		  //域名
    //Api:proto+'//keke.huawucloud.com/api',   	  //接口地址
    //ImgHead:proto+'//keke.huawucloud.com/img/',  //上传的图片地址
    //Domain:proto+'//keke.huawucloud.com',		  //域名
    //  Api:proto+'//keke.huawucloud.com/api',   	  //接口地址
    //ImgHead:proto+'//keke.huawucloud.com/img/',  //上传的图片地址

    // 本地
    Api: proto + '//192.168.2.46:9019',
    // ImgHead: proto + '//192.168.2.46:9019/img/',

}
global.ApiUrl = {
    getToken: '/system/gettoken', //获取token
    login: '/system/backstage/login', //登录
    getCode: '/user/loginBycode', //获取登录code
    getAgentList: '/agent/getTwoAgentList', //获取代理商列表
    getUpgrade: '/agency/manger/all/precept', //获取全部代理商类型
    modifyAgentStatus: '/agency/manger/update', //修改代理商状态
    //

    getEnterpriseInfo: '/agent/getTwoAgentInfo', // 获取企业的实时状况
    getEnterpriseList: '/agent/home/examine', // 获取企业的列表
    // getAgentList: '',									// 获取待审核的代理商列表
    getDirectPushBusiness: '/team/selectDirectPushTeam', // 获取直推企业的列表
    getFissionBusiness: '/team/selectIntroduceTeam', // 获取裂变企业的列表
    getVersionList: '', // 获取版本列表
    getOpenBusiness: '/agent/selectTeamDetail', // 获取开通企业的详细信息
    upgradeBusiness: '', // 升级版本
    getAgentDetail: '/agent/getTwoAgentInfo', // 获取二级代理商详情
    getAgentInfo: '/agent/getAgentInfo', // 获取代理商的性情
    // getOpenAgentDetail: '',									// 获取开通代理商的信息
    getServicePreceptInfo: '/servicePrecept/selectServicePreceptInfo', // 版本开通的套餐
    getRechargeConfig: '/financial/getConsumeList', // 获取消耗性账户明细
    getProfitList: '/financial/getProfitList', // 获取收益性账户明细
    getBankList: '/financial/getBankList', // 获取银行卡列表
    saveCount: '/financial/setBankAccount', // 保存或新增用户
    getRegistCode: '/system/sendMsgCode', // 获取短信验证码
    openVersionAgentUser: '/openVersion/openVersionAgentUser', // 开通代理商使用消耗性余额
    openVersionAgentUserByWxPay: '/openVersion/openVersionAgentUserByWxPay', // 开通代理商使用微信支付
    openVersionMoney: '/openVersion/selectAgentVersion', // 开通当前代理商的价格
    getEarningsInfo: '/financial/getEarningsInfo', // 获取收益性账户的信息
    getConsummerInfo: '/financial/getConsummerInfo', // 获取消耗性账户信息
    getServicePreceptInfoByYear: '/servicePrecept/getServicePreceptInfoByYear', // 根据年限查询价格
    selectAgentProfit: '/agent/selectAgentProfit', // 开通这个企业可以获利的百分比
    openVersionByBalance: '/openVersion/openVersionByBalance', // 开通企业
    openVersionByWxPay: '/openVersion/openVersionByWxPay', // 使用微信支付开通版本
    applyExtract: '/financial/applyExtract', //提现接口
    getBankAccount: '/financial/getBankAccount', // 获取账户信息
    rejectApply: '/openVersion/rejectApply', // 驳回申请
    getRechargeConfigList: '/pay/getRechargeConfig', //充值列表
    getQCode: '/pay/getQCode', // 二维码充值码
    profitMoneyConversionToConsummerMoney: '/pay/profitMoneyConversionToConsummerMoney', // 收益性余额充值消费性余额
    getQrCode: '/system/getQrCode', // 获取注册二维码
    logOut: '/system/logOut', // 退出登录
    selectOpenTeamChart: '/openVersion/selectOpenTeamChart', // 查询企业开通裂变图

}
