<template>
   <div>

    </div>
</template>
<script>
    import tool from '../../api/tools.js';
    export default {
        props: {
            tit: {
                type: String,
                required: true
            },

        },
        data() {
            return {


            }
        },
        mounted() {
          this.teamId=tool.getStore("teamId");
          window.scrollTo(0, 0);
        },
        methods: {
        },
    }
</script>
<style scoped>
.chart_box{
    color:#fff;
    width:214px;
    height: 90px;
    background: #745AF2;
    display:inline-block;
    border-radius: 5px;
    position:relative;
}
.char_icon{
    width:15px;
    height:15px;
    display:inline-block;
    background: url(../../../static/img/chart_botton.png);
}
.chart_box_yellow{
    background: #FFB22B;
}
.chart_box_black{
    background: #343542;
}
.chart_box_gray{
    background: #ABB5C1;
}
.chart_hline{
    position:absolute;
    width: 60px;
    border-top: 2px solid #745AF2;
    right: -60px;
    top: 45px;
}
.chart_vline{
    position:absolute;
    width: 1px;
    height: 60px;
    border-left: 2px solid #745AF2;
    right: -60px;
    bottom: 43px;
}
.chart_vline2{
    top: 45px;
}
.chart_hline2{
    left: -60px;
    border-color: #ABB5C1;
}
.chart_vline3{
    left: -60px;
    border-color: #ABB5C1;
}
.chart_Profit{
   background: #fff;
   color: #745AF2;
   position: absolute;
   z-index: 1;
   bottom: 85px;
}
.chart_Profit2{
    color: #292A36;
}
.chart_arr::after{
    content: '';
    position: absolute;
    background: url(../../../static/img/chart_left.png);
    width:15px;
    height:15px;
    right: -12px;
    bottom: 37px;
}
.chart_arr3::after{
    background: url(../../../static/img/chart_right.png);
    left: -14px;
    bottom: 37px;
}
</style>
