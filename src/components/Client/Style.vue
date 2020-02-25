<template>
  <div class="client-style">
    <div class="client-style-detail">
      <p class="client-style-detail-title">高级样式</p>
      <!--<div class="client-style-detail-promote">-->
        <!--<p>-->
          <!--计算机皇冠列表>-->
          <!--<span>3</span>/10-->
        <!--</p>-->
        <!--<p>-->
          <!--移动皇冠列表 >-->
          <!--<span>3</span>/10-->
        <!--</p>-->
        <!--<p>-->
          <!--计算机皇冠通用词 >-->
          <!--<span>3</span>/10-->
        <!--</p>-->

        <!--<p>-->
          <!--移动皇冠通用词 >-->
          <!--<span>1</span>/10-->
        <!--</p>-->
        <!--<p>-->
          <!--计算机超级皇冠样式 >-->
          <!--<span>1</span>/10-->
        <!--</p>-->
        <!--<p>-->
          <!--移动超级皇冠样式 >-->
          <!--<span>1</span>/10-->
        <!--</p>-->
      <!--</div>-->
    </div>
    <div class="client-style-content">
      <div class="client-style-content-table">
        <div class="client-style-content-table-btn">
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
        <div class="client-style-content-table-data">
          <el-table
            :data="styleData"
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
            ></el-table-column>
            <el-table-column
              prop="total_num"
              label="样式总量"
            ></el-table-column>
            <el-table-column
              v-if="status==='计算机皇冠列表'"
              prop="pcCrownListNum"
              label="计算机皇冠列表量"
            ></el-table-column>
            <el-table-column
              v-if="status==='计算机皇冠列表'"
              prop="pcCrownListRate"
              label="计算机皇冠列表覆盖率"
            ></el-table-column>
            <el-table-column
              v-if="status==='移动皇冠列表'"
              prop="wxCrownListNum"
              label="移动皇冠列表量"
            ></el-table-column>
            <el-table-column
              v-if="status==='移动皇冠列表'"
              prop="wxCrownListRate"
              label="移动皇冠列表覆盖率"
            ></el-table-column>
            <el-table-column
              v-if="status==='计算机皇冠通用词'"
              prop="pcCrownGeneralWordNum"
              label="计算机皇冠通用词量"
            ></el-table-column>
            <el-table-column
              v-if="status==='计算机皇冠通用词'"
              prop="pcCrownGeneralWordRate"
              label="计算机皇冠通用词覆盖率"
            ></el-table-column>
            <el-table-column
              v-if="status==='移动皇冠通用词'"
              prop="wxCrownGeneralWordNum"
              label="移动皇冠通用词量"
            ></el-table-column>
            <el-table-column
              v-if="status==='移动皇冠通用词'"
              prop="wxCrownGeneralWordRate"
              label="移动皇冠通用词覆盖率"
            ></el-table-column>
            <el-table-column
              v-if="status==='计算机皇冠超级样式'"
              prop="pcSuperCrownStyleNum"
              label="计算机皇冠超级样式量"
            ></el-table-column>
            <el-table-column
              v-if="status==='计算机皇冠超级样式'"
              prop="pcSuperCrownStyleRate"
              label="计算机皇冠超级样式覆盖率"
            ></el-table-column>
            <el-table-column
              v-if="status==='移动皇冠超级样式'"
              prop="wxSuperCrownStyleNum"
              label="移动皇冠超级样式量"
            ></el-table-column>
            <el-table-column
              v-if="status==='移动皇冠超级样式'"
              prop="wxSuperCrownStyleRate"
              label="移动皇冠超级样式覆盖率"
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
      styleOptions: [],
      styleData: [],
      curPage: 1,
      pageSize: 10,
      total: 0,
    }
  },
  watch: {
    status (val) {
      this.getAccountStyle();
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
    this.status = '计算机皇冠列表';
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

      if (this.client.customName) {
        params.customName = this.client.customName
      } else {
        params.customId = this.client.customId
      }

      this.$axios.post('/account/analysis/custom/selectStyle', params).then(res => {
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
.client-style {
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
