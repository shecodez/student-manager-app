import React from "react";
import update from "immutability-helper";
import { Form, Input, Icon, Button } from "antd";

class SubjectsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: props.subjects ? props.subjects : []
    };
  }

  add = () => {
    this.setState(prevState => ({
      subjects: [...prevState.subjects, ""]
    }));
  };

  remove = i => {
    if (this.state.subjects.length === 1) {
      return;
    }
    this.setState(prevState => ({
      subjects: update(prevState.subjects, { $splice: [[i, 1]] })
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("state", this.state);
  };

  render() {
    const { subjects } = this.state;
    const formItems = subjects.map((subject, i) => {
      return (
        <Form.Item key={i} label="Subject:">
          <Input
            placeholder="SUBJ - Subject"
            style={{ width: "80%", marginRight: 8 }}
            value={subject}
            onChange={e =>
              this.setState({
                subjects: update(subjects, {
                  $splice: [[i, 1, e.target.value]]
                })
              })
            }
          />
          {subjects.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={subjects.length === 1}
              onClick={() => this.remove(i)}
            />
          ) : null}
        </Form.Item>
      );
    });

    return (
      <Form
        onSubmit={this.handleSubmit}
        className="form subject-form"
        layout={"vertical"}
      >
        {formItems}
        <Form.Item>
          <Button type="dashed" onClick={this.add} style={{ width: "80%" }}>
            <Icon type="plus" /> Add Subject
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            <Icon type="save" /> Save
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default SubjectsForm;
