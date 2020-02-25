<template>
  <div class="account-idea">
    <div class="account-idea-detail">
      <p class="account-idea-detail-title">创意：</p>
      <div class="account-idea-detail-promote">
        <p>
          无展现 >
          <span>3</span>/10
        </p>
        <p>
          审核未通过 >
          <span>1</span>/10
        </p>
        <p>
          暂停 >
          <span>1</span>/10
        </p>
      </div>
    </div>
    <div class="account-idea-content">
      <div class="account-idea-content-table">
        <div class="account-idea-content-table-btn">
          <el-select
            v-model="status"
            placeholder="请选择状态"
          >
            <el-option
              v-for="item in ideaOptions"
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
        <div class="account-idea-content-table-data">
          <el-table
            :data="ideaData"
            border
            style="width: 100%"
            size="small"
          >
            <el-table-column
              prop="ideaId"
              label="创意ID"
              min-width="80"
            ></el-table-column>
            <el-table-column
              prop="title"
              label="创意标题"
            ></el-table-column>
            <el-table-column
              prop="planName"
              label="推广计划"
            ></el-table-column>
            <el-table-column
              prop="groupName"
              label="推广组"
            ></el-table-column>
            <el-table-column
              prop="status"
              label="状态"
              min-width="40"
            ></el-table-column>
            <el-table-column
              v-if="status==='审核未通过' || status==='暂停'"
              prop="reason"
              min-width="70"
              label="原因"
            ></el-table-column>
            <el-table-column
              v-if="status==='暂停'"
              prop="pause_time"
              label="暂停时间"
              min-width="80"
            ></el-table-column>
            <el-table-column
              prop="desc1"
              label="描述1"
              min-width="80"
            ></el-table-column>
            <el-table-column
              prop="desc2"
              label="描述2"
              min-width="80"
            ></el-table-column>

            <el-table-column
              prop="default_visiturl"
              label="默认访问url"
              min-width="80"
            ></el-table-column>
            <el-table-column
              prop="default_showurl"
              label="默认显示url"
              min-width="80"
            ></el-table-column>
            <el-table-column
              prop="wx_visiturl"
              label="移动访问url"
              min-width="80"
            ></el-table-column>
            <el-table-column
              prop="wx_showurl"
              label="移动显示url"
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
      ideaOptions: [],
      ideaData: [],
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
    this.ideaOptions = [
      {
        label: '无展现',
        value: '无展现'
      },
      {
        label: '审核未通过',
        value: '审核未通过'
      },
      {
        label: '暂停',
        value: '暂停'
      }
    ];
    this.status = '无展现';
    this.getAccountIdea();
  },
  methods: {
    //分页
    handlePageChange (val) {
      this.curPage = val;
      this.getAccountIdea();
    },
    //查询函数
    getAccountIdea () {
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

      this.$axios.post('/account/analysis/account/selectIdea', params).then(res => {
        if (res.status === 200) {
          if (res.data.code === 0) {
            this.total = res.data.total
            this.ideaData = res.data.data && res.data.data.length > 0 ? res.data.data : []
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
.account-idea {
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
