<template>
  <div class="account">
    <div class="account-detail">
      <p class="account-detail-tt">详情：</p>
      <div class="account-detail-promote">
        <div class="account-detail-message">
          <span>账户名称：{{accountName}}</span>
        </div>
        <div class="account-detail-message">
          <span>账户ID：{{accountId}}</span>
        </div>
        <div class="account-detail-message">
          <span>客户名称：{{clientName}}</span>
        </div>
        <div class="account-detail-message">
          <span>客户ID：{{clientId}}</span>
        </div>
        <br />
        <div class="account-detail-message">
          <span>账户状态：{{accountStatus}}</span>
        </div>
        <div class="account-detail-message">
          <span>账户余额：{{accountAmount}}元</span>
        </div>
        <div class="account-detail-message">
          <span>余额可消耗天数：{{consumeDays}}天</span>
        </div>
        <div class="account-detail-message">
          <span>今日消耗：{{todayConsume}}元</span>
        </div>
        <div class="account-detail-message">
          <span>账户日预算：{{accountDailyBudget}}</span>
        </div>
      </div>
    </div>
    <Plan></Plan>
    <Group></Group>
    <KeyWord></KeyWord>
    <SearchWord></SearchWord>
    <Idea></Idea>
    <Style></Style>
  </div>
</template>
<script>
import Plan from './Account/Plan';
import Group from './Account/Group';
import KeyWord from './Account/KeyWord';
import SearchWord from './Account/SearchWord';
import Idea from './Account/Idea';
import Style from './Account/Style';
export default {
  components: {
    Plan,
    Group,
    KeyWord,
    SearchWord,
    Idea,
    Style,
  },
  data () {
    return {
      accountName: '',
      accountId: '',
      clientName: '',
      clientId: '',
      accountData: [],
      accountStatus: '',
      accountAmount: '',
      consumeDays: 0,
      todayConsume: '',
      accountDailyBudget: '',
    };
  },
  //监听数据变化
  watch: {
    hightStyleStatus (val) {
      console.log("????", val)
    },
    createStatus (val) {
      console.log("????", val)
    }
  },
  created () {
    this.accountName = this.$route.params.accountName || ''
    this.accountId = this.$route.params.accountId || ''
    this.clientName = this.$route.params.clientName || ''
    this.clientId = this.$route.params.clientId || ''
    this.accountStatus = this.$route.params.accountStatus ? '正常' : '非正常'
    this.accountAmount = this.$route.params.accountAmount || 0
    this.consumeDays = this.$route.params.consumeDays || 0
    this.todayConsume = this.$route.params.todayConsume || 0
    this.accountDailyBudget = this.$route.params.accountDailyBudget || 0
  },

};
</script>
<style scoped lang="scss">
.account {
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
