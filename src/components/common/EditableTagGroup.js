import React from 'react';
import { Tag, Input, Tooltip, Icon } from 'antd';

class EditableTagGroup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tags: props.tags ? props.tags : [],
			inputVisible: false,
			inputValue: '',
			saveDisabled: true
		};
	}

	handleClose = removedTag => {
		const tags = this.state.tags.filter(tag => tag !== removedTag);
		this.setState({ tags, saveDisabled: false });
	};

	showInput = () => {
		this.setState({ inputVisible: true }, () => this.input.focus());
	};

	handleInputChange = e => {
		this.setState({ inputValue: e.target.value });
	};

	handleInputConfirm = () => {
		const state = this.state;
		const inputValue = state.inputValue;
		let tags = state.tags;
		if (inputValue && tags.indexOf(inputValue) === -1) {
			tags = [...tags, inputValue];
		}

		this.setState({
			tags,
			inputVisible: false,
			inputValue: '',
			saveDisabled: false
		});
	};

	saveInputRef = input => (this.input = input);

	onSave = () => {
		const { tags, saveDisabled } = this.state;
		if (saveDisabled) return;

		this.props.save(tags);
		// console.log('save', tags);
		this.setState({ saveDisabled: true });
	};

	render() {
		const { tags, inputVisible, inputValue, saveDisabled } = this.state;
		return (
			<div style={{ marginBottom: '1rem' }}>
				{tags.map((tag, index) => {
					const isLongTag = tag.length > 20;
					const tagElem = (
						<Tag
							key={tag}
							closable={tag !== 'Accounts'}
							afterClose={() => this.handleClose(tag)}
						>
							{isLongTag ? `${tag.slice(0, 20)}...` : tag}
						</Tag>
					);
					return isLongTag ? (
						<Tooltip title={tag} key={tag}>
							{tagElem}
						</Tooltip>
					) : (
						tagElem
					);
				})}

				{inputVisible && (
					<Input
						ref={this.saveInputRef}
						type="text"
						size="small"
						style={{ width: 78 }}
						value={inputValue}
						onChange={this.handleInputChange}
						onBlur={this.handleInputConfirm}
						onPressEnter={this.handleInputConfirm}
					/>
				)}

				{!inputVisible && (
					<Tag
						onClick={this.showInput}
						style={{ background: '#fff', borderStyle: 'dashed' }}
					>
						<Icon type="plus" /> {`New ${this.props.tagFor}`}
					</Tag>
				)}

				{!inputVisible && (
					<Tag
						onClick={this.onSave}
						color="#108ee9"
						className={saveDisabled ? 'isDisabled' : ''}
					>
						<Icon type="save" /> save
					</Tag>
				)}
			</div>
		);
	}
}

export default EditableTagGroup;
