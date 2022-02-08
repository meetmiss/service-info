<template>
  <div class="detail">
    <div class="title">
      <div>
        <i class="el-icon-s-platform"></i>
        <span>服务情况详表</span>
      </div>
    </div>
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
    >
      <el-divider content-position="left">单位信息</el-divider>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="单位名称" prop="D_DEPART_NAME">
            <el-input
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 3 }"
              v-model="ruleForm.D_DEPART_NAME"
              placeholder="请填写单位名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单位类别" prop="D_DEPART_LEVEL">
            <el-select
              name="D_DEPART_LEVEL"
              v-model="ruleForm.D_DEPART_LEVEL"
              placeholder="请选择单位类别"
            >
              <el-option
                v-for="item in selectList.unitTypeList"
                :key="item.code"
                :label="item.text"
                :value="item.text"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="left">服务信息</el-divider>
        <el-col :span="12">
          <el-form-item label="服务类型" prop="D_SERVICE_TYPE">
            <el-select
              name="D_SERVICE_TYPE"
              v-model="ruleForm.D_SERVICE_TYPE"
              placeholder="请选择服务类型"
            >
              <el-option
                v-for="item in selectList.serviceTypeList"
                :key="item.code"
                :label="item.text"
                :value="item.text"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="通信方式" prop="D_SERVICE_MODE">
            <el-select
              name="D_SERVICE_MODE"
              v-model="ruleForm.D_SERVICE_MODE"
              placeholder="请选择通信方式"
            >
              <el-option
                v-for="item in selectList.serviceModeList"
                :key="item.code"
                :label="item.text"
                :value="item.text"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="服务方式" prop="D_SERVICE_METHOD">
            <el-select
              name="D_SERVICE_METHOD"
              v-model="ruleForm.D_SERVICE_METHOD"
              placeholder="请选择服务方式"
            >
              <el-option
                v-for="item in selectList.serveModeList"
                :key="item.code"
                :label="item.text"
                :value="item.text"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="服务开始时间" prop="D_SERVICE_START_DATE">
            <el-date-picker
              name="D_SERVICE_START_DATE"
              v-model="ruleForm.D_SERVICE_START_DATE"
              type="datetime"
              format="yyyy-MM-dd"
              placeholder="选择服务开始时间"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="服务结束时间" prop="D_SERVICE_END_DATE">
            <el-date-picker
              name="D_SERVICE_END_DATE"
              v-model="ruleForm.D_SERVICE_END_DATE"
              type="datetime"
              format="yyyy-MM-dd"
              placeholder="选择服务结束时间"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="left">服务对象</el-divider>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="单位名称" prop="D_SERVICE_OBJ_NAME">
            <el-input
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 3 }"
              v-model="ruleForm.D_SERVICE_OBJ_NAME"
              placeholder="请填写单位名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类别" prop="D_SERVICE_OBJ_TYPE">
            <el-select
              name="D_SERVICE_OBJ_TYPE"
              v-model="ruleForm.D_SERVICE_OBJ_TYPE"
              placeholder="请选择类别"
            >
              <el-option
                v-for="item in selectList.serviceUnitTypeList"
                :key="item.code"
                :label="item.text"
                :value="item.text"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="left">服务内容</el-divider>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="资料类别" prop="D_DATA_TYPE">
            <el-select
              name="D_DATA_TYPE"
              v-model="ruleForm.D_DATA_TYPE"
              placeholder="请选择资料类别"
            >
              <el-option
                v-for="item in selectList.cotegoryList"
                :key="item.code"
                :label="item.text"
                :value="item.text"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="资料开始时间" prop="D_DATA_START_DATE">
            <el-date-picker
              name="D_DATA_START_DATE"
              v-model="ruleForm.D_DATA_START_DATE"
              type="datetime"
              format="yyyy-MM-dd"
              placeholder="选择资料开始时间"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="资料结束时间" prop="D_DATA_END_DATE">
            <el-date-picker
              name="D_DATA_END_DATE"
              v-model="ruleForm.D_DATA_END_DATE"
              type="datetime"
              format="yyyy-MM-dd"
              placeholder="选择资料结束时间"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否收费" prop="IS_CHARGE">
            <el-select
              name="IS_CHARGE"
              v-model="ruleForm.IS_CHARGE"
              placeholder="请选择是否收费"
            >
              <el-option
                v-for="item in selectList.chargeList"
                :key="item.code"
                :label="item.text"
                :value="item.text"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="资料内容" prop="D_DATA_CONTENT">
            <el-input
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 3 }"
              v-model="ruleForm.D_DATA_CONTENT"
              placeholder="请填写资料内容"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="left"
        >独资或合资的涉及数据服务的公司情况</el-divider
      >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="是否有该情况" prop="IS_SERVICE_COMPANY">
            <el-select
              name="IS_SERVICE_COMPANY"
              v-model="ruleForm.IS_SERVICE_COMPANY"
              placeholder="请选择是否有该情况"
            >
              <el-option
                v-for="item in selectList.companyList"
                :key="item.code"
                :label="item.text"
                :value="item.text"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="ruleForm.IS_SERVICE_COMPANY === '有'">
          <el-form-item label="公司名称" prop="DATA_SERVICE_COMPANYNAME">
            <el-input v-model="ruleForm.DATA_SERVICE_COMPANYNAME"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="ruleForm.IS_SERVICE_COMPANY === '有'">
          <el-form-item label="公司性质" prop="COMPANY_NATURE">
            <el-select
              name="COMPANY_NATURE"
              v-model="ruleForm.COMPANY_NATURE"
              placeholder="请选择公司性质"
            >
              <el-option
                v-for="item in selectList.companyTypeList"
                :key="item.code"
                :label="item.text"
                :value="item.text"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          :span="12"
          v-if="
            ruleForm.IS_SERVICE_COMPANY === '有' &&
            ruleForm.COMPANY_NATURE === '合资'
          "
        >
          <el-form-item label="合资单位性质" prop="JOINT_DEPART_NATURE">
            <el-input
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 3 }"
              v-model="ruleForm.JOINT_DEPART_NATURE"
              placeholder="事业单位，国营，私企，自然人等"
            ></el-input>
            <!-- <el-select
              name="JOINT_DEPART_NATURE"
              v-model="ruleForm.JOINT_DEPART_NATURE"
              placeholder="请选择合资单位性质"
            >
              <el-option
                v-for="item in selectList.ventureTypeList"
                :key="item.code"
                :label="item.text"
                :value="item.text"
              ></el-option>
            </el-select> -->
          </el-form-item>
        </el-col>
        <el-col
          :span="12"
          v-if="
            ruleForm.IS_SERVICE_COMPANY === '有' &&
            ruleForm.COMPANY_NATURE === '合资'
          "
        >
          <el-form-item label="合资单位名称" prop="JOINT_DEPART_NAME">
            <el-input
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 3 }"
              v-model="ruleForm.JOINT_DEPART_NAME"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="ruleForm.IS_SERVICE_COMPANY === '有'">
          <el-form-item label="数据服务情况" prop="DATA_SERVICE_CONDITION">
            <el-input
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 3 }"
              v-model="ruleForm.DATA_SERVICE_CONDITION"
              placeholder="请填写数据服务情况"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col
          :span="12"
          v-if="
            ruleForm.IS_SERVICE_COMPANY === '有' &&
            ruleForm.COMPANY_NATURE === '合资'
          "
        >
          <el-form-item label="股份占比" prop="JOINT_PROPORTION">
            <el-input
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 3 }"
              v-model="ruleForm.JOINT_PROPORTION"
              placeholder="请填写各合资单位股份占比"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="left">其他</el-divider>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="备注" prop="D_MOME">
            <el-input
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 3 }"
              v-model="ruleForm.D_MOME"
              placeholder="如省级单位服务类型选择专线，则需填写专线是否由信息中心统一管理；如国家级单位服务类型选择专线，则需填写专线是否由国家气象信息中心统一管理"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="margin-bottom: 10px">
      <el-button type="primary" @click="handleSave(ruleForm)">保存</el-button>
      <el-button type="primary" @click="submit(ruleForm)">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </div>
    <div class="operateButton">
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
      <el-button type="text" @click="handleExport">导出</el-button>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        v-loading="loading"
        element-loading-text="拼命加载中..."
        element-loading-background="rgba(0,0,0,0.1)"
        :fit="true"
      >
        <el-table-column
          align="center"
          label="校验信息"
          min-width="150"
        >
        <template slot-scope="scope">
              <span style="color: #f00">{{ scope.row.D_CHECK_INFO }}</span>
            </template>
        </el-table-column>
        <el-table-column align="center" label="单位信息">
          <el-table-column align="center" label="单位名称" min-width="200">
            <template slot-scope="scope">
              <span v-if="scope.row.D_CHECK_INFO" style="color: #f00">{{ scope.row.D_DEPART_NAME }}</span>
              <span v-else>{{ scope.row.D_DEPART_NAME }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="单位类别" min-width="170">
            <template slot-scope="scope">
              <span v-if="scope.row.D_CHECK_INFO" style="color: #f00">{{ scope.row.D_DEPART_LEVEL }}</span>
              <span v-else>{{ scope.row.D_DEPART_LEVEL }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="服务类型" min-width="170">
          <template slot-scope="scope">
            <span v-if="scope.row.D_CHECK_INFO" style="color: #f00">{{ scope.row.D_SERVICE_TYPE }}</span>
            <span v-else>{{ scope.row.D_SERVICE_TYPE }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="通信方式" min-width="170">
          <template slot-scope="scope">
            <span v-if="scope.row.D_CHECK_INFO" style="color: #f00">{{ scope.row.D_SERVICE_MODE }}</span>
            <span v-else>{{ scope.row.D_SERVICE_MODE }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="服务方式" min-width="170">
          <template slot-scope="scope">
            <span v-if="scope.row.D_CHECK_INFO" style="color: #f00">{{ scope.row.D_SERVICE_METHOD }}</span>
            <span v-else>{{ scope.row.D_SERVICE_METHOD }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="服务开始时间" min-width="170">
          <template slot-scope="scope">
            <span v-if="scope.row.D_CHECK_INFO" style="color: #f00">{{ scope.row.D_SERVICE_START_DATE | datePickerChange }}</span>
            <span v-else>{{ scope.row.D_SERVICE_START_DATE | datePickerChange }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="服务结束时间" min-width="170">
          <template slot-scope="scope">
            <span v-if="scope.row.D_CHECK_INFO" style="color: #f00">{{ scope.row.D_SERVICE_END_DATE | datePickerChange }}</span>
            <span v-else>{{ scope.row.D_SERVICE_END_DATE | datePickerChange }}</span>
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
              <span v-if="scope.row.D_CHECK_INFO" style="color: #f00">{{ scope.row.D_SERVICE_OBJ_NAME }}</span>
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
              <span v-if="scope.row.D_CHECK_INFO" style="color: #f00">{{ scope.row.D_SERVICE_OBJ_TYPE }}</span>
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
              <span v-if="scope.row.D_CHECK_INFO" style="color: #f00">{{ scope.row.D_DATA_TYPE | cotegoryChange }}</span>
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
              <span v-if="scope.row.D_CHECK_INFO" style="color: #f00">{{ scope.row.D_DATA_CONTENT }}</span>
              <span v-else>{{ scope.row.D_DATA_CONTENT }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="资料开始时间" min-width="170">
          <template slot-scope="scope">
            <span v-if="scope.row.D_CHECK_INFO" style="color: #f00">{{ scope.row.D_DATA_START_DATE | datePickerChange }}</span>
            <span v-else>{{ scope.row.D_DATA_START_DATE | datePickerChange }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="资料结束时间" min-width="170">
          <template slot-scope="scope">
            <span v-if="scope.row.D_CHECK_INFO" style="color: #f00">{{ scope.row.D_DATA_END_DATE | datePickerChange }}</span>
            <span v-else>{{ scope.row.D_DATA_END_DATE | datePickerChange }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="IS_CHARGE"
          label="是否收费"
          min-width="170"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.D_CHECK_INFO" style="color: #f00">{{ scope.row.IS_CHARGE }}</span>
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
            <span v-if="scope.row.D_CHECK_INFO" style="color: #f00">{{ scope.row.IS_SERVICE_COMPANY }}</span>
            <span v-else>{{ scope.row.IS_SERVICE_COMPANY }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="公司信息">
          <el-table-column align="center" label="公司名称" min-width="170">
            <template slot-scope="scope">
              <span v-if="scope.row.D_CHECK_INFO" style="color: #f00">{{ scope.row.DATA_SERVICE_COMPANYNAME }}</span>
              <span v-else>{{ scope.row.DATA_SERVICE_COMPANYNAME }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="公司性质" min-width="170">
            <template slot-scope="scope">
              <span v-if="scope.row.D_CHECK_INFO" style="color: #f00">{{ scope.row.COMPANY_NATURE }}</span>
              <span v-else>{{ scope.row.COMPANY_NATURE }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="合资单位信息">
          <el-table-column align="center" label="合资单位名称" min-width="180">
            <template slot-scope="scope">
              <span v-if="scope.row.D_CHECK_INFO" style="color: #f00">{{ scope.row.JOINT_DEPART_NAME }}</span>
              <span v-else>{{ scope.row.JOINT_DEPART_NAME }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="合资单位性质" min-width="170">
            <template slot-scope="scope">
              <span v-if="scope.row.D_CHECK_INFO" style="color: #f00">{{ scope.row.JOINT_DEPART_NATURE }}</span>
              <span v-else>{{ scope.row.JOINT_DEPART_NATURE }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="各合资单位股份占比"
            min-width="230"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.D_CHECK_INFO" style="color: #f00">{{ scope.row.JOINT_PROPORTION }}</span>
              <span v-else>{{ scope.row.JOINT_PROPORTION }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          align="center"
          label="公司数据服务情况"
          min-width="210"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.D_CHECK_INFO" style="color: #f00">{{ scope.row.DATA_SERVICE_CONDITION }}</span>
              <span v-else>{{ scope.row.DATA_SERVICE_CONDITION }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="D_MOME"
          label="备注"
          min-width="170"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.D_CHECK_INFO" style="color: #f00">{{ scope.row.D_MOME }}</span>
              <span v-else>{{ scope.row.D_MOME }}</span>
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
              v-if="scope.row.ID && operateDataIndex !== scope.$index"
              @click="handleEdit(scope)"
              :disabled="
                operateDataIndex !== -1 && operateDataIndex !== scope.$index
              "
              >编辑</el-button
            >
            <el-button
              type="text"
              v-if="scope.row.ID && operateDataIndex === scope.$index"
              @click="handleCancel()"
              :disabled="
                operateDataIndex !== -1 && operateDataIndex !== scope.$index
              "
              >取消</el-button
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
      <!-- <p>
        1、需详细填写2018年至今的所有对外服务信息。其中服务时间项目填写时需注意，当服务类型为“一次性”时（例如离线单），服务时间需填写起止时间-结束时间（YYYYMMDD-YYYYMMDD）；当服务类型为“持续”时，服务时间仅需注明服务起始时间YYYYMMDD即可；
      </p>
      <p>2、如无内容填0或者无。</p> -->
      <p>1、点击导出可导出上次填报表格，点击下载模板可查看本次填报模板</p>
      <p>
        2、中国气象局预报与网络司负责本填报系统的管理以及各单位填报信息的审查和保密，联系人：中国气象局预报与网络司
        李俊 电话：010-58994454
      </p>
      <p>3、平台技术支持群：805589757</p>
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
  serveModeList,
  serviceTypeList,
  serviceUnitTypeList,
  cotegoryList,
  chargeList,
  companyList,
  companyTypeList,
  ventureTypeList,
  detailErrInfo,
} from "@/mock/mock.js";
import moment from "moment";
import { queryLoad, addInsert, updateData, deleteData, login, submit } from "@/api";
export default {
  name: "detail",
  prop: ["activeName", "userInfo"],
  data() {
    return {
      tableData: [],
      showTableData: [],
      operateDataIndex: -1, // 编辑的数据索引
      selectList: {
        unitTypeList,
        serviceModeList,
        serveModeList,
        serviceTypeList,
        serviceUnitTypeList,
        cotegoryList,
        chargeList,
        companyList,
        companyTypeList,
        ventureTypeList,
      },
      userInfo: {
        // 用户信息
        role: "",
        level: "",
        depart: "",
        userid: "",
        account: "",
        username: "",
        isFill: "",
        retcode: ""
      },
      // loading: false, // 加载动画效果
      loading: true, // 加载动画效果
      addFlag: true, // 新增flag
      currentPage: 1,
      pageSize: 10,
      total: 0,
      validateMsg: detailErrInfo,
      validateFlag: false,
      oldData: null, // 当前编辑数据
      centerDialogVisible: true,
      // centerDialogVisible: false,
      isDisabled: true,
      ruleForm: {
        D_CHECK_INFO: "", // 校验信息
        D_DEPART_NAME: this.userInfo && this.userInfo.depart ? this.userInfo.depart : "", // 单位名称
        D_DEPART_LEVEL: "", // 单位类别
        D_SERVICE_MODE: "", // 通信方式
        D_SERVICE_METHOD: "", // 服务方式
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
        D_MOME: "", // 备注
      },
    };
  },
  filters: {
    datePickerChange: (value) => {
      return value && moment(value).format("YYYY-MM-DD");
    },
    cotegoryChange: (value) => {
      return value && value.length > 0 ? value.join() : "";
    },
  },
  watch: {
    activeName: {
      handler(val) {
        if (val === "second") {
          this.handleQueryTable();
        }
      },
    },
  },
  created() {
    this.isDisabled = true;
    // this.handleIframe();
    this.handleQueryTable();
    this.ruleForm.D_DEPART_NAME = this.userInfo && this.userInfo.depart ? this.userInfo.depart : "";
  },
  methods: {
    handleIframe() {
      if (this.iframeDom) {
        document.body.removeChild(this.iframeDom);
      }
      this.iframeDom = document.createElement("iframe");
      // this.iframeDom.setAttribute('src', "http://10.1.64.154/idata/web/user/caloginPage?returnURL=http://10.40.25.96:8888/MDRSC/data/caLogin2.svt")
      this.iframeDom.setAttribute(
        "src",
        "http://10.1.64.154/idata/web/user/caloginPage?returnURL=http://10.1.64.154/MDRSC/data/caLogin2.svt"
      );
      this.iframeDom.setAttribute("style", "display: none;");
      this.iframeDom.setAttribute("name", "caLogin");
      document.body.appendChild(this.iframeDom);
      const _this = this;
      let websocket = null;
      // 判断当前浏览器是否支持WebSocket
      if ("WebSocket" in window) {
        // websocket = new WebSocket(`ws://10. 40.25.96:8888/MDRSC/webSocket`);
        websocket = new WebSocket(`ws://10.1.64.154/MDRSC/webSocket`);
      } else {
        alert("当前浏览器 Not support websocket");
      }
      // 连接发生错误的回调方法
      websocket.onerror = function () {
        setMessageInnerHTML("WebSocket连接发生错误");
      };
      // 连接成功建立的回调方法
      websocket.onopen = function () {
        _this.firstLogin = false;
        setMessageInnerHTML("WebSocket连接成功");
        if (!_this.firstLogin) {
          setTimeout(() => {
            websocket.onmessage();
          }, 3000);
        }
      };
      // 接收到消息的回调方法
      websocket.onmessage = function (event) {
        if (event) {
          _this.firstLogin = true;
          setTimeout(() => {
            const res = JSON.parse(event.data);
            if (res.retcode === "01") {
              _this.handleLogin();
              websocket.close();
            } else {
              alert("证书登录失败");
              window.location.href = "http://10.1.64.154/";
              websocket.close();
            }
          }, 200);
        } else if (!_this.firstLogin) {
          alert("证书登录失败");
          window.location.href = "http://10.1.64.154/";
        }
      };
      // 连接关闭的回调方法
      websocket.onclose = function () {
        setMessageInnerHTML("WebSocket连接关闭");
      };
      // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = function () {
        closeWebSocket();
      };
      // 将消息显示在网页上
      function setMessageInnerHTML(innerHTML) {
        // console.log(innerHTML)
      }
      // 关闭WebSocket连接
      function closeWebSocket() {
        websocket.close();
      }
    },
    handleLogin() {
      login().then((res) => {
        if (res.data.retcode === "01") {
          this.loginFlag = true;
          this.userInfo = res.data;
          this.ruleForm.D_DEPART_NAME = this.userInfo && this.userInfo.depart ? this.userInfo.depart : "";
        } else {
          alert("证书登录失败");
          window.location.href = "http://10.1.64.154/";
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm.D_DEPART_NAME = this.userInfo && this.userInfo.depart ? this.userInfo.depart : ""
    },
    handleCancel () {
      this.$refs['ruleForm'].resetFields();
      this.ruleForm.D_DEPART_NAME = this.userInfo && this.userInfo.depart ? this.userInfo.depart : ""
      this.isDisabled = true;
      this.operateDataIndex = -1;
      this.addFlag = true;
    },
    // 查询表格数据
    handleQueryTable() {
      queryLoad({ TABLE_NAME: "ESMD_INFO_DETAIL",pageSize: this.pageSize, currentPage: this.currentPage }).then((res) => {
        this.isDisabled = true;
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
          this.ruleForm.D_DEPART_NAME = this.userInfo && this.userInfo.depart ? this.userInfo.depart : "";
          this.loading = false;
          this.tableData = res.data.data;
          this.total = res.data.count.NUM;
          this.showTableData = [];
          this.handleShowTable(this.pageSize, this.currentPage);
        } else {
          this.loading = false;
          res && this.$message.error(res.data.retmsg);
        }
      }).catch(() => {
        this.loading = false;
      });
    },
    handleShowTable(pageSize, currentPage) {
      // this.total = this.tableData.length;
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
    handleResetColor() {
      const inputArr = document
        .getElementsByClassName("table")[0]
        .getElementsByTagName("input");
      inputArr &&
        inputArr.forEach((item) => {
          item.style.borderColor = "#DCDFE6";
        });
    },
    // 新增
    // handleAddDate() {
    //   this.handleResetColor();
    //   this.$notify.closeAll();
    //   const lastData = this.tableData.slice(-1)[0];
    //   if (lastData && !lastData.ID) {
    //     this.tableData = this.tableData.slice(0, -1);
    //   }
    //   this.isDisabled = false;
    //   this.resetForm("ruleForm");
    //   this.operateDataIndex = this.showTableData.length - 1;
    //   this.addFlag = true;
    // },
    // 文件上传成功时的钩子
    handleSuccess(response, file, fileList) {
      this.isDisabled = true;
      if (response.retcode === "0") {
        this.$message({
          dangerouslyUseHTMLString: true,
          type: "success",
          message: `<p>导入成功</p><p>${response.data.success}</p><p>${response.data.fail}</p>`,
        });
        this.loading = true;
        this.handleQueryTable();
        this.operateDataIndex = -1;
        this.addFlag = true;
      } else {
        this.$message.error(response.retmsg);
      }
    },
    // 文件上传失败时的钩子
    handleError() {
      this.$message.error("导入失败，请重试");
    },
    // 下载模板
    handleDownTem() {
      // window.open('http://10.40.25.96:8888/MDRSC/esmd/DownloadFile.svt?fileNames=ESMD_INFO_DETAIL.xlsx')
      const href = window.location.origin;
      // window.open('http://10.1.64.154/MDRSC/esmd/DownloadFile.svt?fileNames=ESMD_INFO_DETAIL.xlsx')
      window.open(
        href + "/MDRSC/esmd/DownloadFile.svt?fileNames=ESMD_INFO_DETAIL.xlsx"
      );
    },
    // 导出
    handleExport() {
      // window.open('http://10.40.25.96:8888/MDRSC/esmd/DownloadFile.svt?fileNames=ESMD_INFO_DETAIL.xlsx')
      const href = window.location.origin;
      // window.open('http://10.1.64.154/MDRSC/esmd/DownloadFile.svt?fileNames=ESMD_INFO_DETAIL.xlsx')
      window.open(
        href + "/MDRSC/api/rest/ExcelDownloadServlet.svt?TABLE_NAME=ESMD_INFO_DETAIL"
      );
    },
    // 清空
    handleClearData() {
      this.$confirm("点击确定将清空本调查表所有数据，确认清空？", "确认清空", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          this.$notify.closeAll();
          this.isDisabled = true;
          deleteData({
            TABLE_NAME: "ESMD_INFO_DETAIL",
          }).then((res) => {
            if (res.data.retcode === "01") {
              this.$message.success(res.data.retmsg);
              this.loading = true;
              this.tableData = [];
              this.handleQueryTable();
              this.operateDataIndex = -1;
              this.addFlag = true;
              this.currentPage = 1;
            } else {
              this.$message.error(res.data.retmsg);
            }
          });
        })
        .catch(() => {});
    },
    // 编辑
    handleEdit(scope) {
      this.oldData = JSON.parse(JSON.stringify(scope.row));
      this.ruleForm = this.oldData;
      this.operateDataIndex = scope.$index;
      this.addFlag = false;
      this.isDisabled = false;
    },
    // 必填项检验
    handleValidate(current) {
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
            if (current.D_SERVICE_MODE === '专线') {
              if (
                  document.getElementsByName(item)[0] &&
                  document.getElementsByName(item)[0].style
                ) {
                  document.getElementsByName(item)[0].style.borderColor =
                    "#F56C6C";
                } else {
                  document.getElementsByTagName("textarea").length > 0 &&
                    Array.from(document.getElementsByTagName("textarea")).map(
                      (item) => {
                        if (!item.value) {
                          item.style.borderColor = "#F56C6C";
                        } else {
                          item.style.borderColor = "#DCDFE6";
                        }
                      }
                    );
                }
                this.validateFlag = true;
                validateInfo += `<p>${this.validateMsg[item]}为必填项</p>`;
            } else {
              if (
                  document.getElementsByName(item)[0] &&
                  document.getElementsByName(item)[0].style
                ) {
                  document.getElementsByName(item)[0].style.borderColor =
                    "#F56C6C";
                } else {
                  document.getElementsByTagName("textarea").length > 0 &&
                Array.from(document.getElementsByTagName("textarea")).map(
                  (val) => {
                    if (!val.value) {
                      if (val.placeholder.indexOf('备注') > -1) {
                        val.style.borderColor = "#DCDFE6";
                      } else {
                        val.style.borderColor = "#F56C6C";
                      }
                    } else {
                      val.style.borderColor = "#DCDFE6";
                    }
                  }
                );
                }
                this.validateFlag = true;
                validateInfo += `<p>${this.validateMsg[item]}为必填项</p>`;
            }
          } else {
            if (
              document.getElementsByName(item)[0] &&
              document.getElementsByName(item)[0].style
            ) {
              Object.keys(this.validateMsg).indexOf(item) > -1 &&
                (document.getElementsByName(item)[0].style.borderColor =
                  "#DCDFE6");
            } else {
              document.getElementsByTagName("textarea").length > 0 &&
                Array.from(document.getElementsByTagName("textarea")).map(
                  (val) => {
                    if (!val.value) {
                      if (val.placeholder.indexOf('备注') > -1) {
                        val.style.borderColor = "#DCDFE6";
                      } else {
                        val.style.borderColor = "#F56C6C";
                      }
                    } else {
                      val.style.borderColor = "#DCDFE6";
                    }
                  }
                );
            }
          }
        });
      validateInfo !== "" &&
        this.$notify({
          title: "错误提示",
          type: "error",
          duration: 0,
          dangerouslyUseHTMLString: true,
          message: validateInfo,
        });
      return this.validateFlag;
    },
    // 提交
    submit() {
      submit({TABLE_NAME: "ESMD_INFO_DETAIL"}).then((res) => {
        if (res.data.retcode === '01') {
          this.$message({
            message: res.data.retmsg,
            type: 'success'
          });
          this.handleQueryTable();
        } else {
          this.$message({
            message: res.data.retmsg,
            type: 'warning'
          });
        }
      })
    },
    // 保存
    handleSave(scope) {
      if (this.operateDataIndex === -1 && scope.row) {
        this.$message.warning("请操作数据后再进行保存");
      } else {
        const currentData = JSON.parse(
          JSON.stringify(scope.row ? scope.row : scope)
        );
        this.handleValidate(currentData);
        if (!this.validateFlag) {
          this.$refs['ruleForm'].resetFields();
          this.ruleForm.D_DEPART_NAME = this.userInfo && this.userInfo.depart ? this.userInfo.depart : "";
          if (this.addFlag) {
            const addData = {
              D_DEPART_NAME: currentData.D_DEPART_NAME, // 单位名称
              D_DEPART_LEVEL: currentData.D_DEPART_LEVEL, // 单位类别
              D_SERVICE_MODE: currentData.D_SERVICE_MODE, // 通信方式
              D_SERVICE_METHOD: currentData.D_SERVICE_METHOD, // 服务方式
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
              D_MOME: currentData.D_MOME, // 备注
            };
            this.isDisabled = true;
            addInsert({
              TABLE_NAME: "ESMD_INFO_DETAIL",
              ...addData,
            }).then((res) => {
              if (res.data.retcode === "01") {
                this.$message.success(res.data.retmsg);
                this.loading = true;
                // this.tableData = []
                this.handleQueryTable();
                this.operateDataIndex = -1;
                this.addFlag = true;
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
              ...changeData,
            }).then((res) => {
              if (res.data.retcode === "01") {
                this.$message.success(res.data.retmsg);
                this.loading = true;
                // this.tableData = []
                this.handleQueryTable();
                this.operateDataIndex = -1;
                this.addFlag = true;
                this.isDisabled = true;
                this.$refs["ruleForm"].resetFields();
              } else {
                this.$message.error(res.data.retmsg);
              }
            });
          }
        }
      }
    },
    // 删除
    handleDel(scope) {
      this.$notify.closeAll();
      if (scope.row.ID) {
        deleteData({
          TABLE_NAME: "ESMD_INFO_DETAIL",
          ID: scope.row.ID,
        }).then((res) => {
          if (res.data.retcode === "01") {
            this.$message.success(res.data.retmsg);
            this.loading = true;
            // this.tableData = []
            this.handleQueryTable();
            this.operateDataIndex = -1;
            this.addFlag = true;
          } else {
            this.$message.error(res.data.retmsg);
          }
        });
      } else {
        this.tableData.pop();
        this.handleQueryTable();
        this.operateDataIndex = -1;
        this.addFlag = true;
      }
    },
    // 页码切换
    handleChangePage() {
      this.operateDataIndex = -1;
      this.handleShowTable(this.pageSize, this.currentPage);
    },
  },
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
  /deep/ .el-form-item {
    margin-bottom: 10px;
  }
  /deep/ .el-form-item__content > div {
    width: 100%;
  }
  // /deep/ .el-form {
  //   max-height: 200px;
  //   overflow: hidden auto;
  // }
  .red {
    color: #f00;
  }
  /deep/ textarea {
    line-height: 28px;
    min-height: 28px;
  }
}
</style>
