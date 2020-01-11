<template>
  <div class="diagnosis">
    <p class="diagnosis-tip">温馨提示：目前“诊断结果”仅支持输出“账户问题，无效推广组，暂停关键词，有展现无点击关键词”，余下功能正在努力搭建中，敬请期待！</p>
    <div class="diagnosis-selection">
      <el-radio-group v-model="resource">
        <el-radio label="线上品牌商赞助"></el-radio>
        <el-radio label="线下场地免费"></el-radio>
      </el-radio-group>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      resource: ''
    };
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
