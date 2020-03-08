import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Dropdown, Menu, message } from "antd";
import React, { useState, useRef } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import CreateForm from "./components/CreateForm";
import UpdateForm from "./components/UpdateForm";
import {
  queryRule,
  updateRule,
  addRule,
  removeRule,
  updateEnableing,
  deleteInfoing
} from "./service";
/**
 * 添加节点
 * @param params
 */

const handleAdd = async params => {
  const hide = message.loading("正在添加");
  try {
    await addRule({
      params
    });
    hide();
    message.success("添加成功");
    return true;
  } catch (error) {
    hide();
    message.error("添加失败请重试！");
    return false;
  }
};
/**
 * 启用
 * @param params
 */
const enableing = async params => {
  const hide = message.loading("正在操作");
  try {
    await updateEnableing({
      params
    });
    hide();
    queryRule();
    message.success("操作成功");
    return true;
  } catch (error) {
    hide();
    message.error("操作失败请重试！");
    return false;
  }
};
/**
 * 删除
 * @param fields
 */

const deleteInfo = async params => {
  const hide = message.loading("正在操作");
  try {
    await deleteInfoing({
      params: {
        student_id: params.student_id
      }
    });
    hide();
    queryRule();
    message.success("操作成功");
    return true;
  } catch (error) {
    hide();
    message.error("操作失败请重试！");
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */

const handleUpdate = async params => {
  const hide = message.loading("正在更新");
  try {
    await updateRule({
      params
    });
    hide();
    message.success("配置成功");
    return true;
  } catch (error) {
    hide();
    message.error("配置失败请重试！");
    return false;
  }
};
/**
 *  删除节点
 * @param selectedRows
 */

const handleRemove = async selectedRows => {
  const hide = message.loading("正在删除");
  if (!selectedRows) return true;

  try {
    await removeRule({
      key: selectedRows.map(row => row.key)
    });
    hide();
    message.success("删除成功，即将刷新");
    return true;
  } catch (error) {
    hide();
    message.error("删除失败，请重试");
    return false;
  }
};

const TableList = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef();
  const columns = [
    {
      title: "账号",
      dataIndex: "student_phone"
    },
    {
      title: "学生姓名",
      dataIndex: "student_name"
    },
    {
      title: "班级名称",
      dataIndex: "class_id",
      // sorter: true,
      renderText: val => `${val} 万`
    },
    {
      title: "账号状态",
      dataIndex: "student_status",
      valueEnum: {
        0: {
          text: "启用",
          status: "Success"
        },
        1: {
          text: "停用",
          status: "Processing"
        }
      }
    },
    {
      title: "操作",
      dataIndex: "option",
      valueType: "option",
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          {record.student_status === 0 ? (
            <a
              onClick={() => {
                enableing(record);
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }}
            >
              启用
            </a>
          ) : null}
          {record.student_status === 1 ? (
            <a
              onClick={() => {
                enableing(record);
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }}
            >
              停用
            </a>
          ) : null}
          {record.student_status === 2 ? (
            <a
              onClick={() => {
                enableing(record);
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }}
            >
              禁用
            </a>
          ) : null}
          <Divider type="vertical" />
          <a
            onClick={() => {
              deleteInfo(record);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }}
          >
            删除
          </a>
        </>
      )
    }
  ];
  return (
    <PageHeaderWrapper>
      <ProTable
        headerTitle="学生管理"
        actionRef={actionRef}
        rowKey={1}
        toolBarRender={action => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
          <Dropdown
            overlay={
              <Menu
                onClick={async e => {
                  if (e.key === "remove") {
                    await handleRemove(e.key);
                    action.reload();
                  }
                }}
                selectedKeys={[]}
              >
                <Menu.Item key="remove">批量导入</Menu.Item>
                <Menu.Item key="approval">批量导入模版</Menu.Item>
              </Menu>
            }
          >
            <Button>
              批量操作 <DownOutlined />
            </Button>
          </Dropdown>
        ]}
        tableAlertRender={(selectedRowKeys, selectedRows) => (
          <div>
            已选择{" "}
            <a
              style={{
                fontWeight: 600
              }}
            >
              {selectedRowKeys.length}
            </a>{" "}
            项&nbsp;&nbsp;
            <span>
              服务调用次数总计{" "}
              {selectedRows.reduce((pre, item) => pre + item.callNo, 0)} 万
            </span>
          </div>
        )}
        request={params => queryRule(params)}
        columns={columns}
        rowSelection={{}}
      />
      <CreateForm
        onSubmit={async value => {
          const success = await handleAdd(value);

          if (success) {
            handleModalVisible(false);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      />
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async value => {
            const success = await handleUpdate(value);
            if (success) {
              handleModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default TableList;
