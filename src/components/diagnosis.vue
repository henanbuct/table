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
          <span style="margin-right:42px">选择时间</span>
          <el-date-picker
            v-model="dateString"
            type="date"
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
            <span>账户余额：{{accountAmount}}元</span>
          </div>
          <div class="diagnosis-account-detail-table-message">
            <span>余额可消耗天数：{{consumeDays}}天</span>
          </div>
          <div class="diagnosis-account-detail-table-message">
            <span>今日消耗：{{opDate}}元</span>
          </div>
          <div class="diagnosis-account-detail-table-message">
            <span>账户日预算：{{count}}</span>
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
          <p class="diagnosis-account-data-result-tip">您的账户在2019年10月18日，由于XX原因，已违规，请及时处理</p>
          <div class="diagnosis-account-data-result-promote">
            <div>
              <i class="el-icon-warning"></i>
              <span>推广组</span>
            </div>
            <el-button type="primary">下载详情</el-button>
          </div>
          <p
            class="diagnosis-account-data-result-tip"
          >系统检测到您目前有5个(15%)无效推广组，其中3个未添加物料，1个物料审核未通过，一个物料暂停，建议您及时修改</p>
          <div class="diagnosis-account-data-result-word">
            <div>
              <i class="el-icon-warning"></i>
              <span>关键词</span>
            </div>
            <el-button type="primary">下载详情</el-button>
          </div>
          <p
            class="diagnosis-account-data-result-tip"
          >1，系统检测到您目前有50个(15%)关键词暂停，其中有48个为行业活跃词，建议您重新开启关键词</p>
          <p
            class="diagnosis-account-data-result-tip"
          >2，系统检测到您目前有32个(15%)有展现无点击的关键词平均展现量为40000，其中17个由于创意相关性较差，15个由于关键性排名较低没有形成点击，建议您及时修改</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
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
      accountAmount: '',
      consumeDays: 0,
      opDate: '',
      count: '',
      dateString: '',
      diagramType: ''
    };
  },
  //监听数据变化
  watch: {
    dateString (val) {
      console.log("dateString", moment(val).format('YYYY-MM-DD'))
    },
  },

  methods: {
    //查询函数
    searchDiagnosis () {
      let params = {}
      if (this.radio === 'account') {
        if (this.account === 'name') {
          params.accountName = this.accountInput
        } else {
          params.accountId = this.accountInput
        }
      } else {
        if (this.client === 'name') {
          params.customName = this.clientInput
        } else {
          params.customId = this.clientInput
        }
      }
      params.dateString = moment(this.dateString).format('YYYY-MM-DD')

      this.$axios.post('https://www.fastmock.site/mock/0b492904d3072f00705b34b0d2204207/account/diagnosis/select', params).then(res => {
        if (res.status === 200) {
          if (res.data.code === '200') {
            this.accountName = res.data.data.accountInfo.accountName
            this.accountId = res.data.data.accountInfo.accountId
            this.clientName = res.data.data.accountInfo.clientName
            this.clientId = res.data.data.accountInfo.clientId
            this.accountStatus = res.data.data.accountInfo.accountStatus ? '正常' : '非正常'
            this.accountAmount = res.data.data.accountInfo.accountAmount || 0
            this.consumeDays = res.data.data.accountInfo.consumeDays || 0
            this.opDate = res.data.data.accountResult.opDate || 0
            this.count = res.data.data.accountResult.count || 0
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
      &-table {
        &-message {
          width: 256px;
          margin-bottom: 8px;
          text-align: left;
          margin-right: 16px;
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
          border: 1px solid #dcdfe6;
          display: flex;
          width: 100%;
          justify-content: space-between;
          margin-bottom: 16px;
          padding: 6px 8px;
          align-items: center;
          i {
            color: red;
          }
        }
      }
    }
  }
}
</style>
