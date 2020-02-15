<template>
  <div class="client">
    <div class="client-detail">
      <span class="client-detail-tt">详情：</span>
      <div class="client-detail-promote">
        <div class="client-detail-message">
          <span>客户名称：{{clientName}}</span>
        </div>
        <div class="client-detail-message">
          <span>客户ID：{{clientId}}</span>
        </div>
        <div class="client-detail-message">
          <span>账户总数：{{accountAmount}}元</span>
        </div>
      </div>
    </div>
    <Account></Account>
    <Plan></Plan>
    <Group></Group>
    <KeyWord></KeyWord>
    <SearchWord></SearchWord>
    <Idea></Idea>
    <Style></Style>
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
      name: '',
      id: '',
      count: '',
      accountData: [],
      status: '',
      options: [],
      planData: [],
      promotionData: [],
      keyWordData: [],
      searchData: [],
      creationData: [],
      highStyleData: []
    };
  },

  //渲染数据
  mounted () {
    this.getAccountData()
  },
  methods: {

    //请求数据的接口
    getAccountData () {
      this.accountData = [{
        name: "加班使我快乐",
        id: '479291',
        businessScope: '业务范围11',
        channelsManager: '渠道经理11',
        businessManager: '业务经理11',
        state: '状态11',
        reason: '原因11',
        budget: '账户预算11',
        balance: '余额11',
        total: '总消耗11'
      }];
      this.options = [
        {
          value: "正常",
          lable: "1"
        },
        {
          value: "暂停",
          lable: "2"
        },
        {
          value: "待审核",
          lable: "3"
        },
        {
          value: "拒绝",
          lable: "4"
        },
        {
          value: "不通过",
          lable: "5"
        },
      ]
    }
  }
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
