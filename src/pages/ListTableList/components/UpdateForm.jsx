import React, { useState } from "react";
import { Form, Button, Input, Modal, Select } from "antd";

const FormItem = Form.Item;
const formLayout = {
  labelCol: {
    span: 7
  },
  wrapperCol: {
    span: 13
  }
};

const UpdateForm = props => {
  const [formVals, setFormVals] = useState({
    student_id: props.values.student_id,
    student_name: props.values.student_name,
    student_phone: props.values.student_phone,
    class_id: props.values.class_id
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values
  } = props;

  const forward = () => setCurrentStep(currentStep + 1);
  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue });

    if (currentStep < 2) {
      forward();
    } else {
      handleUpdate(formVals);
    }
  };

  const renderContent = () => (
    <>
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
            min: 1
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
    </>
  );

  const renderFooter = () => (
    <>
      <Button onClick={() => handleUpdateModalVisible(false, values)}>
        取消
      </Button>
      <Button type="primary" onClick={() => handleNext()}>
        下一步
      </Button>
    </>
  );

  return (
    <Modal
      width={640}
      bodyStyle={{
        padding: "32px 40px 48px"
      }}
      destroyOnClose
      title="编辑"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible(false, values)}
      afterClose={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          student_name: formVals.student_name,
          student_phone: formVals.student_phone,
          class_id: formVals.class_id
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
