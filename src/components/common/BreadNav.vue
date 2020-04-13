<template>
   <div class="row page-titles">
        <div class="col-md-5 col-8 align-self-center">
            <h3 class="font16 fontb" :class="nav && nav.name ?'':'mb1'">{{tit}}</h3>
            <ol class="breadcrumb" v-if="nav && nav.name">
                <li class="breadcrumb-item"><a class="col3" :href="'/manager/'+nav.to">{{nav.name}}</a></li>
            </ol>
        </div>
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
            nav: {
                type: String
            },
        },
        data() {
            return {
                teamId:'',
                glob:0,
                count:0,

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
    /*******************
 Breadcrumb and page title
*******************/
.page-titles {
  background: #ffffff;
  margin: 0 -30px 30px;
  padding: 8px 15px;
  -webkit-box-shadow: 1px 0 5px rgba(0, 0, 0, 0.1);
  box-shadow: 1px 0 5px rgba(0, 0, 0, 0.1); }
  .page-titles h3 {
    margin-top: 8px; }
  .page-titles .breadcrumb {
    padding: 0px;
    background: transparent;
    font-size: 14px; }
    .page-titles .breadcrumb li {
      margin-top: 0px;
      margin-bottom: 0px; }
    .page-titles .breadcrumb .breadcrumb-item + .breadcrumb-item::before {
      content: "\e649";
      font-family: themify;
      color: #a6b7bf;
      font-size: 11px; }
    .page-titles .breadcrumb .breadcrumb-item.active {
      color: #99abb4; }
</style>
