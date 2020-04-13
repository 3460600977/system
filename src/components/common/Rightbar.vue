<template>
    <div class="rightbar">
		<div class="phone-box ovh mb2">
			<img src="../../../static/img/service.png" width="58x" height="58x" class="left mr1" />
			<div class="left">
				<p class="font16">有问题请找我</p>
				<p class="col9 font12">您的服务经理</p>
				<p class="font12">‭18080983998‬</p>
			</div>
		</div>
    	<right-model></right-model>
    </div>
</template>

<style scoped>
    .rightbar{
        position:absolute;
        right:0;
        top:70px;
        width: 220px;
        padding:40px 25px;
        min-height:100%;
        overflow:hidden;
        background:#FCFCFF;
    }
</style>
<script>
	import rightModel from '../login/RightModel.vue';
	export default {
	    components: {
	        rightModel
	    },
	    methods: {
	     	goPrinter(){
	    		this.$router.push('/printer');
	     	},
	     	goTake(){
	    		this.$router.push('/takeout');
	     	}
	   }

	}
</script>
