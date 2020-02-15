<template>
  <div class="client-account">
    <div class="client-account-detail">
      <p class="client-account-detail-title">账户：</p>
      <div class="client-account-detail-promote">
        <p>
          昨日撞线账户 >
          <span>3</span>/10
        </p>
        <p>
          昨日有消耗账户 >
          <span>3</span>/10
        </p>
        <p>
          当前无余额账户 >
          <span>3</span>/10
        </p>
        <p>
          昨日波动账户 >
          <span>0</span>/10
        </p>
        <p>
          待解封账户 >
          <span>1</span>/10
        </p>
      </div>
    </div>
    <div class="client-account-content">
      <div class="client-account-content-table">
        <div class="client-account-content-table-btn">
          <el-select
            v-model="status"
            placeholder="请选择状态"
          >
            <el-option
              v-for="item in accountOptions"
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
        <div class="client-account-table-content-data">
          <el-table
            :data="accountData"
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
              prop="businessScope"
              label="业务范围"
            ></el-table-column>
            <el-table-column
              prop="channelsManager"
              label="渠道经理"
            ></el-table-column>
            <el-table-column
              prop="businessManager"
              label="业务经理"
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="state"
              label="状态"
            ></el-table-column>
            <el-table-column
              prop="reason"
              label="原因"
              min-width="120"
            ></el-table-column>
            <el-table-column
              prop="budget"
              label="账户预算"
              min-width="80"
            ></el-table-column>
            <el-table-column
              prop="balance"
              label="余额"
            ></el-table-column>
            <el-table-column
              prop="total"
              label="总消耗"
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
      accountOptions: [],
      accountData: [],
      curPage: 1,
      pageSize: 3,
      total: 0,
    }
  },
  mounted () {
    this.accountOptions = [
      {
        label: '暂停',
        value: '暂停'
      },
      {
        label: '正常',
        value: '正常'
      },
      {
        label: '异常',
        value: '异常'
      }
    ];
    this.getClientAccount();
  },
  methods: {
    //分页
    handlePageChange (val) {
      this.curPage = val;
      this.getClientAccount();
    },
    //查询函数
    getClientAccount () {
      let params = {
        status: '',
        page: this.curPage
      }

      this.$axios.post('https://www.fastmock.site/mock/0b492904d3072f00705b34b0d2204207/account/account/selectPlan', params).then(res => {
        console.log("?????", res)
        if (res.status === 200) {
          if (res.data.code === 0) {
            this.total = res.data.total
            this.accountData = res.data.data && res.data.data.length > 0 ? res.data.data : []
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
.client-account {
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
