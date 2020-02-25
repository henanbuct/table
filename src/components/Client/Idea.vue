<template>
  <div class="client-idea">
    <div class="client-idea-detail">
      <p class="client-idea-detail-title">创意</p>
      <!--<div class="client-idea-detail-promote">-->
        <!--<p>-->
          <!--消费中创意>-->
          <!--<span>3</span>/10-->
        <!--</p>-->
        <!--<p>-->
          <!--有展现无点击创意 >-->
          <!--<span>3</span>/10-->
        <!--</p>-->
        <!--<p>-->
          <!--无展现创意 >-->
          <!--<span>3</span>/10-->
        <!--</p>-->

        <!--<p>-->
          <!--审核中创意 >-->
          <!--<span>1</span>/10-->
        <!--</p>-->
        <!--<p>-->
          <!--审核未通过创意 >-->
          <!--<span>1</span>/10-->
        <!--</p>-->
        <!--<p>-->
          <!--暂停创意 >-->
          <!--<span>1</span>/10-->
        <!--</p>-->
      <!--</div>-->
    </div>
    <div class="client-idea-content">
      <div class="client-idea-content-table">
        <div class="client-idea-content-table-btn">
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
        <div class="client-idea-content-table-data">
          <el-table
            :data="ideaData"
            border
            style="width: 100%"
            size="small"
          >
            <el-table-column
              prop="accountName"
              label="账户名称"
              min-width="80"
            ></el-table-column>
            <el-table-column
              prop="accountId"
              label="账户ID"
            ></el-table-column>
            <el-table-column
              prop="total_num"
              label="创意总量"
            ></el-table-column>
            <el-table-column
              prop="groupe_avg_num"
              label="组均创意"
            ></el-table-column>
            <el-table-column
              prop="unshow_num"
              label="无展现"
              min-width="40"
            ></el-table-column>
            <el-table-column
              prop="checkfail_num"
              min-width="70"
              label="审核未通过"
            ></el-table-column>

            <el-table-column
              prop="pause_num"
              label="暂停"
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
    client: Object
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
      this.getAccountIdea();
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

      if (this.client.customName) {
        params.customName = this.client.customName
      } else {
        params.customId = this.client.customId
      }

      this.$axios.post('/account/analysis/custom/selectIdea', params).then(res => {
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
.client-idea {
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
