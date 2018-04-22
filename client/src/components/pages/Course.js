import React from 'react';

class Course extends React.Component {
  state = {
    courses: []
  };

  componentDidMount() {
    this.fetchCourses();
  }

  fetchCourses = () => {
  }

  render() {
    if (!this.state.courses.length) return <p> No courses found.</p>

    return this.state.courses.map(course => {
      return <p>Course</p>;
    });
  }
}

export default Course;
