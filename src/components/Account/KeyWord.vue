<template>
  <div class="account-keyWord">
    <div class="account-keyWord-detail">
      <p class="account-keyWord-detail-title">关键词：</p>
      <div class="account-keyWord-detail-promote">
        <p>
          有消耗>
          <span>{{otherInfo.cost_num}}</span>/{{otherInfo.total_num}}
        </p>
        <p>
          消耗下降 >
          <span>{{otherInfo.cost_decrease_num}}</span>/{{otherInfo.total_num}}
        </p>
        <p>
          有展现无点击 >
          <span>{{otherInfo.show_unclick_num}}</span>/{{otherInfo.total_num}}
        </p>
        <p>
          无展现 >
          <span>{{otherInfo.unshow_num}}</span>/{{otherInfo.total_num}}
        </p>
        <p>
          审核未通过 >
          <span>{{otherInfo.check_fail_num}}</span>/{{otherInfo.total_num}}
        </p>
        <p>
          无效 >
          <span>{{otherInfo.invalid_num}}</span>/{{otherInfo.total_num}}
        </p>
        <p>
          暂停 >
          <span>{{otherInfo.pause_num}}</span>/{{otherInfo.total_num}}
        </p>
      </div>
    </div>
    <div class="account-keyWord-content">
      <div class="account-keyWord-content-table">
        <div class="account-keyWord-content-table-btn">
          <el-select
            v-model="status"
            placeholder="请选择状态"
          >
            <el-option
              v-for="item in keyWordOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button
            type="primary"
            size="small"
          >下载</el-button>
        </div>
        <div class="aaccount-keyWord-content-table-data">
          <el-table
            :data="keyWordData"
            border
            style="width: 100%"
            size="small"
          >
            <el-table-column
              prop="keyword"
              label="关键词"
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="planName"
              label="推广计划"
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="groupName"
              label="推广组"
            ></el-table-column>
            <el-table-column
              prop="status"
              label="状态"
            ></el-table-column>
            <el-table-column
              v-if="status==='消耗下降'"
              prop="isnegative"
              label="昨日是否有负向操作"
            ></el-table-column>
            <el-table-column
              v-if="status==='消耗下降'"
              prop="isdecrease"
              label="昨日流量是否下降"
            ></el-table-column>
            <el-table-column
              v-if="status==='审核未通过' || status==='无效' || status==='暂停'"
              prop="reason"
              label="原因"
            ></el-table-column>
            <el-table-column
              prop="match"
              label="匹配"
            ></el-table-column>
            <el-table-column
              prop="price"
              label="出价"
            ></el-table-column>
            <el-table-column
              v-if="status==='无效'"
              prop="pc_base_price"
              label="计算机起价"
            ></el-table-column>
            <el-table-column
              v-if="status==='无效'"
              prop="wx_base_price"
              label="移动起价"
            ></el-table-column>
            <el-table-column
              v-if="status==='暂停'"
              prop="pause_time"
              label="暂停时间"
            ></el-table-column>
            <el-table-column
              prop="pc_quality"
              label="计算机质量度"
            ></el-table-column>
            <el-table-column
              prop="wx_quality"
              label="移动质量度"
            ></el-table-column>
            <el-table-column
              v-if="status==='有展现无点击'"
              prop="query_pv"
              label="展现量"
              min-width="80"
            ></el-table-column>
            <el-table-column
              v-if="status==='有展现无点击'"
              prop="cpcrank"
              label="平均排名"
              min-width="80"
            ></el-table-column>
            <el-table-column
              prop="query_pv"
              label="搜索总量"
              min-width="80"
            ></el-table-column>
            <el-table-column
              prop="yesterday_cost"
              label="本期消耗/元"
              min-width="80"
            ></el-table-column>
            <el-table-column
              prop="beforeyesterday_cost"
              label="上期消耗/元"
              min-width="80"
            ></el-table-column>
            <el-table-column
              v-if="status==='消耗下降'"
              prop="decrease_cost"
              label="下降金额/元"
              min-width="80"
            ></el-table-column>
            <el-table-column
              v-if="status==='消耗下降'"
              prop="growth_rate"
              label="增长率"
              min-width="80"
            ></el-table-column>
            <el-table-column
              v-if="status==='暂停'"
              prop="competition"
              label="竞品是否投放"
              min-width="80"
            ></el-table-column>
            <el-table-column
              v-if="status==='暂停'"
              prop="default_url"
              label="默认访问url"
              min-width="80"
            ></el-table-column>
            <el-table-column
              v-if="status==='暂停'"
              prop="wx_url"
              label="移动访问url"
              min-width="80"
            ></el-table-column>
          </el-table>
        </div>
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page.sync="curPage"
          :page-size="pageSize"
          :total="total"
          size="small"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    account: Object
  },
  data () {
    return {
      status: null,
      keyWordOptions: [],
      keyWordData: [],
      curPage: 1,
      pageSize: 10,
      total: 0,
      otherInfo: '',
    }
  },
  watch: {
    status (val) {
      this.getAccountPlan();
    }
  },
  mounted () {
    this.keyWordOptions = [
      {
        label: '有消耗',
        value: '有消耗'
      },
      {
        label: '消耗下降',
        value: '消耗下降'
      },
      {
        label: '有展现无点击',
        value: '有展现无点击'
      },
      {
        label: '无展现',
        value: '无展现'
      },
      {
        label: '审核未通过',
        value: '审核未通过'
      },
      {
        label: '无效',
        value: '无效'
      },
      {
        label: '暂停',
        value: '暂停'
      }
    ];
    this.status = '有消耗';
    this.getAccountPlan();
  },
  methods: {
    //分页
    handlePageChange (val) {
      this.curPage = val;
      this.getAccountPlan();
    },
    //查询函数
    getAccountPlan () {
      let params = {
        status: this.status,
        page: this.curPage,
        pageSize: this.pageSize
      }

      if (this.account.accountName) {
        params.accountName = this.account.accountName
      } else {
        params.accountId = this.account.accountId
      }

      if(this.account.dateString){
        params.dateString = this.account.dateString
      }

      this.$axios.post('/account/analysis/account/selectKeyword', params).then(res => {

        if (res.status === 200) {
          if (res.data.code === 0) {
            this.total = res.data.total
            this.keyWordData = res.data.data && res.data.data.length > 0 ? res.data.data : []
            this.otherInfo = res.data.otherInfo ? res.data.otherInfo : ''
          }
        } else {
          console.log("获取接口失败")
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.account-keyWord {
  display: flex;
  flex-direction: column;
  &-detail {
    align-items: baseline;
    display: flex;
    &-title {
      font-size: 24px;
      font-weight: 500;
      width: 176px;
      text-align: left;
    }
    &-promote {
      display: flex;
      flex-wrap: wrap;
      p {
        margin-right: 24px;
        margin-top: 0px;
        margin-bottom: 8px;
      }
    }
  }
  &-content {
    &-table {
      &-btn {
        text-align: right;
        margin-bottom: 8px;
      }
      &-data {
        .el-table {
          th {
            background-color: #409eff;
          }
        }
      }
      .el-pagination {
        text-align: right;
        margin-top: 8px;
      }
    }
  }
}
</style>
<style lang="scss">
</style>
