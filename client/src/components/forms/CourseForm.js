import React from 'react';
import { Form, Button, Icon, Input, Select, InputNumber, Radio } from 'antd';

// import InputField from '../common/InputField';

class CourseForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				subject: props.course ? props.course.subject : '',
				level: props.course ? props.course.level : '',
				isLab: props.course ? props.course.isLab : '',
				name: props.course ? props.course.name : '',
				description: props.course ? props.course.description : '',
				credits: props.course ? props.course.credits : ''
			},
			loading: false,
			errors: {},
			subjects: [
				{ value: 'HSCS', name: 'Health Science' },
				{ value: 'CSCI', name: 'Computer Science' },
				{ value: 'MATH', name: 'Mathematics' },
				{ value: 'PHYS', name: 'Physics' },
				{ value: 'INST', name: 'International Studies' }
			]
		};
	}

	onChange = e => {
		if (this.state.errors[e.target.name]) {
			const errors = Object.assign({}, this.state.errors);
			delete errors[e.target.name];
			this.setState({
				data: { ...this.state.data, [e.target.name]: e.target.value },
				errors
			});
		} else {
			this.setState({
				data: { ...this.state.data, [e.target.name]: e.target.value }
			});
		}
	};

	onSubjectChange = value => {
		this.setState({
			data: { ...this.state.data, subject: value }
		});
	};

	onLevelChange = value => {
		this.setState({
			data: { ...this.state.data, level: value }
		});
	};

	validate = data => {
		const errors = {};

		if (!data.subject) errors.subject = 'Course subject required';
		if (!data.level) errors.level = 'Course level required';
		if (data.isLab === '') errors.isLab = 'Please answer if course is a lab';
		if (!data.name) errors.name = 'Course name required';
		if (data.name.length > 140) errors.name = 'Course name is too long';
		if (!data.description) errors.description = 'Course description required';
		if (!data.credits) errors.credits = 'Course credit hours required';

		return errors;
	};

	handleSubmit = e => {
		e.preventDefault();
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) this.props.submit(this.state.data);
	};

	render() {
		const { data, errors, subjects } = this.state;
		const update = this.props.course ? true : false;

		return (
			<Form
				onSubmit={this.handleSubmit}
				className="form course-form"
				layout={'vertical'}
			>
				<Form.Item
					label="Subject:"
					validateStatus={!!errors.subject ? 'error' : 'success'}
					help={errors.subject}
				>
					<Select
						disabled={update}
						showSearch
						optionFilterProp="children"
						id="subject"
						name="subject"
						value={data.subject}
						onChange={this.onSubjectChange}
						filterOption={(input, option) =>
							option.props.children
								.toLowerCase()
								.indexOf(input.toLowerCase()) >= 0
						}
					>
						<Select.Option value="" key="null">
							Select course subject
						</Select.Option>
						{subjects.map(subject => (
							<Select.Option value={subject.value} key={subject.value}>
								{`${subject.value} - ${subject.name}`}
							</Select.Option>
						))}
					</Select>
				</Form.Item>

				<Form.Item
					label="Name:"
					validateStatus={!!errors.name ? 'error' : 'success'}
					help={errors.name}
				>
					<Input
						id="name"
						name="name"
						type="text"
						placeholder="Course name"
						value={data.name}
						onChange={this.onChange}
					/>
				</Form.Item>

				<Form.Item
					label="Is this a Lab Course?"
					validateStatus={!!errors.isLab ? 'error' : 'success'}
					help={errors.isLab}
				>
					<Radio.Group
						id="isLab"
						name="isLab"
						onChange={this.onChange}
						value={data.isLab}
						disabled={update}
					>
						<Radio value={1}>Yes, this IS a lab course.</Radio>
						<Radio value={0}>No, this is NOT a lab course.</Radio>
					</Radio.Group>
				</Form.Item>

				<Form.Item
					label="Description:"
					validateStatus={!!errors.description ? 'error' : 'success'}
					help={errors.description}
				>
					<Input.TextArea
						autosize={{ minRows: 2, maxRows: 6 }}
						id="description"
						name="description"
						type="text"
						placeholder="Enter the course description"
						value={data.description}
						onChange={this.onChange}
					/>
				</Form.Item>

				<Form.Item
					label="Hours:"
					validateStatus={!!errors.credits ? 'error' : 'success'}
					help={errors.credits}
				>
					<Input
						id="credits"
						name="credits"
						type="text"
						placeholder="1 - 6"
						value={data.credits}
						onChange={this.onChange}
					/>
				</Form.Item>

				<Form.Item
					label="Level:"
					validateStatus={!!errors.level ? 'error' : 'success'}
					help={errors.level}
				>
					<InputNumber
						min={1000}
						max={9999}
						placeholder={1101}
						id="level"
						name="level"
						type="number"
						value={data.level}
						onChange={this.onLevelChange}
						disabled={update}
					/>
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

export default CourseForm;
