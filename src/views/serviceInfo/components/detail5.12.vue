<template>
  <div class="detail">
    <div class="title">
      <div>
        <i class="el-icon-s-platform"></i>
        <span>服务情况详表</span>
      </div>
      <div class="operateButton">
        <el-button type="text" @click="handleAddDate">新增</el-button>
        <el-upload
          class="upload-demo"
          action="/MDRSC/api/rest/UploadServlet/upload?TABLENAME=ESMD_INFO_DETAIL"
          accept=".xls, .xlsx"
          :show-file-list="false"
          :on-success="handleSuccess"
          :on-error="handleError"
        >
          <el-button type="text" size="small">导入</el-button>
        </el-upload>
        <el-button type="text" @click="handleDownTem">下载模板</el-button>
        <el-button type="text" @click="handleClearData">清空</el-button>
      </div>
    </div>
    <div class="table">
      <el-table
        :data="showTableData"
        v-loading="loading"
        element-loading-text="拼命加载中..."
        element-loading-background="rgba(0,0,0,0.1)"
        :fit="true"
      >
        <el-table-column
          align="center"
          label="校验信息"
          prop="D_CHECK_INFO"
          min-width="150"
        >
        </el-table-column>
        <el-table-column align="center" label="单位信息">
          <el-table-column align="center" label="单位名称" min-width="200">
            <template slot-scope="scope">
              <el-input
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 3 }"
                name="D_DEPART_NAME"
                v-if="scope.$index === operateDataIndex"
                v-model="scope.row.D_DEPART_NAME"
                placeholder="请填写单位名称"
              ></el-input>
              <span v-else>{{ scope.row.D_DEPART_NAME }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="单位类别" min-width="170">
            <template slot-scope="scope">
              <el-select
                name="D_DEPART_LEVEL"
                v-model="scope.row.D_DEPART_LEVEL"
                v-if="scope.$index === operateDataIndex"
                placeholder="请选择单位类别"
              >
                <el-option
                  v-for="item in selectList.unitTypeList"
                  :key="item.code"
                  :label="item.text"
                  :value="item.text"
                ></el-option>
              </el-select>
              <span v-else>{{ scope.row.D_DEPART_LEVEL }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="通信方式" min-width="170">
          <template slot-scope="scope">
            <el-select
              name="D_SERVICE_MODE"
              v-model="scope.row.D_SERVICE_MODE"
              v-if="scope.$index === operateDataIndex"
              placeholder="请选择通信方式"
            >
              <el-option
                v-for="item in selectList.serviceModeList"
                :key="item.code"
                :label="item.text"
                :value="item.text"
              ></el-option>
            </el-select>
            <span v-else>{{ scope.row.D_SERVICE_MODE }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="服务类型" min-width="170">
          <template slot-scope="scope">
            <el-select
              name="D_SERVICE_TYPE"
              v-model="scope.row.D_SERVICE_TYPE"
              v-if="scope.$index === operateDataIndex"
              placeholder="请选择服务类型"
            >
              <el-option
                v-for="item in selectList.serviceTypeList"
                :key="item.code"
                :label="item.text"
                :value="item.text"
              ></el-option>
            </el-select>
            <span v-else>{{ scope.row.D_SERVICE_TYPE }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="服务开始时间" min-width="170">
          <template slot-scope="scope">
            <el-date-picker
              name="D_SERVICE_START_DATE"
              v-if="scope.$index === operateDataIndex"
              v-model="scope.row.D_SERVICE_START_DATE"
              type="datetime"
              format="yyyy-MM-dd"
              placeholder="选择服务开始时间"
            ></el-date-picker>
            <span v-else>{{
              scope.row.D_SERVICE_START_DATE | datePickerChange
            }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="服务结束时间" min-width="170">
          <template slot-scope="scope">
            <el-date-picker
              name="D_SERVICE_END_DATE"
              v-if="scope.$index === operateDataIndex"
              v-model="scope.row.D_SERVICE_END_DATE"
              type="datetime"
              format="yyyy-MM-dd"
              placeholder="选择服务结束时间"
            ></el-date-picker>
            <span v-else>{{
              scope.row.D_SERVICE_END_DATE | datePickerChange
            }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="服务对象">
          <el-table-column
            align="center"
            prop="D_SERVICE_OBJ_NAME"
            label="单位名称"
            min-width="170"
          >
            <template slot-scope="scope">
              <el-input
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 3 }"
                name="D_SERVICE_OBJ_NAME"
                v-if="scope.$index === operateDataIndex"
                v-model="scope.row.D_SERVICE_OBJ_NAME"
                placeholder="请填写单位名称"
              ></el-input>
              <span v-else>{{ scope.row.D_SERVICE_OBJ_NAME }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="D_SERVICE_TYPE"
            label="类别"
            min-width="170"
          >
            <template slot-scope="scope">
              <el-select
                name="D_SERVICE_OBJ_TYPE"
                v-model="scope.row.D_SERVICE_OBJ_TYPE"
                v-if="scope.$index === operateDataIndex"
                placeholder="请选择类别"
              >
                <el-option
                  v-for="item in selectList.serviceUnitTypeList"
                  :key="item.code"
                  :label="item.text"
                  :value="item.text"
                ></el-option>
              </el-select>
              <span v-else>{{ scope.row.D_SERVICE_OBJ_TYPE }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="服务内容">
          <el-table-column
            align="center"
            prop="D_DATA_TYPE"
            label="资料类别"
            min-width="170"
          >
            <template slot-scope="scope">
              <el-select
                name="D_DATA_TYPE"
                v-model="scope.row.D_DATA_TYPE"
                v-if="scope.$index === operateDataIndex"
                multiple
                placeholder="请选择资料类别"
              >
                <el-option
                  v-for="item in selectList.cotegoryList"
                  :key="item.code"
                  :label="item.text"
                  :value="item.text"
                ></el-option>
              </el-select>
              <span v-else>{{ scope.row.D_DATA_TYPE | cotegoryChange }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="D_DATA_CONTENT"
            label="资料内容"
            min-width="170"
          >
            <template slot-scope="scope">
              <el-input
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 3 }"
                name="D_DATA_CONTENT"
                v-if="scope.$index === operateDataIndex"
                v-model="scope.row.D_DATA_CONTENT"
                placeholder="请填写资料内容"
              ></el-input>
              <span v-else>{{ scope.row.D_DATA_CONTENT }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="资料开始时间" min-width="170">
          <template slot-scope="scope">
            <el-date-picker
              name="D_DATA_START_DATE"
              v-if="scope.$index === operateDataIndex"
              v-model="scope.row.D_DATA_START_DATE"
              type="datetime"
              format="yyyy-MM-dd"
              placeholder="选择资料开始时间"
            ></el-date-picker>
            <span v-else>{{
              scope.row.D_DATA_START_DATE | datePickerChange
            }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="资料结束时间" min-width="170">
          <template slot-scope="scope">
            <el-date-picker
              name="D_DATA_END_DATE"
              v-if="scope.$index === operateDataIndex"
              v-model="scope.row.D_DATA_END_DATE"
              type="datetime"
              format="yyyy-MM-dd"
              placeholder="选择资料结束时间"
            ></el-date-picker>
            <span v-else>{{
              scope.row.D_DATA_END_DATE | datePickerChange
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="IS_CHARGE"
          label="是否收费"
          min-width="170"
        >
          <template slot-scope="scope">
            <el-select
              name="IS_CHARGE"
              v-model="scope.row.IS_CHARGE"
              v-if="scope.$index === operateDataIndex"
              placeholder="请选择是否收费"
            >
              <el-option
                v-for="item in selectList.chargeList"
                :key="item.code"
                :label="item.text"
                :value="item.text"
              ></el-option>
            </el-select>
            <span v-else>{{ scope.row.IS_CHARGE }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="IS_SERVICE_COMPANY"
          label="是否有独资或合资的涉及数据服务的公司情况"
          min-width="200"
        >
          <template slot-scope="scope">
            <el-select
              name="IS_SERVICE_COMPANY"
              v-model="scope.row.IS_SERVICE_COMPANY"
              v-if="scope.$index === operateDataIndex"
              placeholder="请选择是否有独资或合资的涉及数据服务的公司情况"
            >
              <el-option
                v-for="item in selectList.companyList"
                :key="item.code"
                :label="item.text"
                :value="item.text"
              ></el-option>
            </el-select>
            <span v-else>{{ scope.row.IS_SERVICE_COMPANY }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="公司信息">
          <el-table-column align="center" label="公司名称" min-width="170">
            <template slot-scope="scope">
              <el-input
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 3 }"
                name="DATA_SERVICE_COMPANYNAME"
                v-if="scope.$index === operateDataIndex"
                v-model="scope.row.DATA_SERVICE_COMPANYNAME"
                placeholder="请填写公司名称"
              ></el-input>
              <span v-else>{{ scope.row.DATA_SERVICE_COMPANYNAME }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="公司性质" min-width="170">
            <template slot-scope="scope">
              <el-select
                name="COMPANY_NATURE"
                v-model="scope.row.COMPANY_NATURE"
                v-if="scope.$index === operateDataIndex"
                placeholder="请选择公司性质"
              >
                <el-option
                  v-for="item in selectList.companyTypeList"
                  :key="item.code"
                  :label="item.text"
                  :value="item.text"
                ></el-option>
              </el-select>
              <span v-else>{{ scope.row.COMPANY_NATURE }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="合资单位信息">
          <el-table-column align="center" label="合资单位名称" min-width="180">
            <template slot-scope="scope">
              <el-input
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 3 }"
                name="JOINT_DEPART_NAME"
                v-if="scope.$index === operateDataIndex"
                v-model="scope.row.JOINT_DEPART_NAME"
                placeholder="请填写合资单位名称"
              ></el-input>
              <span v-else>{{ scope.row.JOINT_DEPART_NAME }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="合资单位性质" min-width="170">
            <template slot-scope="scope">
              <el-select
                name="JOINT_DEPART_NATURE"
                v-model="scope.row.JOINT_DEPART_NATURE"
                v-if="scope.$index === operateDataIndex"
                placeholder="请选择合资单位性质"
              >
                <el-option
                  v-for="item in selectList.ventureTypeList"
                  :key="item.code"
                  :label="item.text"
                  :value="item.text"
                ></el-option>
              </el-select>
              <span v-else>{{ scope.row.JOINT_DEPART_NATURE }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="各合资单位股份占比"
            min-width="230"
          >
            <template slot-scope="scope">
              <el-input
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 3 }"
                name="JOINT_PROPORTION"
                v-if="scope.$index === operateDataIndex"
                v-model="scope.row.JOINT_PROPORTION"
                placeholder="请填写各合资单位股份占比"
              ></el-input>
              <span v-else>{{ scope.row.JOINT_PROPORTION }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          align="center"
          prop="D_MOME"
          label="备注"
          min-width="170"
        >
          <template slot-scope="scope">
            <el-input
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 3 }"
              name="D_MOME"
              v-if="scope.$index === operateDataIndex"
              v-model="scope.row.D_MOME"
              placeholder="请填写备注"
            ></el-input>
            <span v-else>{{ scope.row.D_MOME }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="公司数据服务情况"
          min-width="210"
        >
          <template slot-scope="scope">
            <el-input
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 3 }"
              name="DATA_SERVICE_CONDITION"
              v-if="scope.$index === operateDataIndex"
              v-model="scope.row.DATA_SERVICE_CONDITION"
              placeholder="请填写公司数据服务情况"
            ></el-input>
            <span v-else>{{ scope.row.DATA_SERVICE_CONDITION }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          fixed="right"
          min-width="200"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              v-if="scope.row.ID"
              @click="handleEdit(scope)"
              :disabled="
                operateDataIndex !== -1 && operateDataIndex !== scope.$index
              "
              >编辑</el-button
            >
            <el-button
              type="text"
              v-if="scope.row.ID"
              :disabled="
                operateDataIndex !== -1 && operateDataIndex !== scope.$index
              "
              @click="handleCopy(scope)"
              >复制</el-button
            >
            <el-button
              type="text"
              :disabled="
                operateDataIndex !== -1 && operateDataIndex !== scope.$index
              "
              @click="handleSave(scope)"
              >保存</el-button
            >
            <el-popconfirm
              title="确认删除数据？"
              confirm-button-text="删除"
              style="margin-left: 10px"
              @confirm="handleDel(scope)"
            >
              <el-button
                slot="reference"
                type="text"
                :disabled="
                  operateDataIndex !== -1 && operateDataIndex !== scope.$index
                "
                >删除</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-pagination
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total"
          background
          @current-change="handleChangePage"
        ></el-pagination>
      </div>
    </div>
    <div class="explain">
      <p>填表说明：</p>
      <p>
        1、需详细填写2018年至今的所有对外服务信息。其中服务时间项目填写时需注意，当服务类型为“一次性”时（例如离线单），服务时间需填写起止时间-结束时间（YYYYMMDD-YYYYMMDD）；当服务类型为“持续”时，服务时间仅需注明服务起始时间YYYYMMDD即可；
      </p>
      <p>2、如无内容填0或者无。</p>
      <!-- <p>3、*为必填内容。</p> -->
      <p>
        3、中国气象局预报与网络司负责本填报系统的管理以及各单位填报信息的审查和保密，联系人：中国气象局预报与网络司
        李俊 电话：010-58994454
      </p>
      <!-- <div style="text-align: right; color: #999">
        <span style="margin-right: 30px"
          >联系人：中国气象局预报与网络司 李俊</span
        >
        <span>电话：010-58994454</span>
      </div> -->
    </div>
    <el-dialog
      title="温馨提示"
      :visible.sync="centerDialogVisible"
      width="548px"
      center
    >
      <span
        >为贯彻国家关于数据安全的有关要求和2021年全国推进气象信息化工作电视电话会议精神，落实<a>《气象数据管理办法（试行）》</a>和<a>《2021年气象信息化工作要点》</a>，全面梳理国家级和省级部门间数据交换共享情况以及数据对外服务情况，推动气象数据有序流动、合法依规使用、有效监管溯源，预报与网络司组织开展气象数据对外共享服务情况调研工作。</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false"
          >我知道了</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  unitTypeList,
  serviceModeList,
  serviceTypeList,
  serviceUnitTypeList,
  cotegoryList,
  chargeList,
  companyList,
  companyTypeList,
  ventureTypeList,
  detailErrInfo
} from "@/mock/mock.js";
import moment from "moment";
import { queryLoad, addInsert, updateData, deleteData } from "@/api";
export default {
  name: "detail",
  props: ["activeName", "userInfo"],
  data () {
    return {
      tableData: [],
      showTableData: [],
      operateDataIndex: -1, // 编辑的数据索引
      selectList: {
        unitTypeList,
        serviceModeList,
        serviceTypeList,
        serviceUnitTypeList,
        cotegoryList,
        chargeList,
        companyList,
        companyTypeList,
        ventureTypeList
      },
      // loading: false, // 加载动画效果
      loading: true, // 加载动画效果
      addFlag: false, // 新增flag
      currentPage: 1,
      pageSize: 10,
      total: 0,
      validateMsg: detailErrInfo,
      validateFlag: false,
      oldData: null, // 当前编辑数据
      centerDialogVisible: true
    };
  },
  filters: {
    datePickerChange: (value) => {
      return value && moment(value).format("YYYY-MM-DD");
    },
    cotegoryChange: (value) => {
      return value && value.length > 0 ? value.join() : "";
    }
  },
  watch: {
    activeName: {
      handler (val) {
        if (val === "second") {
          this.handleReset();
          this.handleQueryTable();
        }
      }
    }
  },
  created () {
    this.handleQueryTable();
  },
  methods: {
    // 重置
    handleReset () {
      this.operateDataIndex = -1;
      this.addFlag = false;
      this.validateFlag = false;
      this.$notify.closeAll();
    },
    // 查询表格数据
    handleQueryTable () {
      queryLoad({ TABLE_NAME: "ESMD_INFO_DETAIL" }).then((res) => {
        if (res.data.retcode === "01") {
          res.data.data.forEach((item) => {
            item.D_DATA_TYPE = item.D_DATA_TYPE && item.D_DATA_TYPE.split(",");
            item.D_SERVICE_START_DATE =
              item.D_SERVICE_START_DATE && moment(item.D_SERVICE_START_DATE);
            item.D_SERVICE_END_DATE =
              item.D_SERVICE_END_DATE && moment(item.D_SERVICE_END_DATE);
            item.D_DATA_START_DATE =
              item.D_DATA_START_DATE && moment(item.D_DATA_START_DATE);
            item.D_DATA_END_DATE =
              item.D_DATA_END_DATE && moment(item.D_DATA_END_DATE);
            return item;
          });
          this.loading = false;
          this.tableData = res.data.data;
          if (this.tableData.length === 0) {
            this.handleAddDate();
          }
          this.showTableData = [];
          this.handleShowTable(this.pageSize, this.currentPage);
        } else {
          res && this.$message.error(res.data.retmsg);
        }
      });
    },
    handleShowTable (pageSize, currentPage) {
      this.total = this.tableData.length;
      this.showTableData =
        this.tableData &&
        this.tableData.slice(
          pageSize * (currentPage - 1),
          pageSize * currentPage
        );
      // 当前只有1条数据
      if (this.showTableData.length === 0 && this.currentPage > 1) {
        this.currentPage = --this.currentPage;
        this.handleShowTable(this.pageSize, this.currentPage);
      }
    },
    // 文本框颜色重置
    handleResetColor () {
      const inputArr = document
        .getElementsByClassName("table")[0]
        .getElementsByTagName("input");
      inputArr &&
        inputArr.forEach((item) => {
          item.style.borderColor = "#DCDFE6";
        });
    },
    // 新增
    handleAddDate () {
      this.handleResetColor();
      this.$notify.closeAll();
      const lastData = this.tableData.slice(-1)[0];
      if (lastData && !lastData.ID) {
        this.tableData = this.tableData.slice(0, -1);
      }
      this.tableData.push({
        D_CHECK_INFO: "", // 校验信息
        D_DEPART_NAME: this.userInfo.depart, // 单位名称
        D_DEPART_LEVEL: "", // 单位类别
        D_SERVICE_MODE: "", // 通信方式
        D_SERVICE_TYPE: "", // 服务类型
        D_SERVICE_START_DATE: "", // 服务开始时间
        D_SERVICE_END_DATE: "", // 服务结束时间
        D_SERVICE_OBJ_NAME: "", // 单位名称-服务对象
        D_SERVICE_OBJ_TYPE: "", // 类别-服务对象
        D_DATA_TYPE: "", // 资料类别
        D_DATA_CONTENT: "", // 资料内容
        D_DATA_START_DATE: "", // 资料开始时间
        D_DATA_END_DATE: "", // 资料结束时间
        IS_CHARGE: "", // 是否收费
        IS_SERVICE_COMPANY: "", // 是否有独资或合资的涉及数据服务的公司情况
        DATA_SERVICE_COMPANYNAME: "", // 公司名称
        COMPANY_NATURE: "", // 公司性质
        JOINT_DEPART_NAME: "", // 合资单位名称
        JOINT_DEPART_NATURE: "", // 合资单位性质
        JOINT_PROPORTION: "", // 各合资单位股份占比
        DATA_SERVICE_CONDITION: "", // 公司数据服务情况
        D_MOME: "" // 备注
      });
      this.currentPage = Math.ceil(this.tableData.length / this.pageSize);
      this.handleShowTable(this.pageSize, this.currentPage);
      this.operateDataIndex = this.showTableData.length - 1;
      this.addFlag = true;
    },
    // 文件上传成功时的钩子
    handleSuccess (response, file, fileList) {
      if (response.retcode === "0") {
        this.$message({
          dangerouslyUseHTMLString: true,
          type: "success",
          message: `<p>导入成功</p><p>${response.data.success}</p><p>${response.data.fail}</p>`
        });
        this.loading = true;
        this.handleQueryTable();
        this.operateDataIndex = -1;
        this.addFlag = false;
      } else {
        this.$message.error(response.retmsg);
      }
    },
    // 文件上传失败时的钩子
    handleError () {
      this.$message.error("导入失败，请重试");
    },
    // 下载模板
    handleDownTem () {
      // window.open('http://10.40.25.96:8888/MDRSC/esmd/DownloadFile.svt?fileNames=ESMD_INFO_DETAIL.xlsx')
      const href = window.location.origin;
      // window.open('http://10.1.64.154/MDRSC/esmd/DownloadFile.svt?fileNames=ESMD_INFO_DETAIL.xlsx')
      window.open(
        href + "/MDRSC/esmd/DownloadFile.svt?fileNames=ESMD_INFO_DETAIL.xlsx"
      );
    },
    // 清空
    handleClearData () {
      this.$confirm("点击确定将清空本调查表所有数据，确认清空？", "确认清空", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$notify.closeAll();
          deleteData({
            TABLE_NAME: "ESMD_INFO_DETAIL"
          }).then((res) => {
            if (res.data.retcode === "01") {
              this.$message.success(res.data.retmsg);
              this.loading = true;
              this.tableData = [];
              this.handleQueryTable();
              this.operateDataIndex = -1;
              this.addFlag = false;
              this.currentPage = 1;
            } else {
              this.$message.error(res.data.retmsg);
            }
          });
        })
        .catch(() => {});
    },
    // 编辑
    handleEdit (scope) {
      this.oldData = JSON.parse(JSON.stringify(scope.row));
      this.operateDataIndex = scope.$index;
      this.addFlag = false;
    },
    // 复制
    handleCopy (scope) {
      // TODO 编辑后点复制bug
      if (this.operateDataIndex !== -1) {
        this.tableData.splice(this.operateDataIndex, 1, this.oldData);
      }
      const currentData = JSON.parse(JSON.stringify(scope.row));
      currentData.D_CHECK_INFO = "";
      delete currentData.ID;
      this.tableData.push(currentData);
      this.currentPage = Math.ceil(this.tableData.length / this.pageSize);
      this.handleShowTable(this.pageSize, this.currentPage);
      this.operateDataIndex = this.showTableData.length - 1;
      this.addFlag = true;
    },
    // 必填项检验
    handleValidate (current) {
      this.$notify.closeAll();
      this.validateFlag = false;
      const curKeys = current && Object.keys(current);
      let validateInfo = "";
      curKeys &&
        curKeys.forEach((item) => {
          if (
            (current[item] === null ||
              current[item] === "" ||
              current[item].length === 0) &&
            Object.keys(this.validateMsg).indexOf(item) > -1
          ) {
            if (current.IS_SERVICE_COMPANY === "有") {
              if (current.COMPANY_NATURE === "合资") {
                document.getElementsByName(item)[0].style.borderColor =
                  "#F56C6C";
                this.validateFlag = true;
                validateInfo += `<p>${this.validateMsg[item]}为必填项</p>`;
              } else {
                if (
                  item === "JOINT_DEPART_NAME" ||
                  item === "JOINT_DEPART_NATURE" ||
                  item === "JOINT_PROPORTION"
                ) {
                  document.getElementsByName(item)[0].style.borderColor =
                    "#DCDFE6";
                } else {
                  document.getElementsByName(item)[0].style.borderColor =
                    "#F56C6C";
                  this.validateFlag = true;
                  validateInfo += `<p>${this.validateMsg[item]}为必填项</p>`;
                }
              }
            } else {
              if (
                item === "DATA_SERVICE_COMPANYNAME" ||
                item === "COMPANY_NATURE" ||
                item === "JOINT_DEPART_NAME" ||
                item === "JOINT_DEPART_NATURE" ||
                item === "JOINT_PROPORTION"
              ) {
                document.getElementsByName(item)[0].style.borderColor =
                  "#DCDFE6";
              } else {
                document.getElementsByName(item)[0].style.borderColor =
                  "#F56C6C";
                this.validateFlag = true;
                validateInfo += `<p>${this.validateMsg[item]}为必填项</p>`;
              }
            }
          } else {
            Object.keys(this.validateMsg).indexOf(item) > -1 &&
              (document.getElementsByName(item)[0].style.borderColor =
                "#DCDFE6");
          }
        });
      validateInfo !== "" &&
        this.$notify({
          title: "错误提示",
          type: "error",
          duration: 0,
          dangerouslyUseHTMLString: true,
          message: validateInfo
        });
      return this.validateFlag;
    },
    // 保存
    handleSave (scope) {
      if (this.operateDataIndex === -1) {
        this.$message.warning("请操作数据后再进行保存");
      } else {
        const currentData = JSON.parse(JSON.stringify(scope.row));
        this.handleValidate(currentData);
        if (!this.validateFlag) {
          if (this.addFlag) {
            const addData = {
              D_DEPART_NAME: currentData.D_DEPART_NAME, // 单位名称
              D_DEPART_LEVEL: currentData.D_DEPART_LEVEL, // 单位类别
              D_SERVICE_MODE: currentData.D_SERVICE_MODE, // 通信方式
              D_SERVICE_TYPE: currentData.D_SERVICE_TYPE, // 服务类型
              D_SERVICE_START_DATE: currentData.D_SERVICE_START_DATE
                ? moment(currentData.D_SERVICE_START_DATE).format("YYYYMMDD")
                : "", // 服务开始时间
              D_SERVICE_END_DATE: currentData.D_SERVICE_END_DATE
                ? moment(currentData.D_SERVICE_END_DATE).format("YYYYMMDD")
                : "", // 服务结束时间
              D_SERVICE_OBJ_NAME: currentData.D_SERVICE_OBJ_NAME, // 单位名称-服务对象
              D_SERVICE_OBJ_TYPE: currentData.D_SERVICE_OBJ_TYPE, // 类别-服务对象
              D_DATA_TYPE: currentData.D_DATA_TYPE.join(","), // 资料类别
              D_DATA_CONTENT: currentData.D_DATA_CONTENT, // 资料内容
              D_DATA_START_DATE: currentData.D_DATA_START_DATE
                ? moment(currentData.D_DATA_START_DATE).format("YYYYMMDD")
                : "", // 资料开始时间
              D_DATA_END_DATE: currentData.D_DATA_END_DATE
                ? moment(currentData.D_DATA_END_DATE).format("YYYYMMDD")
                : "", // 资料结束时间
              IS_CHARGE: currentData.IS_CHARGE, // 是否收费
              IS_SERVICE_COMPANY: currentData.IS_SERVICE_COMPANY, // 是否有独资或合资的涉及数据服务的公司情况
              DATA_SERVICE_COMPANYNAME: currentData.DATA_SERVICE_COMPANYNAME, // 公司名称
              COMPANY_NATURE: currentData.COMPANY_NATURE, // 公司性质
              JOINT_DEPART_NAME: currentData.JOINT_DEPART_NAME, // 合资单位名称
              JOINT_DEPART_NATURE: currentData.JOINT_DEPART_NATURE, // 合资单位性质
              JOINT_PROPORTION: currentData.JOINT_PROPORTION, // 各合资单位股份占比
              DATA_SERVICE_CONDITION: currentData.DATA_SERVICE_CONDITION, // 公司数据服务情况
              D_MOME: currentData.D_MOME // 备注
            };
            addInsert({
              TABLE_NAME: "ESMD_INFO_DETAIL",
              ...addData
            }).then((res) => {
              if (res.data.retcode === "01") {
                this.$message.success(res.data.retmsg);
                this.loading = true;
                // this.tableData = []
                this.handleQueryTable();
                this.operateDataIndex = -1;
                this.addFlag = false;
              } else {
                this.$message.error(res.data.retmsg);
              }
            });
          } else {
            const changeData = JSON.parse(JSON.stringify(currentData));
            changeData.D_DATA_TYPE = currentData.D_DATA_TYPE.join(",");
            changeData.D_SERVICE_START_DATE = currentData.D_SERVICE_START_DATE
              ? moment(currentData.D_SERVICE_START_DATE).format("YYYYMMDD")
              : "";
            changeData.D_SERVICE_END_DATE = currentData.D_SERVICE_END_DATE
              ? moment(currentData.D_SERVICE_END_DATE).format("YYYYMMDD")
              : "";
            changeData.D_DATA_START_DATE = currentData.D_DATA_START_DATE
              ? moment(currentData.D_DATA_START_DATE).format("YYYYMMDD")
              : "";
            changeData.D_DATA_END_DATE = currentData.D_DATA_END_DATE
              ? moment(currentData.D_DATA_END_DATE).format("YYYYMMDD")
              : "";
            updateData({
              TABLE_NAME: "ESMD_INFO_DETAIL",
              ...changeData
            }).then((res) => {
              if (res.data.retcode === "01") {
                this.$message.success(res.data.retmsg);
                this.loading = true;
                // this.tableData = []
                this.handleQueryTable();
                this.operateDataIndex = -1;
                this.addFlag = false;
              } else {
                this.$message.error(res.data.retmsg);
              }
            });
          }
        }
      }
    },
    // 删除
    handleDel (scope) {
      this.$notify.closeAll();
      if (scope.row.ID) {
        deleteData({
          TABLE_NAME: "ESMD_INFO_DETAIL",
          ID: scope.row.ID
        }).then((res) => {
          if (res.data.retcode === "01") {
            this.$message.success(res.data.retmsg);
            this.loading = true;
            // this.tableData = []
            this.handleQueryTable();
            this.operateDataIndex = -1;
            this.addFlag = false;
          } else {
            this.$message.error(res.data.retmsg);
          }
        });
      } else {
        this.tableData.pop();
        this.handleQueryTable();
        this.operateDataIndex = -1;
        this.addFlag = false;
      }
    },
    // 页码切换
    handleChangePage () {
      this.operateDataIndex = -1;
      this.handleShowTable(this.pageSize, this.currentPage);
    }
  }
};
</script>

<style lang="less" scoped>
.detail {
  .title {
    margin-bottom: 5px;
    text-align: left;
    .el-icon-s-platform {
      margin-right: 5px;
      color: #409eff;
      font-size: 18px;
      vertical-align: bottom;
    }
  }
  .upload-demo {
    display: inline-block;
    margin: 0 10px;
    .el-button {
      font-size: 14px;
    }
  }
  .el-table {
    .el-date-editor {
      width: 100% !important;
    }
  }
  .el-pagination {
    margin-top: 10px;
    text-align: right;
  }
  .explain {
    margin-top: 10px;
    padding: 20px 23px;
    background: #efefef;
    p {
      margin: 0;
      line-height: 1.5;
      text-align: left;
      color: #f52d2d;
    }
  }
  .operateButton {
    text-align: right;
  }
  /deep/ .el-dialog {
    top: 50%;
    margin-top: -157px !important;
  }
  /deep/ .el-dialog__body {
    padding: 5px 25px !important;
  }
  .el-dialog__body span {
    line-height: 24px;
    font-size: 16px;
    text-indent: 2em;
    display: inline-block;
  }
  .el-dialog__body a {
    color: #01a1ff;
  }
  /deep/ .el-dialog--center {
    background: url("../../../assets/image/bg.png") no-repeat;
    background-size: 100% 100%;
  }
  /deep/ .el-dialog__footer {
    padding-bottom: 60px;
  }
  .dialog-footer .el-button {
    width: 140px;
    height: 36px;
    background: #459df6;
    box-shadow: 0px 3px 8px 0px rgba(8, 80, 153, 0.42);
    border-radius: 18px;
  }
  /deep/ .el-dialog__headerbtn {
    display: none;
  }
  /deep/ .el-dialog__title {
    font-weight: bold;
    font-size: 22px;
    color: #000;
    position: relative;
  }
  /deep/ .el-dialog__title:before,
  /deep/ .el-dialog__title:after {
    content: "";
    position: absolute;
    top: 5px;
    width: 36px;
    height: 16px;
    background-size: 100% 100%;
  }
  /deep/ .el-dialog__title:before {
    background: url("../../../assets/image/img.png") no-repeat;
    left: -40px;
  }
  /deep/ .el-dialog__title:after {
    background: url("../../../assets/image/img2.png") no-repeat;
    right: -40px;
  }
  /deep/ .el-table thead.is-group th {
    padding: 8px 0px !important;
    background-color: #459df6;
    color: #fffefe;
    border-color: #388ee2;
  }
  /deep/ .tbody tr:nth-child(even) td {
    background: #f2fafd;
  }
  /deep/ .el-textarea__inner {
    padding: 5px 8px;
  }
  .red {
    color: #f00;
  }
}
</style>
