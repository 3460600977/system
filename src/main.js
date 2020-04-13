import Vue from 'vue';
import store from './store/store';
import App from './App';
import router from './router';
import VueResource from 'vue-resource';
import ElementUI from 'element-ui';
import Request from './api/request';
import apiUrl from './api/apiUrl';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
import "babel-polyfill";
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import echarts from 'echarts'

Vue.use(ElementUI);
Vue.use(VueResource);
Vue.use(Request);


Vue.prototype.$echarts = echarts;
Vue.http.options.emulateJSON = true;
Vue.prototype.$moment = moment;

global.VueEvent = new Vue();

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

// //以下配置为格式化时间戳的方式
if(moment) window.moment = moment;
moment.locale('zh-cn');

/**
 * [description] 格式化时间  （2016-12-26） 今天之内 显示 今天  超过今天显示昨天  超过今天显示  YYYY-MM-DD
 * @param  {String} value){                 let time [description]
 * @return {[type]}          [description]
 */
Vue.filter('sortYDMtimeYDM',function(value){
    let time = '';
    let valueTime = moment(value).format('YYYY-MM-DD'); //格式化时间戳年月日
    let curTime = moment().format('YYYY-MM-DD'); //当前年月日
    let tomm = moment().add('days',1).format('YYYY-MM-DD');//明天的年月日
    let dayAfter = moment().add('days',2).format('YYYY-MM-DD');//后天的年月日
    if(moment(curTime).isSame(valueTime)){
        time = '今天';
    }else if(moment(tomm).isSame(valueTime)){
        time = '明天';
    }else if(moment(tomm).isSame(valueTime)){
        time = '后天';
    }else{
        time = moment(value).format('MM-DD')
    }
    return time+" "+moment(value).format('HH:mm');
});
/**
 * [description] 格式化时间  年月日  YYYY-MM-DD HH:mm
 * @param  {[type]} index) {               return moment.unix(value).format('YYYY-MM-DD HH:mm');} [description]
 * @return {[type]}        [description]
 */
Vue.filter('sortTimeYYYYMDHM',function(value) {
    if(typeof value=='number'){
        return moment.unix(value).format('YYYY-MM-DD HH:mm');
    }
});
/**
 * [description] 格式化时间  月日  MM-DD HH:mm
 * @param  {[type]} index) {               return moment.unix(value).format('MM-DD HH:mm');} [description]
 * @return {[type]}        [description]
 */
Vue.filter('sortTimeMDHM',function(value) {
    return moment.unix(value).format('MM-DD HH:mm');
});

Vue.filter('toFixed',function(value) {
    return parseFloat(value).toFixed(2);
});
Vue.filter('toAbs',function(value) {
    return Math.abs(value);
});


