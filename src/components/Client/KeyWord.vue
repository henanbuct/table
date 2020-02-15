<template>
  <div class="client-keyWord">
    <div class="client-keyWord-detail">
      <p class="client-keyWord-detail-title">关键词：</p>
      <div class="client-keyWord-detail-promote">
        <p>
          消费中关键词>
          <span>3</span>/10
        </p>
        <p>
          消耗下降关键词 >
          <span>3</span>/10
        </p>
        <p>
          有展现无点击关键词 >
          <span>3</span>/10
        </p>

        <p>
          无展现关键词 >
          <span>1</span>/10
        </p>
        <p>
          审核中关键词 >
          <span>1</span>/10
        </p>
        <p>
          审核未通过关键词 >
          <span>1</span>/10
        </p>
        <p>
          无效关键词 >
          <span>1</span>/10
        </p>
        <p>
          暂停关键词 >
          <span>1</span>/10
        </p>
      </div>
    </div>
    <div class="client-keyWord-content">
      <div class="client-keyWord-content-table">
        <div class="client-keyWord-content-table-btn">
          <el-select
            v-model="keyWordStatus"
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
        <div class="client-keyWord-content-table-data">
          <el-table
            :data="keyWordData"
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
              label="关键词总量"
            ></el-table-column>
            <el-table-column
              prop="cost_num"
              label="有消耗"
            ></el-table-column>
            <el-table-column
              prop="cost_decrease_num"
              label="消费下降"
            ></el-table-column>
            <el-table-column
              prop="show_unclick_num"
              label="有展现无点击"
            ></el-table-column>
            <el-table-column
              prop="unshow_num"
              label="无展现"
            ></el-table-column>
            <el-table-column
              prop="check_fail_num"
              label="审核未通过"
            ></el-table-column>
            <el-table-column
              prop="invalid_num"
              label="无效"
            ></el-table-column>
            <el-table-column
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
  data () {
    return {
      status: '',
      keyWordOptions: [],
      keyWordData: [],
      curPage: 1,
      pageSize: 3,
      total: 0,
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

      this.$axios.post('https://www.fastmock.site/mock/0b492904d3072f00705b34b0d2204207/account/custom/selectKeyword', params).then(res => {
        console.log("???keyWordData??", res)
        if (res.status === 200) {
          if (res.data.code === 0) {
            this.total = res.data.total
            this.keyWordData = res.data.data && res.data.data.length > 0 ? res.data.data : []
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
.client-keyWord {
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
