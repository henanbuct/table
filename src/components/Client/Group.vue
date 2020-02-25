<template>
  <div class="client-group">
    <div class="client-group-detail">
      <p class="client-group-detail-title">推广组</p>
      <!--<div class="client-group-detail-promote">-->
        <!--<p>-->
          <!--投放中推广组 >-->
          <!--<span>3</span>/10-->
        <!--</p>-->
        <!--<p>-->
          <!--账户预算不足推广组 >-->
          <!--<span>3</span>/10-->
        <!--</p>-->
        <!--<p>-->
          <!--计划预算不足推广组 >-->
          <!--<span>3</span>/10-->
        <!--</p>-->

        <!--<p>-->
          <!--暂停推广组 >-->
          <!--<span>1</span>/10-->
        <!--</p>-->
        <!--<p>-->
          <!--无效推广组 >-->
          <!--<span>1</span>/10-->
        <!--</p>-->
      <!--</div>-->
    </div>
    <div class="client-group-content">
      <div class="client-group-content-table">
        <div class="client-group-content-table-btn">
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
        <div class="client-group-content-table-data">
          <el-table
            :data="groupData"
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
              label="推广组总量"
              max-width="80"
            ></el-table-column>
            <el-table-column
              v-if="status==='暂停'"
              prop="pause_num"
              label="暂停"
            ></el-table-column>
            <el-table-column
              v-if="status==='无有效关键词'"
              prop="invalid_keyword_num"
              label="无有效关键词"
            ></el-table-column>
            <el-table-column
              v-if="status==='无有效创意'"
              prop="invalid_idea_num"
              label="无有效创意"
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
      groupOptions: [],
      groupData: [],
      curPage: 1,
      pageSize: 10,
      total: 0,
    }
  },
  watch: {
    status (val) {
      this.getAccountGroup();
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

      if (this.client.customName) {
        params.customName = this.client.customName
      } else {
        params.customId = this.client.customId
      }


      this.$axios.post('/account/analysis/custom/selectGroup', params).then(res => {
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
.client-group {
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
