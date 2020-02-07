<template>
  <div class="account">
    <div class="account-detail-table">
      <span>详情</span>
      <div class="account-detail-promote">
        <div class="account-detail-table-message">
          <span>账户名称：{{accountName}}</span>
        </div>
        <div class="account-detail-table-message">
          <span>账户ID：{{accountId}}</span>
        </div>
        <div class="account-detail-table-message">
          <span>客户名称：{{clientName}}</span>
        </div>
        <div class="account-detail-table-message">
          <span>客户ID：{{clientId}}</span>
        </div>
        <br />
        <div class="account-detail-table-message">
          <span>账户状态：{{accountStatus}}</span>
        </div>
        <div class="account-detail-table-message">
          <span>账户余额：{{balance}}元</span>
        </div>
        <div class="account-detail-table-message">
          <span>余额可消耗天数：{{balanceLastDay}}天</span>
        </div>
        <div class="account-detail-table-message">
          <span>今日消耗：{{todayPay}}元</span>
        </div>
        <div class="account-detail-table-message">
          <span>账户日预算：{{budget}}</span>
        </div>
      </div>
    </div>

    <div class="account-detail-table">
      <span>计划</span>
      <div class="account-detail-table-detail">
        <div class="account-detail-table-detail">
          <div class="account-detail-promote">
            <p>
              投放中计划 >
              <span>3</span>/10
            </p>
            <p>
              账户预算不足计划 >
              <span>3</span>/10
            </p>
            <p>
              计划预算不足计划 >
              <span>3</span>/10
            </p>
            <p>
              不在投放时段计划 >
              <span>0</span>/10
            </p>
            <p>
              暂停计划 >
              <span>1</span>/10
            </p>
            <p>
              无效计划 >
              <span>1</span>/10
            </p>
          </div>
        </div>
        <div class="account-detail-table-data">
          <div class="account-detail-table-data-btn">
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
          <div class="account-detail-table-data-table">
            <el-table
              :data="planData"
              border
              style="width: 100%"
              size="small"
            >
              <el-table-column
                prop="name"
                label="推广计划"
                min-width="100"
              ></el-table-column>
              <el-table-column
                prop="id"
                label="状态"
                min-width="100"
              ></el-table-column>
              <el-table-column
                prop="businessScope"
                label="原因"
              ></el-table-column>
              <el-table-column
                prop="channelsManager"
                label="第一次撞线/暂停计划"
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
    </div>

    <div class="account-detail-table">
      <span>推广组</span>
      <div class="account-detail-table-detail">
        <div class="account-detail-promote">
          <p>
            投放中推广组 >
            <span>3</span>/10
          </p>
          <p>
            账户预算不足推广组 >
            <span>3</span>/10
          </p>
          <p>
            计划预算不足推广组 >
            <span>3</span>/10
          </p>

          <p>
            暂停推广组 >
            <span>1</span>/10
          </p>
          <p>
            无效推广组 >
            <span>1</span>/10
          </p>
        </div>
        <div class="account-detail-table-data">
          <div class="account-detail-table-data-btn">
            <el-select
              v-model="promoteStatus"
              placeholder="请选择状态"
            >
              <el-option
                v-for="item in promoteOptions"
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
          <div class="account-detail-table-data-table">
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
    </div>

    <div class="account-detail-table">
      <span>关键词</span>
      <div class="account-detail-table-detail">
        <div class="account-detail-promote">
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

        <div class="account-detail-table-data">
          <div class="account-detail-table-data-btn">
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
          <div class="account-detail-table-data-table">
            <el-table
              :data="keyWordData"
              border
              style="width: 100%"
              size="small"
            >
              <el-table-column
                prop="name"
                label="关键词"
                min-width="100"
              ></el-table-column>
              <el-table-column
                prop="id"
                label="推广计划"
                min-width="100"
              ></el-table-column>
              <el-table-column
                prop="businessScope"
                label="推广组"
              ></el-table-column>
              <el-table-column
                prop="channelsManager"
                label="状态"
              ></el-table-column>
              <el-table-column
                prop="businessManager"
                label="原因"
              ></el-table-column>
              <el-table-column
                prop="businessManager"
                label="匹配"
              ></el-table-column>
              <el-table-column
                prop="state"
                label="出价"
              ></el-table-column>
              <el-table-column
                prop="state"
                label="未通过时间"
              ></el-table-column>
              <el-table-column
                prop="state"
                label="暂停时间"
              ></el-table-column>
              <el-table-column
                prop="state"
                label="提审时间"
              ></el-table-column>
              <el-table-column
                prop="reason"
                label="设备"
              ></el-table-column>
              <el-table-column
                prop="budget"
                label="展现量"
                min-width="80"
              ></el-table-column>
              <el-table-column
                prop="budget"
                label="计算机质量度"
                min-width="80"
              ></el-table-column>
              <el-table-column
                prop="budget"
                label="移动质量度"
                min-width="80"
              ></el-table-column>
              <el-table-column
                prop="budget"
                label="是否搜索量低"
                min-width="80"
              ></el-table-column>
              <el-table-column
                prop="budget"
                label="平均排名"
                min-width="80"
              ></el-table-column>
              <el-table-column
                prop="budget"
                label="搜索总量"
                min-width="80"
              ></el-table-column>
              <el-table-column
                prop="budget"
                label="本期消耗/元"
                min-width="80"
              ></el-table-column>
              <el-table-column
                prop="budget"
                label="上期消耗/元"
                min-width="80"
              ></el-table-column>
              <el-table-column
                prop="budget"
                label="下降金额/元"
                min-width="80"
              ></el-table-column>
              <el-table-column
                prop="budget"
                label="增长率"
                min-width="80"
              ></el-table-column>
              <el-table-column
                prop="budget"
                label="竞品是否投放"
                min-width="80"
              ></el-table-column>
              <el-table-column
                prop="budget"
                label="默认访问url"
                min-width="80"
              ></el-table-column>
              <el-table-column
                prop="budget"
                label="移动访问url"
                min-width="80"
              ></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>

    <div class="account-detail-table">
      <span>搜索词</span>
      <div class="account-detail-table-detail">
        <div class="account-detail-promote">
          <p>
            已购买搜索词>
            <span>30</span>/340
          </p>
          <p>
            未购买搜索词 >
            <span>320</span>/340
          </p>
        </div>
        <div class="account-detail-table-data">
          <div class="account-detail-table-data-btn">
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
          <div class="account-detail-table-data-table">
            <el-table
              :data="searchData"
              border
              style="width: 100%"
              size="small"
            >
              <el-table-column
                prop="name"
                label="搜索词"
                min-width="100"
              ></el-table-column>
              <el-table-column
                prop="id"
                label="推广计划"
                min-width="100"
              ></el-table-column>
              <el-table-column
                prop="businessScope"
                label="推广组"
              ></el-table-column>

              <el-table-column
                prop="reason"
                label="关键词"
              ></el-table-column>
              <el-table-column
                prop="budget"
                label="匹配"
                min-width="80"
              ></el-table-column>
              <el-table-column
                prop="reason"
                label="出价"
              ></el-table-column>
              <el-table-column
                prop="budget"
                label="展现"
                min-width="80"
              ></el-table-column>
              <el-table-column
                prop="reason"
                label="点击"
              ></el-table-column>
              <el-table-column
                prop="budget"
                label="消耗"
                min-width="80"
              ></el-table-column>
              <el-table-column
                prop="reason"
                label="是否已购买"
              ></el-table-column>
              <el-table-column
                prop="budget"
                label="购买时间"
                min-width="80"
              ></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>

    <div class="account-detail-table">
      <span>创意</span>
      <div class="account-detail-table-detail">
        <div class="account-detail-promote">
          <p>
            消费中创意>
            <span>3</span>/10
          </p>
          <p>
            有展现无点击创意 >
            <span>3</span>/10
          </p>
          <p>
            无展现创意 >
            <span>3</span>/10
          </p>

          <p>
            审核中创意 >
            <span>1</span>/10
          </p>
          <p>
            审核未通过创意 >
            <span>1</span>/10
          </p>
          <p>
            暂停创意 >
            <span>1</span>/10
          </p>
        </div>

        <div class="account-detail-table-data">
          <div class="account-detail-table-data-btn">
            <el-select
              v-model="createStatus"
              placeholder="请选择状态"
            >
              <el-option
                v-for="item in createList"
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
          <div class="account-detail-table-data-table">
            <el-table
              :data="creationData"
              border
              style="width: 100%"
              size="small"
            >
              <el-table-column
                prop="name"
                label="创意"
                min-width="100"
              ></el-table-column>
              <el-table-column
                prop="id"
                label="创意ID"
                min-width="100"
              ></el-table-column>
              <el-table-column
                prop="businessScope"
                label="创意标题"
              ></el-table-column>
              <el-table-column
                prop="channelsManager"
                label="推广计划"
              ></el-table-column>
              <el-table-column
                prop="businessManager"
                label="推广组"
              ></el-table-column>
              <el-table-column
                prop="state"
                label="状态"
              ></el-table-column>
              <el-table-column
                prop="reason"
                label="原因"
              ></el-table-column>
              <el-table-column
                prop="budget"
                label="提审时间"
                min-width="80"
              ></el-table-column>
              <el-table-column
                prop="budget"
                label="未通过时间"
                min-width="80"
              ></el-table-column>
              <el-table-column
                prop="budget"
                label="暂停时间"
                min-width="80"
              ></el-table-column>
              <el-table-column
                prop="budget"
                label="描述1"
                min-width="80"
              ></el-table-column>
              <el-table-column
                prop="budget"
                label="描述2"
                min-width="80"
              ></el-table-column>
              <el-table-column
                prop="budget"
                label="默认访问url"
                min-width="80"
              ></el-table-column>
              <el-table-column
                prop="budget"
                label="默认显示url"
                min-width="80"
              ></el-table-column>
              <el-table-column
                prop="budget"
                label="移动访问url"
                min-width="80"
              ></el-table-column>
              <el-table-column
                prop="budget"
                label="移动显示url"
                min-width="80"
              ></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>

    <div class="account-detail-table">
      <span>高级样式</span>
      <div class="account-detail-table-detail">
        <div class="account-detail-promote">
          <p>
            计算机皇冠列表>
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

        <div class="account-detail-table-data">
          <div class="account-detail-table-data-btn">
            <el-select
              v-model="hightStyleStatus"
              placeholder="请选择状态"
            >
              <el-option
                v-for="item in hightStyleList"
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
          <div class="account-detail-table-data-table">
            <el-table
              :data="highStyleData"
              border
              style="width: 100%"
              size="small"
            >
              <el-table-column
                prop="name"
                label="样式名称"
                min-width="100"
              ></el-table-column>
              <el-table-column
                prop="id"
                label="推广计划"
                min-width="100"
              ></el-table-column>
              <el-table-column
                prop="businessScope"
                label="推广组"
              ></el-table-column>
              <el-table-column
                prop="channelsManager"
                label="状态"
              ></el-table-column>
              <el-table-column
                prop="businessManager"
                label="点击"
              ></el-table-column>
              <el-table-column
                prop="state"
                label="展示"
              ></el-table-column>
              <el-table-column
                prop="reason"
                label="消耗"
              ></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      accountName: '',
      accountId: '',
      clientName: '',
      clientId: '',
      accountData: [],
      accountStatus: '',
      balance: '',
      balanceLastDay: 0,
      todayPay: '',
      budget: '',
      status: '',
      options: [],
      planData: [],
      promotionData: [],
      keyWordData: [],
      searchData: [],
      creationData: [],
      highStyleData: [],
      createStatus: '消费中创意',
      createList: [],
      hightStyleStatus: '计算机皇冠列表',
      hightStyleList: [],
      keyWordStatus: '消费中关键词',
      keyWordOptions: [],
      promoteStatus: '',
      promoteOptions: [],
      curPage: 1,
      pageSize: 20,
      total: 0,
    };
  },
  //监听数据变化
  watch: {
    hightStyleStatus (val) {
      console.log("????", val)
    },
    createStatus (val) {
      console.log("????", val)
    }
  },
  //渲染数据
  mounted () {
    this.getAccountData()
    this.getAccountDetail()
  },
  methods: {
    //获取账户接口
    getAccountDetail () {

      this.$axios.get('https://www.fastmock.site/mock/0b492904d3072f00705b34b0d2204207/account/detail').then(res => {
        console.log("++++this+++", res)
        if (res.status === 200) {
          if (res.data.code === '200') {
            this.accountName = res.data.result.accountName
            this.accountId = res.data.result.accountId
            this.clientName = res.data.result.clientName
            this.clientId = res.data.result.clientId
            this.accountStatus = res.data.result.accountStatus
            this.balance = res.data.result.balance
            this.balanceLastDay = res.data.result.balanceLastDay
            this.todayPay = res.data.result.todayPay
            this.budget = res.data.result.budget
          }
        } else {
          console.log("获取接口失败")
        }
      })
    },
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
      ];

      this.hightStyleList = [
        {
          value: "计算机皇冠列表",
          lable: "1"
        },
        {
          value: "移动皇冠列表",
          lable: "2"
        },
        {
          value: "计算机皇冠通用词",
          lable: "3"
        },
        {
          value: "移动皇冠通用词",
          lable: "4"
        },
        {
          value: "计算机超级皇冠样式",
          lable: "5"
        },
        {
          value: "移动超级皇冠样式",
          lable: "6"
        }
      ];

      this.createList = [
        {
          value: "消费中创意",
          lable: "1"
        },
        {
          value: "有展现无点击创意",
          lable: "2"
        },
        {
          value: "无展现创意",
          lable: "3"
        },
        {
          value: "审核中创意",
          lable: "4"
        },
        {
          value: "审核未通过创意",
          lable: "5"
        },
        {
          value: "暂停创意",
          lable: "6"
        }
      ];

      this.keyWordOptions = [
        {
          value: "消费中关键词",
          lable: "1"
        },
        {
          value: "消耗下降关键词",
          lable: "2"
        },
        {
          value: "有展现无点击关键词",
          lable: "3"
        },
        {
          value: "无展现关键词",
          lable: "4"
        },
        {
          value: "审核中关键词",
          lable: "5"
        },
        {
          value: "审核未通过关键词",
          lable: "6"
        },
        {
          value: "无效关键词",
          lable: "7"
        },
        {
          value: "暂停关键词",
          lable: "8"
        }
      ];

      this.promoteOptions = [
        {
          value: "所有状态",
          lable: "0"
        },
        {
          value: "投放中推广组",
          lable: "1"
        },
        {
          value: "账户预算不足推广组",
          lable: "2"
        },
        {
          value: "计划预算不足推广组",
          lable: "3"
        },
        {
          value: "暂停推广组",
          lable: "4"
        },
        {
          value: "无效推广组",
          lable: "5"
        }
      ]
    }
  }
};
</script>
<style scoped lang="scss">
.account {
  &-detail {
    text-align: left;
    width: 100%;
    align-items: center;
    display: flex;
    flex-direction: row;
    &-title {
      display: inline-block;
      width: 100px;
      text-align: center;
    }
    &-data {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
    &-title {
      font-size: 20px;
      font-weight: 500;
      width: 80px;
      text-align: left;
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
      &-detail {
        display: flex;
        flex-direction: column;
      }
      &-message {
        span {
          font-size: 14px;
        }
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
    &-detail {
      display: flex;
      flex-wrap: wrap;
    }
    &-search {
      display: inline-block;
      &-name,
      &-id,
      &-count {
        display: flex;
        margin-right: 10px;
        align-items: center;
        span {
          display: block;
          width: 100px;
        }
      }
    }
    &-promote,
    &-plan {
      display: flex;
      p {
        margin-right: 20px;
        span {
          color: red;
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
  }
}
</style>
