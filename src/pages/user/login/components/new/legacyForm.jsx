import React from "react";
import { Input, Button } from "antd";
import { Form as LegacyForm } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import styles from "../../style.less";
import LoginContext from "./LoginContext";

function FromLogin(props) {
  const { form } = props;
  async function handleSubmit(e) {
    e.preventDefault();
    const data = await form.validateFields();
    console.log(data);
  }
  return (
    <LoginContext.Consumer>
      {context => {
        const { color } = context;
        return (
          <>
            <LegacyForm onSubmit={handleSubmit} className="login-form">
              {form.getFieldDecorator("username")(
                <Input className={styles.Input} />
              )}
              {form.getFieldDecorator("password")(
                <Input className={styles.Input} />
              )}
              <Button type={color} className={styles.Button} htmlType="submit">
                登陆
              </Button>
            </LegacyForm>
          </>
        );
      }}
    </LoginContext.Consumer>
  );
}
export default LegacyForm.create()(FromLogin);
