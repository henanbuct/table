<template>
  <div class="diagnosis">
    <p class="diagnosis-tip">温馨提示：目前“诊断结果”仅支持输出“账户问题，无效推广组，暂停关键词，有展现无点击关键词”，余下功能正在努力搭建中，敬请期待！</p>
    <div class="diagnosis-selection">
      <h3>筛选项</h3>
      <div>

        <div class="diagnosis-selection-account">
          <el-radio v-model="radio" label="account">指定账户</el-radio>
          <el-select v-model="account">
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
            v-model="accountInput"
            placeholder="请输入"
          ></el-input>

        </div>

        <div class="diagnosis-selection-client">
          <el-radio v-model="radio" label="client">指定客户</el-radio>
          <el-select v-model="client">
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
            v-model="accountClient"
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
      <el-button type="primary">查询</el-button>
      </div>
      </div>
    </div>
    <div class="diagnosis-account" v-if="radio==='account'">
      <div class="diagnosis-account-detail">
        <h3 class="diagnosis-account-detail-title">详情</h3>
        <div class="diagnosis-account-detail-data-message">
          <div class="account-account-table-message">
            <span>账户名称：账户一</span>
          </div>
          <div class="account-account-table-message">
            <span>账户ID：23232323</span>
          </div>
          <div class="account-account-table-message">
            <span>客户名称：客户一</span>
          </div>
          <div class="account-account-table-message">
            <span>客户ID：4545454545</span>
          </div>
          <br />
          <div class="account-account-table-message">
            <span>账户状态：正常</span>
          </div>
          <div class="account-account-table-message">
            <span>账户余额：30988.00元</span>
          </div>
          <div class="account-account-table-message">
            <span>余额可消耗天数：4天</span>
          </div>
          <div class="account-account-table-message">
            <span>今日消耗：88.00元</span>
          </div>
          <div class="account-account-table-message">
            <span>账户日预算：不限</span>
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
    <div class="diagnosis-client-detail" v-if="radio==='client'">
      <div class="diagnosis-client-detail-data">
        <h3 class="diagnosis-client-detail-title">详情</h3>
        <div class="diagnosis-client-detail-data-message">
          <div class="account-detail-table-message">
            <span>账户名称：账户二</span>
          </div>
          <div class="account-detail-table-message">
            <span>账户ID：23232323</span>
          </div>
          <div class="account-detail-table-message">
            <span>客户名称：客户一</span>
          </div>
          <div class="account-detail-table-message">
            <span>客户ID：4545454545</span>
          </div>
          <br />
          <div class="account-detail-table-message">
            <span>账户状态：正常</span>
          </div>
          <div class="account-detail-table-message">
            <span>账户余额：30988.00元</span>
          </div>
          <div class="account-detail-table-message">
            <span>余额可消耗天数：4天</span>
          </div>
          <div class="account-detail-table-message">
            <span>今日消耗：88.00元</span>
          </div>
          <div class="account-detail-table-message">
            <span>账户日预算：不限</span>
          </div>
        </div>
      </div>
      <div class="diagnosis-client-detail-result">
        <h3 class="diagnosis-client-detail-result-title">诊断结果</h3>
        <div class="diagnosis-client-detail-result-message">
          <div class="diagnosis-client-detail-result-account">
            <div>
            <i class="el-icon-warning"></i>
            <span>账户</span>
            </div>
          </div>
          <div class="diagnosis-client-detail-result-promote">
            <div>
              <i class="el-icon-warning"></i>
              <span>推广组</span>
            </div>
            <el-button type="primary">下载详情</el-button>
          </div>
          <div class="diagnosis-client-detail-result-word">
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
      accountClient: '',
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

  }
};
</script>
<style lang="scss">
.diagnosis {
  p{
    text-align: left;
  }
  padding: 24px;
  &-selection {
    text-align: left;
    display: flex;
    h3{
      width: 120px;
      text-align: left;
    }
    &-btn{
      text-align: right;
    }
    &-client,
    &-account{
      display: flex;
      align-items: baseline;
      margin-bottom: 16px;
      .el-select{
        margin-right: 30px;
      }
    }
    &-date{
      margin-bottom: 16px;
      .el-select{
        margin-right: 30px;
      }
    }
  }
  &-client {
    &-detail {
      &-data {
          display: flex;
          align-items: baseline;
          h3{
            width: 120px;
            text-align: left;
          }
        &-message {
          display: flex;
        }
      }
      &-title {
        width: 120px;
      }
      &-result {
        h3{
          width: 120px;
          text-align: left;
        }
        &-message {
          width: 100%;
        }
        width: 100%;
        display: flex;
        align-items: baseline;
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
  &-account {
    &-detail {
      display: flex;
      flex-direction: row;
      align-items: baseline;
      width: 100%;
      h3{
        width: 120px;
        text-align: left;
      }
      &-title {
        width: 120px;
      }
      &-data {
        h3{
          width: 120px;
          text-align: left;
        }
        &-message{
          display: flex;
        }
      }
    }
    &-data {
      display: flex;
      align-items: baseline;
       h3{
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
