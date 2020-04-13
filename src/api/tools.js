/**
 * [$ description] 工具类
 * @type {[type]}
 * Created by Ms.du on 2018/5/12.
 */
var tool =  {
        /**
         * [isJSON description] 是否为json
         * @param  {[type]}  obj [description]
         * @return {Boolean}     [description]
         */
        isJSON(obj){
            return typeof obj === "object" && Object.prototype.toString.call(obj).toLowerCase() === "[object object]" && !obj.length;
        },
        /**
         * [stringify description] 序列化
         * @param  {[type]} val [description]
         * @return {[type]}     [description]
         */
        stringify(val){
            return val === undefined || typeof val === "function" ? val + "" : JSON.stringify(val);
        },
        isPhone(value) {
          return /^1\d{10}$/.test(value);
        },
        /**
         * [deserialize description] 反序列化
         * @return {[type]} [description]
         */
        deserialize(value){
            if (typeof value !== "string") {
                return undefined;
            }
            try {
                return JSON.parse(value);
            } catch (e) {
                return value || undefined;
            }
        },
        /**
         * [isFunction description] 是否为func
         * @return {Boolean} [description]
         */
        isFunction(value){
            return {}.toString.call(value) === "[object Function]";
        },
        /**
         * [isArray description] 是否为数组
         * @return {Boolean} [description]
         */
        isArray(value){
            return value instanceof Array;
        },
        /**
         * [islocalStorage description] 浏览器是否支持localStorage
         * @return {[type]} [description]
         */
        islocalStorage(){
            return window.localStorage ? true : false;
        },
        /**
         * 验证验证码个数
         */
        isCode(value) {
          return /^\d{6}$/.test(value);
        },
        /**
         * [setStore description] 设置 localStorage
         * @param  {[type]} key  [description]
         * @param  {[type]} value [description]  --->  单个  数组  {}
         * @return {[type]}       [description]
         */
        setStore(key,value){
    		if(this.islocalStorage){
                if (key && !this.isJSON(key)) {
                    window.localStorage.setItem(key, this.stringify(value));
                } else if (key && this.isJSON(key) && !value) {
                    for (let a in key) this.setStore(a, key[a]);
                }
            }else{
                console.log('浏览器不支持localStorage(setStore)');
            }
        },
        /**
         * [getStore description] 获取某个localStorage值
         * @param  {[type]} name [description]
         * @return {[type]}      [description]
         */
        getStore(key){
        	if(this.islocalStorage){
                if(!key){
                    throw new Error('getStore参数不存在');
                }
        		return this.deserialize(window.localStorage.getItem(key));
        	}else{
                console.log('浏览器不支持localStorage(getStore)');
            }
        },
        /**
         * [delStore description] 删除某个 localStorage值
         * @param  {[type]} key [description]
         * @return {[type]}     [description]
         */
        delStore(key){
        	if(this.islocalStorage){
                if(!key){
                    throw new Error('delStore参数不存在');
                }
                window.localStorage.removeItem(key);
            }else{
                console.log('浏览器不支持localStorage(getStore)');
            }
        },
        /**
         * [clearStore description] 清空localStorage
         * @return {[type]} [description]
         */
        clearStore(){
            if(this.islocalStorage){
                window.localStorage.clear();
            }else{
                console.log('浏览器不支持localStorage(clearStore)');
            }
        },
        getCookie(sname){
            var acookie=document.cookie.split("; ");
            for(var i=0;i<acookie.length;i++){
            var arr=acookie[i].split("=");
            if(sname==arr[0]){
            if(arr.length>1)
            return unescape(arr[1]);
            else
            return "";}}
            return "";
        },
        formateYYYYMMDD(date){
            var newData;
            if(date){
                newData = new Date(date);
            }else{
                newData = new Date();
            }
            var year = newData.getFullYear();
            var month = newData.getMonth() + 1;
            var dd = newData.getDate();
            var hh = newData.getHours();
            var mm = newData.getMinutes();
            if(mm.toString().length==1){
                mm="0"+mm;
            }
            if(month.toString().length==1){
                month="0"+month;
            }
            if(dd.toString().length==1){
                dd="0"+dd;
            }
            if(hh.toString().length==1){
                hh="0"+hh;
            }
            return year + "-" + month + "-" + dd+ " " + hh + ":" + mm;
        },
        formateDate(date){
            var newData;
            if(date){
                newData = new Date(date);
            }else{
                newData = new Date();
            }
            var year = newData.getFullYear();
            var month = newData.getMonth() + 1;
            var dd = newData.getDate();
            if(month.toString().length==1){
                month="0"+month;
            }
            if(dd.toString().length==1){
                dd="0"+dd;
            }
            return year + "-" + month + "-" + dd;
        },
        formateDateNoDelimiter(date){
            var newData = new Date(date);
            var year = newData.getFullYear();
            var month = newData.getMonth() + 1;
            var dd = newData.getDate();
            if(month.toString().length==1){
                month="0"+month;
            }
            if(dd.toString().length==1){
                dd="0"+dd;
            }
            return year + month  + dd;
        },
		//获取几天前的日期
		getDay: function(num) {
			var nowtime = new Date(new Date().getTime() - num * 24 * 3600000);
			var year = nowtime.getFullYear();
			var month = nowtime.getMonth() + 1;
			var day = nowtime.getDate();
			if (month.toString().length == 1) {
			  month = "0" + month;
			}
			if (day.toString().length == 1) {
			  day = "0" + day;
			}
			return year + "-" + month + "-" + day;
		},
};
export default tool;