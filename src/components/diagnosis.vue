<template>
  <div class="diagnosis">
    <p class="diagnosis-tip">温馨提示：目前“诊断结果”仅支持输出“账户问题，无效推广组，暂停关键词，有展现无点击关键词”，余下功能正在努力搭建中，敬请期待！</p>
    <div class="diagnosis-selection">
      <h3>筛选项</h3>
      <div>
        <div class="diagnosis-selection-account">
          <el-radio
            v-model="radio"
            label="account"
          >指定账户</el-radio>
          <el-select
            v-model="account"
            :disabled="radio==='client'"
          >
            <el-option
              label="名称"
              value="name"
            ></el-option>
            <el-option
              label="ID"
              value="id"
            ></el-option>
          </el-select>
          <el-input
            :disabled="radio==='client'"
            v-model="accountInput"
            placeholder="请输入"
          ></el-input>
        </div>

        <div class="diagnosis-selection-client">
          <el-radio
            v-model="radio"
            label="client"
          >指定客户</el-radio>
          <el-select
            v-model="client"
            :disabled="radio==='account'"
          >
            <el-option
              label="名称"
              value="name"
            ></el-option>
            <el-option
              label="ID"
              value="id"
            ></el-option>
          </el-select>
          <el-input
            :disabled="radio==='account'"
            v-model="clientInput"
            placeholder="请输入"
          ></el-input>
        </div>

        <div class="diagnosis-selection-date">
          <el-select v-model="date">
            <el-option
              label="按日"
              value="day"
            ></el-option>
            <el-option
              label="按周"
              value="week"
            ></el-option>
            <el-option
              label="按月"
              value="month"
            ></el-option>
          </el-select>
          <el-date-picker
            v-if="date === 'day'"
            v-model="day"
            type="date"
          ></el-date-picker>
          <el-date-picker
            v-if="date === 'week'"
            v-model="week"
            type="week"
          ></el-date-picker>
          <el-date-picker
            v-if="date === 'month'"
            v-model="month"
            type="month"
          ></el-date-picker>
        </div>
        <div class="diagnosis-selection-btn">
          <el-button
            type="primary"
            @click="searchDiagnosis"
          >查询</el-button>
        </div>
      </div>
    </div>
    <div class="diagnosis-account">
      <div class="diagnosis-account-detail">
        <h3 class="diagnosis-account-detail-title">详情</h3>
        <div class="diagnosis-account-detail-data-message">
          <div
            class="diagnosis-account-detail-table-message"
            v-if="radio==='account'"
          >
            <span>账户名称：{{accountName}}</span>
          </div>
          <div
            class="diagnosis-account-detail-table-message"
            v-if="radio==='account'"
          >
            <span>账户ID：{{accountId}}</span>
          </div>
          <div
            class="diagnosis-account-detail-table-message"
            v-if="radio==='client'"
          >
            <span>客户名称：{{clientName}}</span>
          </div>
          <div
            class="diagnosis-account-detail-table-message"
            v-if="radio==='client'"
          >
            <span>客户ID：{{clientId}}</span>
          </div>
          <br />
          <div class="diagnosis-account-detail-table-message">
            <span>账户状态：{{accountStatus}}</span>
          </div>
          <div class="diagnosis-account-detail-table-message">
            <span>账户余额：{{balance}}元</span>
          </div>
          <div class="diagnosis-account-detail-table-message">
            <span>余额可消耗天数：{{balanceLastDay}}天</span>
          </div>
          <div class="diagnosis-account-detail-table-message">
            <span>今日消耗：{{todayPay}}元</span>
          </div>
          <div class="diagnosis-account-detail-table-message">
            <span>账户日预算：{{budget}}</span>
          </div>
        </div>
      </div>
      <div class="diagnosis-account-data">
        <h3>诊断结果</h3>
        <div class="diagnosis-account-data-result">
          <div class="diagnosis-account-data-result-account">
            <div>
              <i class="el-icon-warning"></i>
              <span>账户</span>
            </div>
          </div>
          <div class="diagnosis-account-data-result-promote">
            <div>
              <i class="el-icon-warning"></i>
              <span>推广组</span>
            </div>
            <el-button type="primary">下载详情</el-button>
          </div>
          <div class="diagnosis-account-data-result-word">
            <div>
              <i class="el-icon-warning"></i>
              <span>关键词</span>
            </div>
            <el-button type="primary">下载详情</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      radio: 'account',
      account: '',
      client: '',
      accountInput: '',
      clientInput: '',
      accountName: '',
      accountId: '',
      clientName: '',
      clientId: '',
      accountStatus: '',
      balance: '',
      balanceLastDay: 0,
      todayPay: '',
      budget: '',
      date: 'day',
      day: '',
      week: '',
      month: ''
    };
  },
  //监听数据变化
  watch: {
    userSelection (val) {
      console.log("userSelection", val)
    },
    radio (val) {
      console.log("radio", val)
    },
  },

  methods: {
    //查询函数
    searchDiagnosis () {
      let params = {

      }
      if (this.radio === 'account') {
        params.diagnosisType = 'account'
        params.diagnosisMethod = this.account
        params.diagnosisId = this.accountInput
      } else {
        params.diagnosisType = 'client'
        params.diagnosisMethod = this.client
        params.diagnosisId = this.clientInput
      }

      this.$axios.get('https://www.fastmock.site/mock/0b492904d3072f00705b34b0d2204207/account/diagnosis', params).then(res => {
        console.log("diagnosisType", res)
        if (res.status === 200) {
          if (res.data.code === '200') {
            this.accountName = res.data.result.accountName
            this.accountId = res.data.result.accountId
            this.clientName = res.data.result.clientName
            this.clientId = res.data.result.clientId
            this.accountStatus = res.data.result.accountStatus
            this.balance = res.data.result.balance
            this.balanceLastDay = res.data.result.balanceLastDay
            this.todayPay = res.data.result.todayPay
            this.budget = res.data.result.budget
          }
        } else {
          console.log("获取接口失败")
        }
      })
    }

  }
};
</script>
<style lang="scss">
.diagnosis {
  p {
    text-align: left;
  }
  padding: 24px;
  &-selection {
    text-align: left;
    display: flex;
    h3 {
      width: 120px;
      text-align: left;
    }
    &-btn {
      text-align: right;
    }
    &-client,
    &-account {
      display: flex;
      align-items: baseline;
      margin-bottom: 16px;
      .el-select {
        margin-right: 30px;
      }
    }
    &-date {
      margin-bottom: 16px;
      .el-select {
        margin-right: 30px;
      }
    }
  }

  &-account {
    &-detail {
      display: flex;
      flex-direction: row;
      align-items: baseline;
      width: 100%;
      h3 {
        width: 120px;
        text-align: left;
      }
      &-title {
        width: 120px;
      }
      &-data {
        h3 {
          width: 120px;
          text-align: left;
        }
        &-message {
          display: flex;
          flex-wrap: wrap;
        }
      }
      &-table{
        &-message{
          width: 256px;
    margin-bottom: 8px;
    text-align: left;
        }
      }

    }
    &-data {
      display: flex;
      align-items: baseline;
      h3 {
        width: 120px;
        text-align: left;
      }
      &-result {
        width: 100%;
        text-align: left;
        &-account,
        &-promote,
        &-word {
          display: flex;
          width: 100%;
          justify-content: space-between;
          margin-bottom: 16px;
          i {
            color: red;
          }
        }
      }
    }
  }
}
</style>
