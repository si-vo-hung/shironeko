import React from 'react';
import { Modal, Form, Input, InputNumber } from "antd";

const InputPopup = Form.create({ name: "form_in_modal" })(
  class extends React.Component {
    render() {
      const { onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          title="Lucky Draw Config"
          okText="OK"
          cancelText="Disabled!"
          onOk={onCreate}
          visible
        >
          <Form layout="vertical">
            <Form.Item label="Lucky Draw Title">
              {getFieldDecorator('luckyDrawTitle', {
                rules: [
                  {
                    required: true,
                    message: "This is a required!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="List Candidates" extra="Candidates must splited by comma (,) character">
              {getFieldDecorator('candidates', {
                rules: [
                  {
                    required: true,
                    message: "This is a required!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Maximum Turns">
              {getFieldDecorator('drawLimit', {
                rules: [
                  {
                    required: true,
                    message: "This is a required!"
                  }
                ]
              })(<InputNumber />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

export default InputPopup;