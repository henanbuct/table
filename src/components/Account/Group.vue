<template>
  <div class="account-group">
    <div class="account-group-detail">
      <p class="account-group-detail-title">推广组：</p>
      <div class="account-group-detail-promote">
        <p>
          暂停 >
          <span>3</span>/10
        </p>
        <p>
          无有效关键词 >
          <span>3</span>/10
        </p>
        <p>
          无有效创意 >
          <span>3</span>/10
        </p>
      </div>
    </div>
    <div class="account-group-content">
      <div class="account-group-content-table">
        <div class="account-group-content-table-btn">
          <el-select
            v-model="status"
            placeholder="请选择状态"
          >
            <el-option
              v-for="item in groupOptions"
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
        <div class="account-group-content-table-data">
          <el-table
            :data="groupData"
            border
            style="width: 100%"
            size="small"
          >
            <el-table-column
              prop="groupName"
              label="推广组"
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="planName"
              label="推广计划"
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="status"
              label="状态"
              max-width="80"
            ></el-table-column>
            <el-table-column
              prop="reason"
              label="原因"
            ></el-table-column>
            <el-table-column
              prop="firstTime"
              label="第一次暂停时间"
            ></el-table-column>
            <el-table-column
              prop="lastTime"
              label="最后一次暂停时间"
            ></el-table-column>
            <el-table-column
              prop="budgetDay"
              label="当前消耗/元"
            ></el-table-column>
            <el-table-column
              prop="beforeYesterdayCost"
              label="前一天消耗/元"
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
      status: '',
      groupOptions: [],
      groupData: [],
      curPage: 1,
      pageSize: 10,
      total: 0,
    }
  },
  watch: {
    status (val) {
      this.getAccountGroup()
    }
  },

  mounted () {
    this.groupOptions = [
      {
        label: '无有效关键词',
        value: '无有效关键词'
      },
      {
        label: '无有效创意',
        value: '无有效创意'
      },
      {
        label: '暂停',
        value: '暂停'
      }
    ];
    this.getAccountGroup();
  },
  methods: {
    //分页
    handlePageChange (val) {
      this.curPage = val;
      this.getAccountGroup();
    },
    //查询函数
    getAccountGroup () {
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

      this.$axios.post('account/analysis/account/selectGroup', params).then(res => {
        if (res.status === 200) {
          if (res.data.code === 0) {
            this.total = res.data.total
            this.groupData = res.data.data && res.data.data.length > 0 ? res.data.data : []
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
.account-group {
  display: flex;
  flex-direction: column;
  &-detail {
    align-items: baseline;
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
