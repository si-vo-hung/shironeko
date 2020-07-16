import React from "react";
import { List } from "antd";

export default class ListCandidates extends React.Component {
  render() {
    const { selectedCandidates } = this.props;
    return (
      <List
        style={{ marginTop: "85px" }}
        header={
          <h3 style={{ margin: "16px 0", color: "white" }}>
            Congratulations to
          </h3>
        }
        size="large"
        bordered
        dataSource={selectedCandidates}
        renderItem={item => <List.Item>{item}</List.Item>}
      />
    );
  }
}
