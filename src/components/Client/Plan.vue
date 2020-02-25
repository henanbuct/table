<template>
  <div class="client-plan">
    <div class="client-plan-detail">
      <p class="client-plan-detail-title">计划</p>
      <!--<div class="client-plan-detail-promote">-->
        <!--<p>-->
          <!--投放中计划 >-->
          <!--<span>3</span>/10-->
        <!--</p>-->
        <!--<p>-->
          <!--账户预算不足计划 >-->
          <!--<span>3</span>/10-->
        <!--</p>-->
        <!--<p>-->
          <!--计划预算不足计划 >-->
          <!--<span>3</span>/10-->
        <!--</p>-->
        <!--<p>-->
          <!--不在投放时段计划 >-->
          <!--<span>0</span>/10-->
        <!--</p>-->
        <!--<p>-->
          <!--暂停计划 >-->
          <!--<span>1</span>/10-->
        <!--</p>-->
        <!--<p>-->
          <!--无效计划 >-->
          <!--<span>1</span>/10-->
        <!--</p>-->
      <!--</div>-->
    </div>

    <div class="client-plan-content">
      <div class="client-plan-content-table">
        <div class="client-plan-content-table-btn">
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
        <div class="client-plan-content-table-data">
          <el-table
            :data="planData"
            border
            style="width: 100%"
            size="small"
          >
            <el-table-column
              prop="accountName"
              label="账户名称"
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="accountId"
              label="账户ID"
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="total_num"
              label="计划总量"
            ></el-table-column>
            <el-table-column
              v-if="status==='计划预算不足'"
              prop="budget_num"
              label="计划预算不足"
            ></el-table-column>
            <el-table-column
              v-if="status==='暂停'"
              prop="pause_num"
              label="暂停"
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
    client: Object
  },
  data () {
    return {
      status: null,
      planOptions: [],
      planData: [],
      curPage: 1,
      pageSize: 10,
      total: 0,
    }
  },
  watch: {
    status (val) {
      console.log("}}}}}", this.status)
      this.getAccountPlan();
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
        status: this.status,
        page: this.curPage,
        pageSize: this.pageSize
      }

      if (this.client.customName) {
        params.customName = this.client.customName
      } else {
        params.customId = this.client.customId
      }

      this.$axios.post('account/analysis/custom/selectPlan', params).then(res => {
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
.client-plan {
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
