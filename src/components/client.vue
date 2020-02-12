<template>
  <div class="client">
    <div class="client-detail">
      <span class="client-detail-title">详情</span>
      <div class="client-detail-search-name">
        <span>客户名称：</span>
        <el-input
          placeholder="请输入客户名称"
          prefix-icon="el-icon-search"
          v-model="name"
          size="small"
        ></el-input>
      </div>
      <div class="client-detail-search-id">
        <span>客户ID：</span>
        <el-input
          placeholder="请输入客户ID"
          prefix-icon="el-icon-search"
          v-model="id"
          size="small"
        ></el-input>
      </div>
      <div class="client-detail-search-count">
        <span>账户总数：</span>
        <el-input
          placeholder="请输入账户总数"
          prefix-icon="el-icon-search"
          v-model="count"
          size="small"
        ></el-input>
      </div>
    </div>
    <div class="client-account">
      <span>账户</span>
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
    <div class="client-account-table">
      <span>账户</span>
      <div class="client-account-table-data">
        <div class="client-account-table-data-btn">
          <el-select
            v-model="status"
            placeholder="请选择状态"
          >
            <el-option
              v-for="item in options"
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
        <div class="client-account-table-data-table">
          <el-table
            :data="accountData"
            border
            style="width: 100%"
            size="small"
          >
            <el-table-column
              prop="name"
              label="账户名称"
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="id"
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
      </div>
    </div>

    <div class="client-account-table">
      <span>计划</span>
      <div class="client-account-table-data">
        <div class="client-account-table-data-btn">
          <el-select
            v-model="status"
            placeholder="请选择状态"
          >
            <el-option
              v-for="item in options"
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
        <div class="client-account-table-data-table">
          <el-table
            :data="planData"
            border
            style="width: 100%"
            size="small"
          >
            <el-table-column
              prop="name"
              label="账户名称"
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="id"
              label="账户ID"
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="businessScope"
              label="计划总量"
            ></el-table-column>
            <el-table-column
              prop="channelsManager"
              label="投放中计划"
            ></el-table-column>
            <el-table-column
              prop="businessManager"
              label="账户预算不足计划"
            ></el-table-column>
            <el-table-column
              prop="state"
              label="不在投放时段计划"
            ></el-table-column>
            <el-table-column
              prop="reason"
              label="暂停计划"
              min-width="120"
            ></el-table-column>
            <el-table-column
              prop="budget"
              label="无效计划"
              min-width="80"
            ></el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <div class="client-account-table">
      <span>推广组</span>
      <div class="client-account-table-data">
        <div class="client-account-table-data-btn">
          <el-select
            v-model="status"
            placeholder="请选择状态"
          >
            <el-option
              v-for="item in options"
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
        <div class="client-account-table-data-table">
          <el-table
            :data="promotionData"
            border
            style="width: 100%"
            size="small"
          >
            <el-table-column
              prop="name"
              label="账户名称"
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="id"
              label="账户ID"
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="businessScope"
              label="推广组总量"
            ></el-table-column>
            <el-table-column
              prop="channelsManager"
              label="投放中推广组"
            ></el-table-column>
            <el-table-column
              prop="businessManager"
              label="账户预算不足推广组"
            ></el-table-column>
            <el-table-column
              prop="state"
              label="计划预算不足推广组"
            ></el-table-column>
            <el-table-column
              prop="reason"
              label="暂停推广组"
            ></el-table-column>
            <el-table-column
              prop="budget"
              label="无效推广组"
              min-width="80"
            ></el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <div class="client-account-table">
      <span>关键词</span>
      <div class="client-account-table-data">
        <div class="client-account-table-data-btn">
          <el-select
            v-model="status"
            placeholder="请选择状态"
          >
            <el-option
              v-for="item in options"
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
        <div class="client-account-table-data-table">
          <el-table
            :data="keyWordData"
            border
            style="width: 100%"
            size="small"
          >
            <el-table-column
              prop="name"
              label="账户名称"
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="id"
              label="账户ID"
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="businessScope"
              label="关键词总量"
            ></el-table-column>
            <el-table-column
              prop="channelsManager"
              label="消费中关键词"
            ></el-table-column>
            <el-table-column
              prop="businessManager"
              label="消费下降关键词"
            ></el-table-column>
            <el-table-column
              prop="state"
              label="有展现无点击关键词"
            ></el-table-column>
            <el-table-column
              prop="reason"
              label="无展现关键词"
            ></el-table-column>
            <el-table-column
              prop="budget"
              label="审核中关键词"
              min-width="80"
            ></el-table-column>
            <el-table-column
              prop="budget"
              label="审核未通过关键词"
              min-width="80"
            ></el-table-column>
            <el-table-column
              prop="budget"
              label="无效关键词"
              min-width="80"
            ></el-table-column>
            <el-table-column
              prop="budget"
              label="暂停关键词"
              min-width="80"
            ></el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <div class="client-account-table">
      <span>搜索词</span>
      <div class="client-account-table-data">
        <div class="client-account-table-data-btn">
          <el-select
            v-model="status"
            placeholder="请选择状态"
          >
            <el-option
              v-for="item in options"
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
        <div class="client-account-table-data-table">
          <el-table
            :data="searchData"
            border
            style="width: 100%"
            size="small"
          >
            <el-table-column
              prop="name"
              label="账户名称"
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="id"
              label="账户ID"
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="businessScope"
              label="搜索词总量"
            ></el-table-column>

            <el-table-column
              prop="reason"
              label="购买总量"
            ></el-table-column>
            <el-table-column
              prop="budget"
              label="购买比例"
              min-width="80"
            ></el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <div class="client-account-table">
      <span>创意</span>
      <div class="client-account-table-data">
        <div class="client-account-table-data-btn">
          <el-select
            v-model="status"
            placeholder="请选择状态"
          >
            <el-option
              v-for="item in options"
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
        <div class="client-account-table-data-table">
          <el-table
            :data="creationData"
            border
            style="width: 100%"
            size="small"
          >
            <el-table-column
              prop="name"
              label="账户名称"
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="id"
              label="账户ID"
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="businessScope"
              label="创意总量"
            ></el-table-column>
            <el-table-column
              prop="channelsManager"
              label="组均创意"
            ></el-table-column>
            <el-table-column
              prop="businessManager"
              label="有展现无点击创意"
            ></el-table-column>
            <el-table-column
              prop="state"
              label="无展现创意"
            ></el-table-column>
            <el-table-column
              prop="reason"
              label="审核未通过"
            ></el-table-column>
            <el-table-column
              prop="budget"
              label="审核中创意"
              min-width="80"
            ></el-table-column>
            <el-table-column
              prop="budget"
              label="暂停创意"
              min-width="80"
            ></el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <div class="client-account-table">
      <span>高级样式</span>
      <div class="client-account-table-data">
        <div class="client-account-table-data-btn">
          <el-select
            v-model="status"
            placeholder="请选择状态"
          >
            <el-option
              v-for="item in options"
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
        <div class="client-account-table-data-table">
          <el-table
            :data="highStyleData"
            border
            style="width: 100%"
            size="small"
          >
            <el-table-column
              prop="name"
              label="账户名称"
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="id"
              label="账户ID"
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="businessScope"
              label="样式总量"
            ></el-table-column>
            <el-table-column
              prop="channelsManager"
              label="计算机皇冠列表量"
            ></el-table-column>
            <el-table-column
              prop="businessManager"
              label="移动皇冠列表量"
            ></el-table-column>
            <el-table-column
              prop="state"
              label="移动皇冠列表量覆盖率"
            ></el-table-column>
            <el-table-column
              prop="reason"
              label="计算机皇冠通用词量"
            ></el-table-column>
            <el-table-column
              prop="budget"
              label="计算机皇冠通用词量覆盖率"
              min-width="80"
            ></el-table-column>
            <el-table-column
              prop="budget"
              label="移动皇冠通用词量"
              min-width="80"
            ></el-table-column>
            <el-table-column
              prop="budget"
              label="移动皇冠通用词覆盖率"
              min-width="80"
            ></el-table-column>
            <el-table-column
              prop="budget"
              label="计算机超级皇冠样式量"
              min-width="80"
            ></el-table-column>
            <el-table-column
              prop="budget"
              label="计算机超级皇冠样式覆盖率"
              min-width="80"
            ></el-table-column>
            <el-table-column
              prop="budget"
              label="移动超级皇冠样式量"
              min-width="80"
            ></el-table-column>
            <el-table-column
              prop="budget"
              label="移动超级皇冠样式覆盖率"
              min-width="80"
            ></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {

  data () {
    return {
      name: '',
      id: '',
      count: '',
      accountData: [],
      status: '',
      options: [],
      planData: [],
      promotionData: [],
      keyWordData: [],
      searchData: [],
      creationData: [],
      highStyleData: []
    };
  },

  //渲染数据
  mounted () {
    this.getAccountData()
  },
  methods: {

    //请求数据的接口
    getAccountData () {
      this.accountData = [{
        name: "加班使我快乐",
        id: '479291',
        businessScope: '业务范围11',
        channelsManager: '渠道经理11',
        businessManager: '业务经理11',
        state: '状态11',
        reason: '原因11',
        budget: '账户预算11',
        balance: '余额11',
        total: '总消耗11'
      }];
      this.options = [
        {
          value: "正常",
          lable: "1"
        },
        {
          value: "暂停",
          lable: "2"
        },
        {
          value: "待审核",
          lable: "3"
        },
        {
          value: "拒绝",
          lable: "4"
        },
        {
          value: "不通过",
          lable: "5"
        },
      ]
    }
  }
};
</script>
<style scoped lang="scss">
.client {
  &-detail {
    align-items: center;
    display: flex;
    &-title {
      font-size: 20px;
      font-weight: 500;
      width: 80px;
      text-align: left;
    }
    &-search {
      &-name,
      &-id,
      &-count {
        display: flex;
        margin-right: 10px;
        align-items: center;
        span {
          display: block;
          width: 130px;
        }
      }
    }
  }
  &-account {
    margin-top: 24px;
    align-items: center;
    display: flex;
    span {
      font-size: 20px;
      font-weight: 500;
      width: 80px;
      text-align: left;
    }
    p {
      margin-right: 20px;
      span {
        color: red;
      }
    }
    &-table {
      width: 100%;
      margin-top: 24px;
      display: flex;
      flex-direction: row;
      span {
        font-size: 20px;
        font-weight: 500;
        width: 80px;
        text-align: left;
      }
      &-data {
        width: 100%;
        &-btn {
          text-align: right;
        }
        &-table {
          margin-top: 16px;
        }
      }
    }
  }
}
</style>
