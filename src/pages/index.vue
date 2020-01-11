<template>
  <div class="tab">
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="诊断"
        name="diagnosis"
      ></el-tab-pane>
      <el-tab-pane
        label="账户"
        name="account"
      ></el-tab-pane>
      <el-tab-pane
        label="客户"
        name="client"
      ></el-tab-pane>
    </el-tabs>
    <div class="tab-content">
      <Diagnosis v-if="activeName==='diagnosis'"></Diagnosis>
      <Account v-if="activeName==='account'"></Account>
      <Client v-if="activeName==='client'"></Client>
    </div>
  </div>
</template>
<script>
//引入页面组件
import Diagnosis from "../components/diagnosis";
import Account from "../components/account";
import Client from "../components/client";

export default {
  //声明组件名称
  components: {
    Diagnosis,
    Account,
    Client
  },

  data () {
    return {
      activeName: 'diagnosis'
    };
  },
  methods: {
    handleClick (tab, event) {
      this.activeName = tab.paneName
    }
  }
};
</script>
