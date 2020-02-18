<template>
  <div class="account-search">
    <div class="account-search-detail">
      <p class="account-search-detail-title">搜索词：</p>
      <div class="account-search-detail-promote">
        <p>
          已购 >
          <span>30</span>/340
        </p>
        <p>
          未购 >
          <span>320</span>/340
        </p>
      </div>
    </div>
    <div class="account-search-content">
      <div class="account-search-content-table">
        <div class="account-search-content-table-btn">
          <el-select
            v-model="status"
            placeholder="请选择状态"
          >
            <el-option
              v-for="item in searchOptions"
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
        <div class="account-search-content-table-data">
          <el-table
            :data="searchData"
            border
            style="width: 100%"
            size="small"
          >
            <el-table-column
              prop="searchWord"
              label="搜索词"
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
              prop="keyword"
              label="关键词"
            ></el-table-column>
            <el-table-column
              prop="isPurse"
              label="匹配"
              min-width="80"
            ></el-table-column>
            <el-table-column
              prop="price"
              label="出价"
            ></el-table-column>
            <el-table-column
              prop="cost"
              label="搜索总量"
            ></el-table-column>
            <el-table-column
              prop="budget"
              label="展现"
              min-width="80"
            ></el-table-column>
            <el-table-column
              prop="click"
              label="点击"
            ></el-table-column>
            <el-table-column
              prop="cost"
              label="消耗"
              min-width="80"
            ></el-table-column>
            <el-table-column
              prop="isPurse"
              label="是否已购买"
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
      searchOptions: [],
      searchData: [],
      curPage: 1,
      pageSize: 10,
      total: 0,
    }
  },
  mounted () {
    this.searchOptions = [
      {
        label: '已购',
        value: '已购'
      },
      {
        label: '未购',
        value: '未购'
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

      if (this.account.accountName) {
        params.accountName = this.account.accountName
      } else {
        params.accountId = this.account.accountId
      }

      this.$axios.post('/account/analysis/account/selectSearchWord', params).then(res => {
        if (res.status === 200) {
          if (res.data.code === 0) {
            this.total = res.data.total
            this.searchData = res.data.data && res.data.data.length > 0 ? res.data.data : []
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
.account-search {
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
<style lang="scss">
</style>
