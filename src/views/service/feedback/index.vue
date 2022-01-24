<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="110px">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="queryParams.userName" placeholder="请输入用户名" clearable size="small" 
        @keyup.enter.native="handleQuery" />
      </el-form-item>

       <el-form-item label="问题反馈分类名" prop="typeName">
        <el-input v-model="queryParams.typeName" placeholder="请输入分类名" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
  
      <el-form-item label="类型" prop="isShow">
        <el-select v-model="queryParams.isShow" placeholder="问题反馈类型" clearable size="small">
          <el-option
            v-for="item in isShow"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['service:feedback:remove']"
        >删除</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="dataList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" width="100" />
      <el-table-column label="用户名" align="center" prop="userName" :show-overflow-tooltip="true" />
      <el-table-column label="反馈信息" align="center" prop="info" :show-overflow-tooltip="true" />
      <el-table-column label="反馈类型" align="center" prop="typeName" :show-overflow-tooltip="true" />
      <el-table-column label="状态" align="center" prop="isShow" width="150">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isShow" active-text="显示" inactive-text="隐藏" 
          active-value="1" inactive-value="0" @change="handleStatusChange(scope.row)"/>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" width="150">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改时间" align="center" prop="updateTime" width="150">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="序号" align="center" prop="sort"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-paperclip"
            @click="handleDetails(scope.row)"
            v-hasPermi="['service:feedback:details']"
          >详情</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['service:feedback:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { listFeedback, delFeedback, updateIsShow } from "@/api/service/feedback/feedback";

export default {
  name: "feedback",
  data() {
    return {
      //是否显示状态值
      isShow:[{
        value: '0',
        label: '隐藏'
      },{
        value: '1',
        label: '显示'
      }],
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 问题反馈表格数据
      dataList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined,
        typeName: undefined,
        isShow: undefined
      },
      // 表单参数
      form: {}
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询问题反馈列表 */
    getList() {
      this.loading = true;
      listFeedback(this.queryParams).then(response => {
        this.dataList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        info: undefined,
        typeId: undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
 
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$modal.confirm('是否确认删除问题反馈编号为"' + ids + '"的数据项？').then(function() {
        return delFeedback(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },

    //展示详情
    handleDetails(row){
      const id = row.id || this.id;
      this.$alert(row.info, '反馈内容详情', {
          confirmButtonText: '确定'
        });
    },
    // isShow状态修改
    handleStatusChange(row) {
      let param = {
        id: row.id,
        status: row.isShow
      }
      console.log(row)
      let text = row.isShow === "1" ? "显示" : "隐藏";
      this.$modal.confirm('确认要"' + text + '""' + row.id + '"反馈内容吗？').then(function() {
        return updateIsShow(param);
      }).then(() => {
        this.$modal.msgSuccess(text + "成功");
      }).catch(function() {
        row.isShow = row.isShow === "1" ? "0" : "1";
      });
    },
  }
};
</script>
