import React from "react";
import { Form, Input, Modal, Select } from "antd";

const FormItem = Form.Item;

const CreateForm = props => {
  const [form] = Form.useForm();
  const { modalVisible, onSubmit: handleAdd, onCancel } = props;

  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    handleAdd(fieldsValue);
  };

  return (
    <Modal
      destroyOnClose
      title="新建学生"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form}>
        <FormItem
          labelCol={{
            span: 5
          }}
          wrapperCol={{
            span: 15
          }}
          label="学生姓名"
          name="student_name"
          rules={[
            {
              required: true,
              message: "请输入至少五个字符的规则描述！",
              min: 5
            }
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{
            span: 5
          }}
          wrapperCol={{
            span: 15
          }}
          label="手机号"
          name="student_phone"
          rules={[
            {
              required: true,
              message: "请输入至少五个字符的规则描述！",
              min: 5
            }
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          labelCol={{
            span: 5
          }}
          wrapperCol={{
            span: 15
          }}
          label="所属班级"
          name="class_id"
        >
          <Select placeholder="请选择">
            <Select.Option value="1">一瓣</Select.Option>
            <Select.Option value="2">二瓣</Select.Option>
            <Select.Option value="3">三瓣</Select.Option>
            <Select.Option value="4">四瓣</Select.Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
