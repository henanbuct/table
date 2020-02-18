<template>
  <div class="account-style">
    <div class="account-style-detail">
      <p class="account-style-detail-title">高级样式：</p>
      <div class="account-style-detail-promote">
        <p>
          计算机皇冠列表 >
          <span>3</span>/10
        </p>
        <p>
          移动皇冠列表 >
          <span>3</span>/10
        </p>
        <p>
          计算机皇冠通用词 >
          <span>3</span>/10
        </p>

        <p>
          移动皇冠通用词 >
          <span>1</span>/10
        </p>
        <p>
          计算机超级皇冠样式 >
          <span>1</span>/10
        </p>
        <p>
          移动超级皇冠样式 >
          <span>1</span>/10
        </p>
      </div>
    </div>
    <div class="account-style-content">
      <div class="account-style-content-table">
        <div class="account-style-content-table-btn">
          <el-select
            v-model="status"
            placeholder="请选择状态"
          >
            <el-option
              v-for="item in styleOptions"
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
        <div class="account-style-content-table-data">
          <el-table
            :data="styleData"
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
              prop="groupName"
              label="推广组"
            ></el-table-column>
            <el-table-column
              prop="groupName"
              label="推广组状态"
            ></el-table-column>
            <el-table-column
              prop="pcCrownListNum"
              label="计算机皇冠列表"
            ></el-table-column>
            <el-table-column
              prop="mobileCrownListNum"
              label="移动皇冠列表"
            ></el-table-column>
            <el-table-column
              prop="pcCrownGeneralWordNum"
              label="计算机皇冠通用词"
            ></el-table-column>
            <el-table-column
              prop="mobileCrownGeneralWordNum"
              label="移动皇冠通用词"
            ></el-table-column>
            <el-table-column
              prop="pcSuperCrownStyleNum"
              label="计算机皇冠超级样式"
            ></el-table-column>
            <el-table-column
              prop="mobileSuperCrownStyleNum"
              label="移动皇冠超级样式"
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
      styleOptions: [],
      styleData: [],
      curPage: 1,
      pageSize: 10,
      total: 0,
    }
  },
  mounted () {
    this.styleOptions = [
      {
        label: '计算机皇冠列表',
        value: '计算机皇冠列表'
      },
      {
        label: '移动皇冠列表',
        value: '移动皇冠列表'
      },
      {
        label: '计算机皇冠通用词',
        value: '计算机皇冠通用词'
      },
      {
        label: '移动皇冠通用词',
        value: '移动皇冠通用词'
      },
      {
        label: '计算机超级皇冠样式',
        value: '计算机超级皇冠样式'
      },
      {
        label: '移动超级皇冠样式',
        value: '移动超级皇冠样式'
      }
    ];
    this.getAccountStyle();
  },
  methods: {
    //分页
    handlePageChange (val) {
      this.curPage = val;
      this.getAccountStyle();
    },
    //查询函数
    getAccountStyle () {
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

      this.$axios.post('/account/analysis/account/selectStyle', params).then(res => {
        if (res.status === 200) {
          if (res.data.code === 0) {
            this.total = res.data.total
            this.styleData = res.data.data && res.data.data.length > 0 ? res.data.data : []
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
.account-style {
  display: flex;
  flex-direction: column;
  &-detail {
    align-items: baseline;
    display: flex;
    &-title {
      font-size: 24px;
      font-weight: 500;
      width: 160px;
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
