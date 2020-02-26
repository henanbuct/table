<template>
  <div class="client">
    <div class="client-detail">
      <span class="client-detail-tt">详情：</span>
      <div class="client-detail-promote">
        <div class="client-detail-message">
          <span>客户名称：{{customName}}</span>
        </div>
        <div class="client-detail-message">
          <span>客户ID：{{customId}}</span>
        </div>
        <div class="client-detail-message">
          <span>账户总数：{{accountAmount}}</span>
        </div>
      </div>
    </div>
    <Account v-bind:client="client"></Account>
    <Plan v-bind:client="client"></Plan>
    <Group v-bind:client="client"></Group>
    <KeyWord v-bind:client="client"></KeyWord>
    <SearchWord v-bind:client="client"></SearchWord>
    <Idea v-bind:client="client"></Idea>
    <Style v-bind:client="client"></Style>
  </div>
</template>
<script>
import Account from './Client/Account';
import Plan from './Client/Plan';
import Group from './Client/Group';
import KeyWord from './Client/KeyWord';
import SearchWord from './Client/SearchWord';
import Idea from './Client/Idea';
import Style from './Client/Style';
export default {
  components: {
    Account,
    Plan,
    Group,
    KeyWord,
    SearchWord,
    Idea,
    Style,
  },
  data () {
    return {
      customName: '',
      customId: '',
      accountAmount: '',
      client: {}
    };
  },

  //渲染数据
  created () {
    this.customName = this.$route.params.accountInfo.customName || ''
    this.customId = this.$route.params.accountInfo.customId || ''
    this.accountAmount = this.$route.params.accountInfo.accountAmount || 0
    this.client = this.$route.params
  },

};
</script>
<style scoped lang="scss">
.client {
  &-detail {
    text-align: left;
    width: 100%;
    align-items: center;
    display: flex;
    flex-direction: row;
    &-tt {
      font-size: 24px;
      font-weight: 500;
      width: 120px;
      text-align: left;
    }

    &-promote {
      display: flex;
      flex-wrap: wrap;
    }
    &-message {
      margin-right: 24px;
      margin-bottom: 16px;
    }
  }
}
</style>
