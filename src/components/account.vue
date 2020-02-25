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
    <Plan v-bind:account="account"></Plan>
    <Group v-bind:account="account"></Group>
    <KeyWord v-bind:account="account"></KeyWord>
    <SearchWord v-bind:account="account"></SearchWord>
    <Idea v-bind:account="account"></Idea>
    <Style v-bind:account="account"></Style>
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
      accountData: {},
      accountStatus: '',
      accountAmount: '',
      consumeDays: 0,
      todayConsume: '',
      accountDailyBudget: '',
      account: {}
    };
  },

  created () {

    this.accountData = this.$route.params.accountInfo
    this.account = this.$route.params
    this.accountName = this.$route.params.accountInfo.accountName || ''
    this.accountId = this.$route.params.accountInfo.accountId || ''
    this.clientName = this.$route.params.accountInfo.clientName || ''
    this.clientId = this.$route.params.accountInfo.clientId || ''
    this.accountStatus = this.$route.params.accountInfo.accountStatus ? '正常' : '非正常'
    this.accountAmount = this.$route.params.accountInfo.accountAmount || 0
    this.consumeDays = this.$route.params.accountInfo.consumeDays || 0
    this.todayConsume = this.$route.params.accountInfo.todayConsume || 0
    this.accountDailyBudget = this.$route.params.accountInfo.accountDailyBudget || 0
    console.log(">>>>>>>>", this.account)
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
