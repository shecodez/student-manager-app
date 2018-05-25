import React from 'react';
import { Link } from 'react-router-dom';

const Course = props => {
	const { course } = props;
	const courseTitle = `${course.subject} ${course.level} ${course.name}`;

	return (
		<div className="course">
			<small className="course-subject">{course.subject}</small>
			<h3 className="course-name">
				{props.link ? (
					<Link to={`/courses/${course.key}`}>{courseTitle}</Link>
				) : (
					<span>{courseTitle}</span>
				)}
			</h3>
			<p className="course-desc">{course.description}</p>
			<h4 className="course-credits">{`Cr: ${course.credits}`}</h4>
		</div>
	);
};

export default Course;
