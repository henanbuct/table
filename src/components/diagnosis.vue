<template>
  <div class="diagnosis">
    <p class="diagnosis-tip">温馨提示：目前“诊断结果”仅支持输出“账户问题，无效推广组，暂停关键词，有展现无点击关键词”，余下功能正在努力搭建中，敬请期待！</p>
    <div class="diagnosis-selection">
      <h4>筛选项</h4>
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
        <h4 class="diagnosis-account-detail-title">详情</h4>
        <div class="diagnosis-account-detail-data-message">
          <div
            class="diagnosis-account-detail-table-message"
            v-if="radio==='account'"
          >
            <p>
              账户名称：
              <span @click="linkAccountId">{{accountName}}</span>
            </p>
          </div>
          <div
            class="diagnosis-account-detail-table-message"
            v-if="radio==='account'"
          >
            <p>
              账户ID：
              <span @click="linkAccountId">{{accountId}}</span>
            </p>
          </div>
          <div
            class="diagnosis-account-detail-table-message"
            v-if="radio==='client'"
          >
            <p>
              客户名称：
              <span @click="linkClientId">{{customName}}</span>
            </p>
          </div>
          <div
            class="diagnosis-account-detail-table-message"
            v-if="radio==='client'"
          >
            <p>
              客户ID：
              <span @click="linkClientId">{{customId}}</span>
            </p>
          </div>
          <br />
          <div class="diagnosis-account-detail-table-message"
               v-if="radio==='client'">
            <span>账户总数：{{accountCount}}</span>
          </div>
          <div class="diagnosis-account-detail-table-message"
               v-if="radio==='account'">
            <span>账户状态：{{accountStatus}}</span>
          </div>
          <div class="diagnosis-account-detail-table-message"
               v-if="radio==='account'">
            <span>账户余额：{{accountAmount}}元</span>
          </div>
          <div class="diagnosis-account-detail-table-message"
               v-if="radio==='account'">
            <span>余额可消耗天数：{{consumeDays}}天</span>
          </div>
          <div class="diagnosis-account-detail-table-message"
               v-if="radio==='account'">
            <span>今日消耗：{{todayConsume}}元</span>
          </div>
          <div class="diagnosis-account-detail-table-message"
               v-if="radio==='account'">
            <span>账户日预算：{{accountDailyBudget}}</span>
          </div>
        </div>
      </div>
      <div class="diagnosis-account-data">
        <h4>诊断结果</h4>
        <div class="diagnosis-account-data-result">
          <div class="diagnosis-account-data-result-account">
            <div>
              <i class="el-icon-warning"></i>
              <span>账户</span>
            </div>
          </div>
          <p
            class="diagnosis-account-data-result-tip"
          >{{description}}</p>
          <div class="diagnosis-account-data-result-promote">
            <div>
              <i class="el-icon-warning"></i>
              <span>推广组</span>
            </div>
            <el-button type="primary">下载详情</el-button>
          </div>
          <p
            class="diagnosis-account-data-result-tip"
          >系统检测到您目前有{{groupTotalInvalidNumber}}个({{groupInvalidRate}}%)无效推广组，其中{{groupInvalidIdeaNumber}}个无有效创意，{{groupInvalidKeywordNumber}}个无有效关键词，建议您及时修改！</p>
          <div class="diagnosis-account-data-result-word">
            <div>
              <i class="el-icon-warning"></i>
              <span>关键词</span>
            </div>
            <el-button type="primary">下载详情</el-button>
          </div>
          <p
            class="diagnosis-account-data-result-tip"
          >1，系统检测到您目前有{{totalPauseNumber}}个({{keywordPauseRate}}%)关键词暂停，其中有{{activeNumber}}个为行业活跃词，建议您重新开启关键词！</p>
          <p
            class="diagnosis-account-data-result-tip"
          >2，系统检测到您目前有{{keywordShowUnClickNumber}}个({{keywordShowUnClickRate}}%)有展现无点击的关键词，平均展现量为{{keywordAvgPv}}，其中{{keywordIdeaNumber}}个由于创意相关性较差，{{keywordRankNumber}}个由于关键性排名较低没有形成点击，建议您及时修改！</p>
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
      customName: '',
      customId: '',
      accountStatus: '',
      accountAmount: '',
      accountCount: 0,
      consumeDays: 0,
      todayConsume: '',
      accountDailyBudget: '',
      dateString: '',
      diagramType: '',
      accountInfo: {},
      totalPauseNumber: '',
      keywordPauseRate: '',
      activeNumber: '',
      keywordShowUnClickNumber: '',
      keywordShowUnClickRate: '',
      keywordAvgPv: '',
      keywordIdeaNumber: '',
      keywordRankNumber: '',
      groupTotalInvalidNumber: '',
      groupInvalidRate: '',
      groupInvalidKeywordNumber: '',
      groupInvalidIdeaNumber: '',
      description: '',
      opDate: '',
      dateStringTmp: null
    };
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
      params.dateString = this.dateString ? moment(this.dateString).format('YYYY-MM-DD') : null;

      this.dateStringTmp = params.dateString;

      this.$axios.post('/account/analysis/diagnosis/select', params).then(res => {
        console.log("3434434", res)
        if (res.status === 200) {
          if (res.data.code === 0) {
            this.accountName = res.data.data.accountInfo.accountName
            this.accountId = res.data.data.accountInfo.accountId
            this.customName = res.data.data.accountInfo.customName
            this.customId = res.data.data.accountInfo.customId
            this.accountStatus = res.data.data.accountInfo.accountStatus ? '正常' : '非正常'
            this.accountAmount = res.data.data.accountInfo.accountAmount ? (res.data.data.accountInfo.accountAmount/100).toFixed(2) : 0
            this.accountCount = res.data.data.accountInfo.accountCount || 0
            this.consumeDays = res.data.data.accountInfo.consumeDays || 0
            this.todayConsume = res.data.data.accountInfo.todayConsume || 0
            this.accountDailyBudget = res.data.data.accountInfo.accountDailyBudget || 0
            this.accountInfo = res.data.data.accountInfo

            this.opDate = res.data.data.accountResult.opDate || ''
            this.description = res.data.data.accountResult.description || ''


            this.totalPauseNumber = res.data.data.diagnosisKeyword.totalPauseNumber
            this.keywordPauseRate = res.data.data.diagnosisKeyword.keywordPauseRate
            this.activeNumber = res.data.data.diagnosisKeyword.activeNumber
            this.keywordShowUnClickNumber = res.data.data.diagnosisKeyword.keywordShowUnClickNumber
            this.keywordShowUnClickRate = res.data.data.diagnosisKeyword.keywordShowUnClickRate
            this.keywordAvgPv = res.data.data.diagnosisKeyword.keywordAvgPv
            this.keywordIdeaNumber = res.data.data.diagnosisKeyword.keywordIdeaNumber
            this.keywordRankNumber = res.data.data.diagnosisKeyword.keywordRankNumber

            this.groupTotalInvalidNumber = res.data.data.diagnosisGroup.groupTotalInvalidNumber
            this.groupInvalidRate = res.data.data.diagnosisGroup.groupInvalidRate
            this.groupInvalidKeywordNumber = res.data.data.diagnosisGroup.groupInvalidKeywordNumber
            this.groupInvalidIdeaNumber = res.data.data.diagnosisGroup.groupInvalidIdeaNumber
          }
        } else {
          console.log("获取接口失败")
        }
      })
    },
    linkAccountName () {
      this.$emit('activeNameDiagnosis', 'account');
      this.$router.push({ name: 'account', params: { accountInfo: this.accountInfo, accountName: this.accountInfo.accountName, dateString: this.dateStringTmp  } })
    },
    linkAccountId () {
      this.$emit('activeNameDiagnosis', 'account');
      this.$router.push({ name: 'account', params: { accountInfo: this.accountInfo, accountId: this.accountInfo.accountId, dateString: this.dateStringTmp  } })
    },
    linkClientName () {
      this.$emit('activeNameDiagnosis', 'client');
      this.$router.push({ name: 'client', params: { accountInfo: this.accountInfo, customName: this.accountInfo.customName, dateString: this.dateStringTmp  } })
    },
    linkClientId () {
      this.$emit('activeNameDiagnosis', 'client');
      this.$router.push({ name: 'client', params: { accountInfo: this.accountInfo, customId: this.accountInfo.customId, dateString: this.dateStringTmp  } })
    },
  }
};
</script>
<style lang="scss">
.diagnosis {
  p {
    text-align: left;
  }
  &-selection {
    text-align: left;
    display: flex;
    > h4 {
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
      h4 {
        width: 120px;
        text-align: left;
      }

      &-data {
        h4 {
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
          margin-bottom: 8px;
          text-align: left;
          margin-right: 32px;
          p {
            margin: 0;
            span {
              color: #409eff;
            }
          }
        }
      }
    }
    &-data {
      display: flex;
      align-items: baseline;
      h4 {
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
        &-tip {
          font-size: 12px;
          margin-top: 0px;
          margin-bottom: 16px;
        }
      }
    }
  }
}
</style>
