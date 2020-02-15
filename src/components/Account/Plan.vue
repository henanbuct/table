<template>
  <div class="account-plan">
    <div class="account-plan-detail">
      <p class="account-plan-detail-title">计划：</p>

      <div class="account-plan-detail-promote">
        <p>
          计划预算不足 >
          <span>3</span>/10
        </p>
        <p>
          暂停 >
          <span>1</span>/10
        </p>
      </div>
    </div>

    <div class="account-plan-content">
      <div class="account-plan-content-table">
        <div class="account-plan-content-table-btn">
          <el-select
            v-model="status"
            placeholder="请选择状态"
          >
            <el-option
              v-for="item in planOptions"
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
        <div class="account-plan-content-table-data">
          <el-table
            :data="planData"
            border
            style="width: 100%"
            size="small"
          >
            <el-table-column
              prop="planName"
              label="推广计划"
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="status"
              label="状态"
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="reason"
              label="原因"
            ></el-table-column>
            <el-table-column
              prop="first_time"
              label="第一次撞线"
            ></el-table-column>
            <el-table-column
              prop="last_time"
              label="最后一次撞线"
            ></el-table-column>
            <el-table-column
              prop="yesterday_cost"
              label="当前消耗/元"
            ></el-table-column>
            <el-table-column
              prop="beforeyesterday_cost"
              label="前一天消耗/元"
              min-width="120"
            ></el-table-column>
            <el-table-column
              prop="budget_day"
              label="当前预算/元"
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
  data () {
    return {
      status: '',
      planOptions: [],
      planData: [],
      curPage: 1,
      pageSize: 3,
      total: 0,
    }
  },
  mounted () {
    this.planOptions = [
      {
        label: '计划预算不足',
        value: '计划预算不足'
      },
      {
        label: '暂停',
        value: '暂停'
      }
    ];
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
        status: '',
        page: this.curPage
      }

      this.$axios.post('https://www.fastmock.site/mock/0b492904d3072f00705b34b0d2204207/account/account/selectPlan', params).then(res => {
        console.log("?????", res)
        if (res.status === 200) {
          if (res.data.code === 0) {
            this.total = res.data.total
            this.planData = res.data.data && res.data.data.length > 0 ? res.data.data : []
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
.account-plan {
  display: flex;
  flex-direction: column;
  &-detail {
    align-items: flex-end;
    display: flex;
    &-title {
      font-size: 24px;
      font-weight: 500;
      width: 120px;
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
