import React from "react";
import { Tabs } from "antd";
import styles from "./style.less";
import NewLogin from "./components/new";

const { TabPane } = Tabs;
function MyForm() {
  function callback(key) {
    console.log(key);
  }
  return (
    <NewLogin>
      <div className={styles.main}>
        <Tabs defaultActiveKey="1" animated={false} onChange={callback}>
          <TabPane tab="密码" key="1">
            <NewLogin.LegacyForm />
          </TabPane>
          <TabPane tab="手机号" key="2">
            <NewLogin.codeFrom />
          </TabPane>
        </Tabs>
      </div>
    </NewLogin>
  );
}

export default MyForm;
