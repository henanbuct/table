<template>
  <div class="client-search">
    <div class="client-search-detail">
      <p class="client-search-detail-title">搜索词：</p>
      <div class="client-search-detail-promote">
        <p>
          已购买搜索词>
          <span>30</span>/340
        </p>
        <p>
          未购买搜索词 >
          <span>320</span>/340
        </p>
      </div>
    </div>
    <div class="client-search-content">
      <div class="client-search-content-table">
        <div class="client-search-content-table-btn">
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
        <div class="client-search-content-table-data">
          <el-table
            :data="searchData"
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
              label="搜索词总量"
            ></el-table-column>

            <el-table-column
              prop="purchase_num"
              label="购买总量"
            ></el-table-column>
            <el-table-column
              prop="purchase_rate"
              label="购买比例"
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
      searchOptions: [],
      searchData: [],
      curPage: 1,
      pageSize: 3,
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
        status: '',
        page: this.curPage
      }

      this.$axios.post('https://www.fastmock.site/mock/0b492904d3072f00705b34b0d2204207/account/custom/selectSearchWord', params).then(res => {
        console.log("?????", res)
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
.client-search {
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
