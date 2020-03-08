import React, { useContext, useEffect, useState } from "react";
import { Input, Button, Row, Col } from "antd";
import { Form as LegacyForm } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import styles from "../../style.less";
import LoginContext from "./LoginContext";

function FromLogin(props) {
  const { timing, dispatch, dispatchTiming } = useContext(LoginContext);
  const { form } = props;
  const [count, setCount] = useState(10);
  useEffect(() => {
    let interval = 0;
    if (timing) {
      interval = window.setInterval(() => {
        setCount(preSecond => {
          if (preSecond <= 1) {
            clearInterval(interval); // 重置秒数
            dispatchTiming(false);
            return count || 60;
          }
          return preSecond - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timing]);

  async function handleSubmits(e) {
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
            <LegacyForm onSubmit={handleSubmits} className="login-form">
              {form.getFieldDecorator("name")(
                <Input className={styles.Input} />
              )}
              <Row gutter={8}>
                <Col span={16}>
                  {form.getFieldDecorator("mini")(
                    <Input className={styles.Input} />
                  )}
                </Col>
                <Col span={8}>
                  <Button
                    disabled={timing}
                    className={styles.getCaptcha}
                    size="large"
                    onClick={() => {
                      dispatchTiming(true);
                      dispatch(true);
                      // const value = getFieldValue('mobile');
                      // onGetCaptcha(value);
                    }}
                  >
                    {timing ? `${count} 秒` : "获取验证码"}
                  </Button>
                </Col>
              </Row>
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
